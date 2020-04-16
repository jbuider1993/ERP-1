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
      console.log("===== globalModel setTokenModel =====");
      const { token, userInfo } = params;
      yield put({ type: "updateState", payload: { token, userInfo }});
    }
  },
  subscriptions: {
    init(params) {
      console.log("===== globalModel subscriptions =====");
    }
  }
};
