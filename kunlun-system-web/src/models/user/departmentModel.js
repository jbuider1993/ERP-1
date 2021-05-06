import * as departmentService from '../../services/user/departmentService';
import { message } from "antd";
import config from '../../config/config';
import * as commonUtil from '../../utils/commonUtil';

/**
 * 部门管理Model
 */
export default {
  namespace: "departmentModel",
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
    unfoldCollapseKeys: [],
    radioValue: "department",
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { select, call, put }) {
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

    *unfoldCollapse({payload: params}, {select, call, put}) {
      const {departmentList, unfoldCollapseKeys} = yield select(state => state.departmentModel);
      if (unfoldCollapseKeys.length == 0) {
        const unfoldCollapseKeys = new Array();
        commonUtil.unfoldAllNode(departmentList, unfoldCollapseKeys);
        yield put({type: 'updateState', payload: {unfoldCollapseKeys}});
      } else {
        yield put({type: 'updateState', payload: {unfoldCollapseKeys: []}});
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
