import * as iconService from '../../services/option/iconService';
import { message } from 'antd';
import config from '../../config/config';

export default {
  namespace: 'iconModel',
  state: {
    iconLoading: false,
    iconList: [],
    total: 0,
    currentPage: 0,
    pageSize: 0,
    iconModalVisible: false,
    iconInfoData: null,
    searchParams: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *getListDatas({ payload: {currentPage = 1, pageSize = config.PAGE_SIZE_LIST[0], params} }, { select, call, put}) {
      yield put({ type: "updateState", payload: { iconLoading: true }});
      const res = yield call(iconService.getIconList, { params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({ type: "updateState", payload: { iconList: res.data.records, total: res.data.total, currentPage, pageSize }});
      }
      yield put({ type: "updateState", payload: { iconLoading: false }});
    },

    *onSave({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { saveLoading: true }});
      const res = yield call(iconService.addIcon, params);
      if (res.code == "200") {
        yield put({ type: "updateState", payload: { iconModalVisible: false }});
        message.info("添加成功！");
      } else {
        message.info("添加失败！");
      }
      yield put({ type: "updateState", payload: { saveLoading: false }});
    },

    *onDelete({ payload: params }, { select, call, put }) {
      const res = yield call(iconService.deleteMenu, params);
      if (res.code == "200") {
        console.log("删除成功！");
      } else {
        console.log("删除失败！");
      }
    },

    *fetchIcons({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { iconLoading: true }});
      const res = yield call(iconService.fetchIcons, params);
      if (res.code == "200") {
        yield put({ type: "updateState", payload: { iconModalVisible: false }});
        message.info("抓取成功！");
      } else {
        message.info("抓取失败！");
      }
      yield put({ type: "updateState", payload: { iconLoading: false }});
      yield put({ type: "getListDatas", payload: {currentPage: 1, pageSize: config.PAGE_SIZE_LIST[0]}});
    },

    *onExportIcons({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { iconLoading: true }});
      const res = yield call(iconService.onExportIcons, params);
      yield put({ type: "updateState", payload: { iconLoading: false }});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/option/icon") {
          dispatch({ type: 'getListDatas', payload: {} });
        }
      });
    },
  },
};
