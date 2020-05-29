import queryString from 'query-string';

export default {
  namespace: 'globalModel',
  state: {
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
      const { token, userInfo, themeColor } = params;
      yield put({ type: "updateState", payload: { token, userInfo, themeColor }});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log("===== globalModel subscriptions =====");
    },
  }
};
