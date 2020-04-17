import config from "../config/config";
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as globalService from '../services/globalService';

export default {
  namespace: "globalModel",
  state: {
    collapsed: false,
    activeHeadMenuKey: "home",
    activeSideMenuKey: null,
    pageUrl: null,
    pathUrlList: [],
    paneTabs: [],
    openedSubMenuKey: null,
    homeView: null,
    tokenModel: null,
    codeModel: null,
    pageLoading: false,
    themeDrawerVisible: false,
    themeColor: "#000000",
    siderColor: "#fff",
    themeStyle: "siderMenu",
    selectedStyle: "theme",
    isBlockStyle: true,
    menuMap: new Map(),
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *initMenu({ payload }, { select, call, put }) {
      let { pathUrlList, paneTabs } = yield select(state => state.globalModel);
      if (pathUrlList.length > 0) return;
      const main1 = config.frame_menu.main;
      const sider1 = config.frame_menu.sider;
      const siderKeys = main1.map(obj => obj.key);
      const siders = siderKeys.slice(1, siderKeys.length).map(obj => sider1[obj]);
      const temps = siders.flatMap(obj => obj);
      const tempss = temps.filter(obj => obj.children && obj.children.length);
      const childs = tempss.flatMap(obj => obj.children);
      const array = [...main1, ...temps, ...childs];
      for (let i = 0; i < array.length; i++) {
        if (array[i].key != "") pathUrlList.push({ key: array[i].key, name: array[i].name, url: array[i].url });
      }
      yield put({ type: "updateState", payload: { pathUrlList, paneTabs }});
    },

    *getAuthCode({ payload: params }, { select, call, put }) {
      const res = yield call(globalService.getAuthCode, params);
      if (res.code == "200") {
        console.log("Authentication Code ===> " + JSON.stringify(res.data));
        yield put({ type: "updateState", payload: { codeModel: res.data }});
      }
    },

    *login({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { pageLoading: true }});
      const { userName, password } = params;
      const {dispatch, codeModel} = yield select(state => state.globalModel);
      const res = yield call(globalService.login, { userName, password, code: codeModel.code });
      if (res.code == "200") {
        console.log(res);
        window._USERINFO_ = res.data.userInfo;
        window._TOKEN_ = res.data.token;
        const {dispatch} = yield select(state => state.globalModel);
        yield put({ type: "updateState", payload: { tokenModel: res.data }});
        dispatch(routerRedux.push({pathname: "/scmp"}));
        yield put({ type: "getAppMenu", payload: {}});
      } else {
        message.error(res.message);
        console.log(res.error);
      }
      yield put({ type: "updateState", payload: { pageLoading: false }});
    },

    *getAppMenu({ payload: params }, { select, call, put }) {
      const res = yield call(globalService.getAppMenu, params);
      if (res.code == "200") {
        console.log("getAppMenu menuList ===> " + res.data);
        yield put({ type: "updateState", payload: { menuList: res.data }});
      }
    },

    *logout({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { pageLoading: true }});
      const { userName, password } = window._USERINFO_;
      const res = yield call(globalService.logout, { userName, password });
      if (res.code == "200") {
        console.log(res);
      }
      yield put({ type: "updateState", payload: { pageLoading: false }});
    },

    *addActiveRoute({ payload: params }, { select, call, put }) {
      let { paneTabs } = yield select(state => state.globalModel);
      const {activeHeadMenuKey, paneTabList } = yield call(globalService.getActivedMenu, params, paneTabs);
      console.log("open tab, activeHeadMenuKey ===>>> " + activeHeadMenuKey + ", activeSideMenuKey ===>>> " + params.key);
      yield put({ type: "updateState", payload: { paneTabs: paneTabList, activeHeadMenuKey, activeSideMenuKey: params.key }});
    },
  },
  subscriptions: {
    onListenIFrameMessage({ dispatch, history }) {
      window.addEventListener("message", function (e) {
        // 监听页面超时事件，确定后直接跳转到登陆界面
        if (e.data && e.data.operateType == "timeout") {
          window.g_app._history.push({pathname: "/"});
        }

        // kunlun-system-web请求打开菜单页面的监听
        const message = !!e && !!e.data && JSON.parse(e.data) || {};
        message.isAddRoute && dispatch({ type: "addActiveRoute", payload: message });
      });
    },
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log("=====program start running=====");
        if (location.pathname == "/") {
          dispatch({type: "getAuthCode", payload: {}});
        }

        if (location.pathname == "/scmp") {
          dispatch({type: "initMenu", payload: {}});
        }

        dispatch({type: "updateState", payload: {dispatch}});
      });
    },
  },
};
