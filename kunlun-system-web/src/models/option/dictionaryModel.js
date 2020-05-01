import * as dictionaryService from '../../services/option/dictionaryService';
import { message } from "antd";
import config from '../../config/config';

export default {
  namespace: "dictionaryModel",
  state: {
    dictionaryLoading: false,
    dictionaryList: [{name: "11111", code: "11111", remark: "11111"}],
    total: 0,
    currentPage: 1,
    pageSize: config.PAGE_SIZE,
    dictionaryModalVisible: false,
    operateType: 'add',
    dictionaryInfoData: null,
    selectedRowKeys: [],
    searchParams: null,

    dictionarySubLoading: false,
    dictionarySubList: [],
    dictSubCurrentPage: 0,
    dictSubPageSize: config.PAGE_SIZE,
    dictSubTotal: 0,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { select, call, put }) {
      yield put({ type: "updateState", payload: { dictionaryLoading: true }});
      const res = yield call(dictionaryService.getAllDictionary, { params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { dictionaryList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { dictionaryLoading: false }});
    },

    *getListSubDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { select, call, put }) {
      yield put({ type: "updateState", payload: { dictionarySubLoading: true }});
      const res = yield call(dictionaryService.getAllDictionarySub, { ...params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { dictionarySubList: res.data.records, dictSubTotal: res.data.total, dictSubCurrentPage: currentPage, dictSubPageSize: pageSize },
        });
      }
      yield put({ type: "updateState", payload: { dictionarySubLoading: false }});
    },

    *addUser({payload: params}, {put, call}) {
      const res = yield call(dictionaryService.addUser, params);
      if (res.code == "200") {
        message.info("新增成功！");
        yield put({ type: 'updateState', payload: { dictionaryModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("新增失败！");
      }
    },

    *updateUser({payload: params}, {put, call}) {
      const res = yield call(dictionaryService.updateUser, params);
      if (res.code == "200") {
        message.info("修改成功！");
        yield put({ type: 'updateState', payload: { dictionaryModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("修改失败！");
      }
    },

    *batchDeleteUser({payload: ids}, {put, call}) {
      const res = yield call(dictionaryService.batchDeleteUser, ids);
      if (res.code == "200") {
        message.info("删除成功！");
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("删除失败！");
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
        if (location.pathname === "/option/dictionary") {
          dispatch({ type: 'getListDatas', payload: {}});
        }
      });
    },
  },
};
