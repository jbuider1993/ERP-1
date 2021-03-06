import * as menuService from '../../services/option/menuService';
import { message } from 'antd';
import config from '../../config/config';

export default {
  namespace: 'menuModel',
  state: {
    menuLoading: false,
    menuList: [],
    saveLoading: false,
    total: 0,
    currentPage: 0,
    pageSize: 0,
    selectMenuModalVisible: false,
    selectMenuLoading: false,
    checkedTreeNodeKeys: [],
    expandedTreeNodeKeys: [],
    unfoldCollapseKeys: [],

    menuModalVisible: false,
    menuModalType: "add",

    menuIconModalVisible: false,
    menuIconLoading: false,
    menuIconList: [],
    selectedIconRows: [],
    selectedIconRowKeys: [],
    iconCurrentPage: 0,
    iconTotal: 0,

    selectedTreeNode: null,
    menuInfoData: null,
    searchParams: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *getMenuTreeList({ payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params} }, { select, call, put }) {
      yield put({ type: "updateState", payload: { menuLoading: true }});
      const res = yield call(menuService.getMenuList, { params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({ type: "updateState", payload: { menuList: res.data.records, total: res.data.total, currentPage, pageSize }});
      }
      yield put({ type: "updateState", payload: { menuLoading: false }});
    },

    *getMenuIconList({ payload: params }, { select, call, put}) {
      yield put({ type: "updateState", payload: { menuIconLoading: true }});
      let currentPage = 1, pageSize = config.LIMIT_SIZE;
      if (params && params.currentPage) {
        currentPage = params.currentPage;
      }
      if (params && params.pageSize) {
        pageSize = params.pageSize;
      }
      params.currentPage = currentPage;
      params.pageSize = pageSize;

      const res = yield call(menuService.getMenuIconList, params);
      if (res.code == "200") {
        yield put({ type: "updateState", payload: { menuIconList: res.data.records, iconCurrentPage: res.data.currentPage, iconTotal: res.data.total }});
      }
      yield put({ type: "updateState", payload: { menuIconLoading: false }});
    },

    *onSave({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { saveLoading: true }});
      const { menuModalType } = yield select(state => state.menuModel);
      let res;
      if (menuModalType && menuModalType == "add") {
        res = yield call(menuService.addMenu, params);
      } else {
        res = yield call(menuService.editMenu, params);
      }
      if (res.code == "200") {
        yield put({ type: "updateState", payload: { menuModalVisible: false }});
        yield put({ type: "getMenuTreeList", payload: {}});
        message.info("???????????????");
      } else {
        message.info("???????????????");
      }
      yield put({ type: "updateState", payload: { saveLoading: false }});
    },

    *onDelete({ payload: params }, { select, call, put }) {
      const res = yield call(menuService.deleteMenu, params);
      if (res.code == "200") {
        yield put({ type: "getMenuTreeList", payload: {}});
        console.log("???????????????");
      } else {
        console.log("???????????????");
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/option/menu") {
          // ????????????list??????
          dispatch({ type: 'getMenuTreeList', payload: {} });

          // ????????????list??????
          dispatch({ type: 'getMenuIconList', payload: {} });
        }
      });
    },
  },
};
