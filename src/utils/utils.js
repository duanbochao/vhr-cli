import { getRequest } from './api'
import { Message } from 'element-ui'

// 动态加载组件的函数
export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/menu/getMenuByHrId").then(resp => {
    if (resp && resp.status == 200) {
      var fmtRoutes = formatRoutes(resp.data.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
    }
  })
}
export const formatRoutes = (routes) => {
  let fmRoutes = [];
  routes.forEach(router => {
    // 定义基本的模板格式
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;

    //将子模版遍历出来
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component (resolve) {
        if (component.startsWith("Home")) {
          require(['../components/' + component + '.vue'], resolve)
        } else if (component.startsWith("Emp")) {
          require(['../components/emp/' + component + '.vue'], resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}


