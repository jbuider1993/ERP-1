export default {
  namespace: 'optionModel',
  state: {
    modalVisible: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *updateStateDatas({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/option435235") {
          dispatch({ type: 'getListDatas', payload: {} });
        }
      });
    },
  },
};
