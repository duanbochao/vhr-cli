// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import { initMenu } from './utils/utils'
import { postRequest } from './utils/api'
import { uploadFileRequest } from './utils/api'
import { putRequest } from './utils/api'
import { deleteRequest } from './utils/api'
import { getRequest } from './utils/api'
import store from './store/index'

Vue.prototype.postRequest = postRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;



Vue.use(ElementUI);
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {


  if (to.name == "Login") {
    next()
    return
  }

  var name = store.state.user.name
  if (name === '未登录') {
    if (to.meta.requireAuth || to.name == null) {
      next({ path: '/', query: { redirect: to.path } })
    } else {
      next()
    }
  } else {
    initMenu(router, store);
    next()
  }

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
