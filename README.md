## 基本库的安装
+ 引入elementui库
```
cnpm i element-ui -S
```

```
在 main.js 中写入以下内容：

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
+ 引入axios库
```
cnpm install  --save axios
```

```
main.js中正确引入axios如下
import axios from 'axios'
import qs from 'qs'
Vue.prototype.axios = axios
(但是本例中不使用这个，本例中使用的是将axios进行封装)
```
## axios统一封装&&挂载
+ /src/utils/api.js中
```
import axios from 'axios'
import {Message} from 'element-ui'

//请求拦截
axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})


//响应拦截
axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.status == 500) {
    Message.error({message: data.data.msg});
    return;
  }
  if (data.data.status==200) {
    Message.success({message: data.data.msg});
  }

  return data;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status == 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  }else {
    Message.error({message: '未知错误!'});
  }
  return Promise.resolve(err);
})

let base = '';

//post请求,带参数
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

//上传请求
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

//跟新请求
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

//删除请求
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}

//get请求,不带参数
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}
```

+ main.js中
```

//导入
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'
import {getRequest} from './utils/api'
import {uploadFileRequest} from './utils/api'

//挂载到vue中
Vue.prototype.postRequest=postRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.uploadFileRequest=uploadFileRequest;

```

+ 在组件中使用
```
  this.postRequest('/login',{
          username:'admin',
          password:'123'
        }).then(resp=>{
            //回调
        })
```

## 设置跨域
+ config/index.js中,更该配置文件记得重启
```
proxyTable: {
      '/': {
        target: 'http://localhost:8080', //自行更改
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
```
