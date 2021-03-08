import config from "../config/config";
import { message, Modal } from 'antd';
import { routerRedux } from 'dva/router';
import * as globalService from '../services/globalService';

export default {
  namespace: "globalModel",
  state: {
    collapsed: false,
    activeHeadMenuKey: "home",
    activeSideMenuKey: null,
    menuData: null,
    pageUrl: null,
    pathUrlList: [],
    paneTabs: [],
    openedSubMenuKey: null,
    homeView: null,
    tokenModel: null,
    codeModel: null,
    pageLoading: false,
    themeDrawerVisible: false,
    themeColor: config.DEFAULT_THEME_COLOR,
    siderColor: config.DEFAULT_SIDER_COLOR,
    themeStyle: "siderMenu",
    selectedStyle: "theme",
    isBlockStyle: true,
    menuMap: new Map(),
    timeoutModalCount: 0,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *getAuthCode({ payload: params }, { select, call, put }) {
      const res = yield call(globalService.getAuthCode, params);
      if (res.code == "200") {
        console.log("Authentication Code ===> " + JSON.stringify(res.data));
        yield put({ type: "updateState", payload: { codeModel: res.data }});
      }
    },

    *login({ payload: params }, { select, call, put }) {
      console.log("===== globalModel login =====");
      yield put({ type: "updateState", payload: { pageLoading: true }});
      const { userName, password } = params;
      const {dispatch, codeModel} = yield select(state => state.globalModel);
      const res = yield call(globalService.login, { userName, password, code: codeModel.code });
      console.log("===== globalModel login res ===== " + res.code);
      if (res.code == "200") {
        console.log(res);
        window._USERINFO_ = res.data.userInfo;
        window._TOKEN_ = res.data.token;
        sessionStorage.token = window._TOKEN_;
        sessionStorage.userInfo = JSON.stringify(window._USERINFO_);
        yield put({ type: "updateState", payload: { tokenModel: res.data }});
        dispatch({ type: "getAppMenu", payload: {userId: res.data.userInfo.id}}).then(() => dispatch(routerRedux.push({pathname: "/scmp"})));
      } else {
        message.error(res.message);
        console.log(res.error);
      }
      yield put({ type: "updateState", payload: { pageLoading: false }});
    },

    *getAppMenu({ payload: params }, { select, call, put }) {
      const res = yield call(globalService.getAppMenu, params);
      if (res.code == "200") {
        console.log("getAppMenu menuData ===> " + res.data);
        sessionStorage.menuData = JSON.stringify(res.data);
        yield put({ type: "updateState", payload: { menuData: res.data }});
      } else {
        console.log("config menuData ===> " + res.data);
        const menuList = yield call(globalService.getAppMenuFromConfig);
        let menuData = {};
        menuData["list"] = menuList;
        menuData = {...menuData, ...config.frame_menu};
        sessionStorage.menuData = JSON.stringify(menuData);
        yield put({ type: "updateState", payload: { menuData }});
      }
    },

    *logout({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { pageLoading: true }});
      const { userName, password } = window._USERINFO_ ? JSON.parse(window._USERINFO_) : JSON.parse(sessionStorage.userInfo);
      const res = yield call(globalService.logout, { userName, password });
      if (res.code == "200") {
        console.log(res);
      }
      yield put({ type: "updateState", payload: { pageLoading: false, paneTabs: [], activeHeadMenuKey: "home", activeSideMenuKey: null }});
    },

    *addActiveRoute({ payload: params }, { select, call, put }) {
      let { paneTabs } = yield select(state => state.globalModel);
      const {activeHeadMenuKey, paneTabList } = yield call(globalService.getActivedMenu, params, paneTabs);
      console.log("open tab, activeHeadMenuKey ===>>> " + activeHeadMenuKey + ", activeSideMenuKey ===>>> " + params.key);
      yield put({ type: "updateState", payload: { paneTabs: paneTabList, activeHeadMenuKey, activeSideMenuKey: params.key }});
    },

    *refreshPage({payload: params}, {select, call, put}) {
      const tokenModel = {};
      const token = sessionStorage.token;
      window._TOKEN_ = token;
      const userInfo = sessionStorage.userInfo;
      window._USERINFO_ = userInfo;
      tokenModel["token"] = token;
      tokenModel["userInfo"] = userInfo;
      yield put({type: "updateState", payload: {tokenModel, menuData: JSON.parse(sessionStorage.menuData)}});
    },

    *handleTimeout({payload: params}, {select, call, put}) {
      const {dispatch, history} = params;
      let {timeoutModalCount} = yield select(state => state.globalModel);
      if (timeoutModalCount > 0) return;
      timeoutModalCount++;

      Modal.confirm({
        title: '提示',
        okText: "确认",
        cancelText: "取消",
        content: <div><i className="ri-error-warning-line" style={{fontSize: "18px", marginRight: "10px", verticalAlign: "sub"}}></i>离开时间太长，请重新登录！</div>,
        onOk() {
          dispatch({type: "logout", payload: {}}).then(() =>
            history.push({pathname: "/"})
          );
        },
        onCancel() {
          timeoutModalCount--;
          dispatch({type: "updateState", payload: {timeoutModalCount}});
        },
      });
      dispatch({type: "updateState", payload: {timeoutModalCount}});
    },
  },
  subscriptions: {
    onListenIFrameMessage({ dispatch, history }) {
      window.addEventListener("message", function (e) {
        // 监听页面超时事件，确定后直接跳转到登陆界面
        if (e.data && e.data.operateType == "timeout") {
          dispatch({type: "handleTimeout", payload: {dispatch, history}});
        } else {
          // kunlun-system-web请求打开菜单页面的监听
          const message = !!e && !!e.data && JSON.parse(e.data) || {};
          message.isAddRoute && dispatch({type: "addActiveRoute", payload: message});
        }
      });
    },
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log("=====program start running=====");
        if (location.pathname == "/") {
          dispatch({type: "getAuthCode", payload: {}});
        }

        // 刷新页面处理
        if (location.pathname == "/scmp") {
          dispatch({type: "refreshPage", payload: {}});
        }
        dispatch({type: "updateState", payload: {dispatch}});
      });
    },
  },
};
