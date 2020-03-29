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
    themeStyle: "hsc",
    selectedStyle: "theme",
    tabStyle: "gap",
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { select, call, put }) {
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
      yield put({ type: "getAuthCode", payload: {}});
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
      const { paneTabs } = yield select(state => state.globalModel);
      let activeHeadMenuKey;
      const siderMenuObj = config.frame_menu.sider;
      for (let siderKey of Object.keys(siderMenuObj)) {
        const siderChildren = siderMenuObj[siderKey];
        for (let i = 0; i < siderChildren.length; i++) {
          const menuObj = siderChildren[i];
          if (menuObj.key == params.key) {
            activeHeadMenuKey = siderKey;
            if (params.key == "update") {
              menuObj["url"] = menuObj["url"] + params.params.id
            }
            paneTabs.push(menuObj);
          }
        }
      }
      console.log("open tab, activeHeadMenuKey ===>>> " + activeHeadMenuKey + ", activeSideMenuKey ===>>> " + params.key);
      yield put({ type: "updateState", payload: { paneTabs, activeHeadMenuKey, activeSideMenuKey: params.key }});
    },
  },
  subscriptions: {
    onListenIFrameMessage({ dispatch, history }) {
      window.addEventListener("message", function (e) {
        const message = !!e && !!e.data && JSON.parse(e.data) || {};
        message.isAddRoute && dispatch({ type: "addActiveRoute", payload: message });
      });
    },
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log("=====program start running=====");
        if (location.pathname == "/") {
          dispatch({type: "init", payload: {}});
          dispatch({type: "updateState", payload: {dispatch}});
        }
      });
    },
  },
};
