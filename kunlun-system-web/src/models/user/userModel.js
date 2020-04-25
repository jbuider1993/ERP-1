import * as userService from '../../services/user/userService';
import { message } from "antd";
import config from '../../config/config';
import * as operatorLogService from "../../services/synergy/operatorLogService";

export default {
  namespace: "userModel",
  state: {
    userLoading: false,
    userList: [],
    total: 0,
    currentPage: 0,
    pageSize: 0,
    userModalVisible: false,
    operateType: 'add',
    userInfoData: null,
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
      yield put({ type: "updateState", payload: { userLoading: true }});
      const res = yield call(userService.getAllUser, { params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { userList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { userLoading: false }});
    },

    *addUser({payload: params}, {put, call}) {
      const res = yield call(userService.addUser, params);
      if (res.code == "200") {
        message.info("新增成功！");
        yield put({ type: 'updateState', payload: { userModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("新增失败！");
      }
    },

    *updateUser({payload: params}, {put, call}) {
      const res = yield call(userService.updateUser, params);
      if (res.code == "200") {
        message.info("修改成功！");
        yield put({ type: 'updateState', payload: { userModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("修改失败！");
      }
    },

    *batchDeleteUser({payload: ids}, {put, call}) {
      const res = yield call(userService.batchDeleteUser, ids);
      if (res.code == "200") {
        message.info("删除成功！");
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("删除失败！");
      }
    },

    *downloadUsers({payload: params}, {select, call, put}) {
      const res = yield call(userService.downloadUsers, params);
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
        if (location.pathname === "/user/list") {
          dispatch({ type: 'getListDatas', payload: {} });
        }
      });
    },
  },
};
