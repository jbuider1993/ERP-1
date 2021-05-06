import * as workPostService from '../../services/user/workPostService';
import { message } from "antd";
import config from '../../config/config';

export default {
  namespace: "workPostModel",
  state: {
    workPostLoading: false,
    workPostList: [],
    total: 0,
    currentPage: 0,
    pageSize: 0,
    workPostModalVisible: false,
    operateType: 'add',
    workPostInfoData: null,
    selectedRowKeys: [],
    searchParams: null,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { select, call, put }) {
      yield put({ type: "updateState", payload: { workPostLoading: true }});
      const res = yield call(workPostService.getAllWorkPost, { ...params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { workPostList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { workPostLoading: false }});
    },

    *addWorkPost({payload: params}, {put, call}) {
      const res = yield call(workPostService.addWorkPost, params);
      if (res.code == "200") {
        message.info("新增成功！");
        yield put({ type: 'updateState', payload: { workPostModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("新增失败！");
      }
    },

    *updateWorkPost({payload: params}, {put, call}) {
      const res = yield call(workPostService.updateWorkPost, params);
      if (res.code == "200") {
        message.info("修改成功！");
        yield put({ type: 'updateState', payload: { workPostModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("修改失败！");
      }
    },

    *deleteWorkPost({payload: ids}, {put, call}) {
      const res = yield call(workPostService.deleteWorkPost, ids);
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
        if (location.pathname === "/user/post") {
          dispatch({ type: 'getListDatas', payload: {}});
        }
      });
    },
  },
};
