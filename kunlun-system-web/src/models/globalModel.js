import queryString from 'query-string';

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
    setup({ dispatch, history }) {
      console.log("===== globalModel subscriptions =====");
      history.listen(({pathname, query, search}) => {
        // 解析父iframe传递的参数，并将token和登陆用户信息缓存到window
        const params = queryString.parse(search);
        if (!!params && params.tokenModel && params.tokenModel != "null") {
          const {token, userInfo} = JSON.parse(params.tokenModel);
          window._TOKEN_ = token;
          window._USERINFO_ = userInfo;
        }

        if (pathname === "/home") {
          dispatch({ type: 'updateState', payload: { loading: true }});
          Promise.all([dispatch({ type: 'getUserCount', payload: {} }), dispatch({ type: 'getMessages', payload: {} })]).then(() =>
            dispatch({ type: 'updateState', payload: { loading: false }})
          );

          dispatch({ type: 'getSchedules', payload: {}});
        }
      });
    },
  }
};
