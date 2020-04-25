import * as operatorLogService from '../../services/synergy/operatorLogService';

export default {
  namespace: 'operatorLogModel',
  state: {
    logList: [],
    total: 0,
    logLoading: false,
    currentPage: 0,
    pageSize: 0,
    logModalVisible: false,
    operateType: 'add',
    logInfoData: null,
    selectedRows: [],
    selectedRowKeys: [],
    searchParams: null,
    logRecord: null,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = 15, params}}, { call, put }) {
      yield put({ type: "updateState", payload: { logLoading: true }});
      const res = yield call(operatorLogService.getLogList, { ...params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { logList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { logLoading: false }});
    },

    *downloadOperateLog({payload: params}, {select, call, put}) {
      const res = yield call(operatorLogService.downloadOperateLog, params);
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        let params = {};
        if (location.pathname === "/synergy/log") {
          dispatch({ type: 'getListDatas', payload: {params} });
        }
      });
    },
  },
};
