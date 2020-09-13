import * as onlineService from '../../services/user/onlineService';
import { message } from "antd";
import config from '../../config/config';

export default {
  namespace: 'onlineModel',
  state: {
    onlineList: [],
    total: 0,
    onlineLoading: false,
    currentPage: 0,
    pageSize: 0,
    searchParams: null,
    isExpandSearch: true,
    selectedRows: null,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { call, put }) {
      yield put({ type: "updateState", payload: { onlineLoading: true }});
      const res = yield call(onlineService.getAllOnlineUser, { params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { onlineList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { onlineLoading: false }});
    },

    *forceExit({payload: params}, {select, call, put}) {
      const {selectedOnlineUsers} = params;
      const res = yield call(onlineService.forceExit, {onlineUsers: JSON.stringify(selectedOnlineUsers)});
      if (res.code == 200) {
        console.log("强制下线成功 ===>>> " + JSON.stringify(params));
      }
      yield put({ type: 'getListDatas', payload: {}});
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/user/online") {
          dispatch({ type: 'getListDatas', payload: {}});
        }
      });
    },
  },
};
