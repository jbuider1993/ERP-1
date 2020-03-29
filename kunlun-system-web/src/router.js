import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import PropTypes from 'prop-types';
import { LocaleProvider } from 'antd';
import dynamic from 'dva/dynamic';
import zhCN from 'antd/lib/locale-provider/zh_CN';

// 注册model方法
const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
};

/**
 * 路由配置
 */
const RouterConfig = ({ history, app }) => {

  const routes = [{
      // 主页
      path: "/home",
      models: [require("./models/home/homeModel")],
      component: () => import("./routes/home/HomePage")
    }, {
      // 用户管理 =》 人员用户
      path: "/user/list",
      models: [require("./models/user/userModel")],
      component: () => import("./routes/user/UserPage")
    }, {
      // 用户管理 =》 角色权限
      path: "/user/role",
      models: [require("./models/user/roleModel")],
      component: () => import("./routes/user/RolePage")
    }, {
      // 用户管理 =》 在线用户
      path: "/user/online",
      models: [require("./models/user/onlineModel")],
      component: () => import("./routes/user/OnlinePage")
    }, {
      // 用户管理 =》 用户地图
      path: "/user/amap",
      models: [require("./models/user/onlineModel")],
      component: () => import("./routes/user/UserAMapPage")
    }, {
      // 协同管理 =》 模型管理
      path: "/synergy/model",
      models: [require("./models/synergy/modelModel")],
      component: () => import("./routes/synergy/ModelPage")
    }, {
      // 协同管理 =》 流程管理
      path: "/synergy/process",
      models: [require("./models/synergy/processModel")],
      component: () => import("./routes/synergy/ProcessPage")
    }, {
      // 协同管理 =》 待办任务
      path: "/synergy/todo",
      models: [require("./models/synergy/processModel")],
      component: () => import("./routes/synergy/ProcessPage")
    }, {
      // 协同管理 =》 操作日志
      path: "/synergy/log",
      models: [require("./models/synergy/operatorLogModel")],
      component: () => import("./routes/synergy/OperatorLogPage")
    }, {
      // 协同管理 =》 事项日程
      path: "/synergy/schedule",
      models: [require("./models/synergy/scheduleModel")],
      component: () => import("./routes/synergy/SchedulePage")
    }, {
      // 资源管理 =》 环境监控
      path: "/resource/virtual",
      models: [require("./models/resource/machineModel")],
      component: () => import("./routes/resource/MachinePage")
    }, {
      // 资源管理 =》 服务监控
      path: "/resource/service",
      models: [require("./models/resource/instanceModel")],
      component: () => import("./routes/resource/InstancePage")
    }, {
      // 系统管理 =》 菜单管理
      path: "/option/menu",
      models: [require("./models/option/menuModel")],
      component: () => import("./routes/option/MenuPage")
    }, {
      // 系统管理 =》 图标管理
      path: "/option/icon",
      models: [require("./models/option/iconModel")],
      component: () => import("./routes/option/IconPage")
    }, {
      // 系统管理 =》 通知公告
      path: "/option/notice",
      models: [require("./models/option/messageModel")],
      component: () => import("./routes/option/MessagePage")
    }, {
    // 系统管理 =》 了解系统
    path: "/option/info",
    models: [require("./models/option/optionModel")],
    component: () => import("./routes/option/SystemInfoPage")
  }
  ];

  const addModelToApp = (routes, history) => {
    function loadModels(modules) {
      for (let module of modules) {
        registerModel(app, module);
      }
    }

    function matchURL(path, location) {
      return path == location.pathname;
    }

    let location = history.location;
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      let path = route.path;
      if (matchURL(path, location) && route.models) {
        loadModels([route.models[0].default])
      }
    }
  };

  // model加载到app中，否则首次加载页面时model为null
  addModelToApp(routes, history);

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key} exact path={path} component={dynamic({ app, ...dynamics })}/>
            ))
          }
        </Switch>
      </Router>
    </LocaleProvider>
  );
};

RouterConfig.proptypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default RouterConfig;
