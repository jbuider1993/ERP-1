import * as roleService from '../../services/user/roleService';
import { message } from "antd";
import config from '../../config/config';

export default {
  namespace: 'roleModel',
  state: {
    roleList: [],
    total: 0,
    roleLoading: false,
    currentPage: 0,
    pageSize: 0,
    roleModalVisible: false,
    operateType: 'add',
    roleInfoData: null,
    selectedRowKeys: [],
    searchParams: null,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { call, put }) {
      yield put({ type: "updateState", payload: { roleLoading: true }});
      const res = yield call(roleService.getAllRole, { params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { roleList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { roleLoading: false }});
    },
    *addRole({payload: params}, {put, call}) {
      const res = yield call(roleService.addRole, params);
      if (res.code == "200") {
        message.info("新增成功！");
        yield put({ type: 'updateState', payload: { roleModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("新增失败！");
      }
    },
    *updateRole({payload: params}, {put, call}) {
      const res = yield call(roleService.updateRole, params);
      if (res.code == "200") {
        message.info("修改成功！");
        yield put({ type: 'updateState', payload: { roleModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("修改失败！");
      }
    },
    *batchDeleteRole({payload: ids}, {put, call}) {
      const res = yield call(roleService.batchDeleteRole, ids);
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
      history.listen(location => {
        if (location.pathname === "/user/role") {
          dispatch({ type: 'getListDatas', payload: {} });
        }
      });
    },
  },
};
