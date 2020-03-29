import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import { LocaleProvider } from 'antd';
import dynamic from 'dva/dynamic';
import zhCN from 'antd/lib/locale-provider/zh_CN';

/**
 * 路由配置
 */
const RouterConfig = ({ history, app }) => {

  const routes = [{
      path: "/",
      models: () => [import("./models/noficationModel")],
      component: () => import("./routes/AppPage")
      // component: () => import("./routes/LoginPage")
    }, {
      path: "/scmp",
      models: () => [import("./models/noficationModel")],
      component: () => import("./routes/AppPage")
    }];

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

export default RouterConfig;
