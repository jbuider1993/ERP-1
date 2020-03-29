export default {
  namespace: 'globalModel',
  state: {
    themeValue: "vertical",
    colorValue: "light",
    isShowBreadCrumb: false,
    paneTabs: [],
    activeTabKey: null,
    pathUrlList: [],
    token: null,
    userInfo: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *setTokenModel({ payload: params }, { select, call, put }) {
      const { token, userInfo } = params;
      yield put({ type: "updateState", payload: { token, userInfo }});
    }
  },
  subscriptions: {
    init(params) {
      const { dispatch, history } = params;
      dispatch({ type: "setTokenModel", payload: { token: window._TOKEN_, userInfo: window._USERINFO_ }});
    }
  }
};
