import * as dictionaryService from '../../services/option/dictionaryService';
import { message } from "antd";
import config from '../../config/config';

export default {
  namespace: "dictionaryModel",
  state: {
    dictionaryLoading: false,
    dictionaryList: [],
    total: 0,
    currentPage: 1,
    pageSize: config.PAGE_SIZE,
    operateType: 'add',
    dictionaryInfoData: null,
    selectedItemRows: [],
    selectedItemRowKeys: [],
    searchParams: null,
    modalType: "item",

    showDictRow: null,
    dictSubDrawerVisible: false,
    dictionarySubLoading: false,
    dictionarySubList: [],
    dictSubCurrentPage: 0,
    dictSubPageSize: config.PAGE_SIZE,
    dictSubTotal: 0,
    selectedValueRows: [],
    selectedValueRowKeys: [],

    dictionaryModalVisible: false,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { select, call, put }) {
      yield put({ type: "updateState", payload: { dictionaryLoading: true }});
      const res = yield call(dictionaryService.getAllDictionaryItem, { params, currentPage, pageSize });
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
      const res = yield call(dictionaryService.getAllDictionaryValue, { ...params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { dictionarySubList: res.data.records, dictSubTotal: res.data.total, dictSubCurrentPage: currentPage, dictSubPageSize: pageSize },
        });
      }
      yield put({ type: "updateState", payload: { dictionarySubLoading: false }});
    },

    *saveDictionary({payload: params}, {select, call, put}) {
      const res = yield call(dictionaryService.addDictionaryItem, params);
      if (res.code == 200 || res.code == 201) {
        message.info("新增成功！");
        yield put({ type: 'getListDatas', payload: {}});
        yield put({ type: "updateState", payload: { dictionaryModalVisible: false }});
      } else {
        message.info("新增失败！");
      }
    },

    *saveDictionaryValue({payload: params}, {select, call, put}) {
      const {showDictRow} = yield select(state => state.dictionaryModel);
      const res = yield call(dictionaryService.addDictionaryValue, {...params, dictId: showDictRow.id});
      if (res.code == 200 || res.code == 201) {
        message.info("新增成功！");
        yield put({ type: 'getListSubDatas', payload: {params: {dictId: showDictRow.id}}});
        yield put({ type: "updateState", payload: { dictionaryModalVisible: false }});
      } else {
        message.info("新增失败！");
      }
    },

    *deleteDictionaryItem({payload: params}, {select, call, put}) {
      const res = yield call(dictionaryService.deleteDictionaryItem, params);
      if (res.code == 200) {
        message.info("删除成功！");
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("删除失败！");
      }
    },

    *deleteDictionaryValue({payload: params}, {select, call, put}) {
      const {showDictRow} = yield select(state => state.dictionaryModel);
      const res = yield call(dictionaryService.deleteDictionaryValue, params);
      if (res.code == 200) {
        message.info("删除成功！");
        yield put({ type: 'getListSubDatas', payload: {params: {dictId: showDictRow.id}}});
      } else {
        message.info("删除失败！");
      }
    },

    *updateDictionaryItem({payload: params}, {select, call, put}) {
      const res = yield call(dictionaryService.updateDictionaryItem, params);
      if (res.code == 200) {
        message.info("编辑成功！");
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("编辑失败！");
      }
    },

    *updateDictionaryValue({payload: params}, {select, call, put}) {
      const {showDictRow} = yield select(state => state.dictionaryModel);
      const res = yield call(dictionaryService.updateDictionaryValue, params);
      if (res.code == 200) {
        message.info("编辑成功！");
        yield put({ type: 'getListSubDatas', payload: {params: {dictId: showDictRow.id}}});
      } else {
        message.info("编辑失败！");
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
