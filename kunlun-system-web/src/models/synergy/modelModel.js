import * as modelService from '../../services/synergy/modelService';
import { message } from "antd";
import config from "../../config/config";
import { parseProcessNode } from '../../utils/commonUtil';

export default {
  namespace: 'modelModel',
  state: {
    modelList: [],
    total: 0,
    modelLoading: false,
    currentPage: 0,
    pageSize: 0,
    modelModalVisible: false,
    operateType: 'add',
    modelInfoData: null,
    selectedRows: [],
    selectedRowKeys: [],
    searchParams: null,
    modelRecord: null,
    modelNodeList: [],
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { call, put }) {
      yield put({ type: "updateState", payload: { modelLoading: true }});
      const res = yield call(modelService.getAllModel, { params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { modelList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { modelLoading: false }});
    },

    *addModel({payload: params}, {put, call}) {
      const res = yield call(modelService.addUser, params);
      if (res.code == "200") {
        message.info("新增成功！");
        yield put({ type: 'updateState', payload: { modelModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("新增失败！");
      }
    },

    *updateModel({payload: params}, {put, call}) {
      const res = yield call(modelService.updateUser, params);
      if (res.code == "200") {
        message.info("修改成功！");
        yield put({ type: 'updateState', payload: { modelModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("修改失败！");
      }
    },

    *deployModel({payload: params}, {put, call}) {
      const res = yield call(modelService.deployModel, params);
      if (res.code == "200") {
        message.info("部署成功！");
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("部署失败！");
      }
    },

    *batchDeleteModel({payload: ids}, {put, call}) {
      const res = yield call(modelService.batchDeleteUser, ids);
      if (res.code == "200") {
        message.info("删除成功！");
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("删除失败！");
      }
    },

    *getModelNodeList({payload: params}, {put, call}) {
      const res = yield call(modelService.getModelNodeList, params);
      const obj = parseProcessNode(res);
      if (res && res.model) {
        yield put({ type: 'updateState', payload: { modelNodeList: obj.modelNodes }});
      } else {
        message.info("获取模型节点失败！");
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/synergy/model") {
          dispatch({ type: 'getListDatas', payload: {} });
        }
      });
    },
  },
};
