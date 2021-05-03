import * as departmentService from '../../services/user/departmentService';
import * as workPostService from '../../services/user/workPostService';
import * as roleService from '../../services/user/roleService';
import { message } from "antd";
import config from '../../config/config';

/**
 * 部门管理Model
 */
export default {
  namespace: "correlateAuthorizeModel",
  state: {
    departmentLoading: false,
    departmentList: [],
    total: 0,
    currentPage: 0,
    pageSize: 0,
    departmentModalVisible: false,
    operateType: 'add',
    departmentInfoData: null,
    selectedRowKeys: [],
    searchParams: null,
    correlateList: [],
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: params}, { select, call, put }) {
      yield put({ type: "updateState", payload: { departmentLoading: true }});
      const {itemName, radioValue} = params;
      let res = [];
      if ("department" == radioValue) {
        res = yield call(departmentService.getAllDepartment, { currentPage: 1, pageSize: 999999 });
      } else if ("post" == radioValue) {
        res = yield call(workPostService.getAllWorkPost, { currentPage: 1, pageSize: 999999 });
      } else {
        res = yield call(roleService.getAllRole, { currentPage: 1, pageSize: 999999 });
      }
      if (res.code == "200") {
        yield put({ type: 'updateState', payload: { correlateList: res.data.records }});
      }
      yield put({ type: "updateState", payload: { departmentLoading: false }});
    },

    *getUserList({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { select, call, put }) {
      yield put({ type: "updateState", payload: { departmentLoading: true }});
      const res = yield call(departmentService.getAllDepartment, { ...params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { departmentList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { departmentLoading: false }});
    },

    *addDepartment({payload: params}, {put, call}) {
      const res = yield call(departmentService.addDepartment, params);
      if (res.code == "200") {
        message.info("新增成功！");
        yield put({ type: 'updateState', payload: { departmentModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("新增失败！");
      }
    },

    *updateDepartment({payload: params}, {put, call}) {
      const res = yield call(departmentService.updateDepartment, params);
      if (res.code == "200") {
        message.info("修改成功！");
        yield put({ type: 'updateState', payload: { departmentModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("修改失败！");
      }
    },

    *deleteDepartment({payload: ids}, {put, call}) {
      const res = yield call(departmentService.deleteDepartment, ids);
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
        if (location.pathname === "/user/department") {
          dispatch({ type: 'getListDatas', payload: {}});
        }
      });
    },
  },
}
