import * as processService from '../../services/synergy/processService';
import { message } from "antd";
import config from "../../config/config";
import {getModelNodeList} from "../../services/synergy/modelService";
import {parseProcessNode} from "../../utils/commonUtil";

export default {
  namespace: 'processModel',
  state: {
    processList: [],
    total: 0,
    processLoading: false,
    currentPage: 0,
    pageSize: 0,
    processModalVisible: false,
    operateType: 'add',
    processInfoData: null,
    selectedRows: [],
    selectedRowKeys: [],
    searchParams: null,
    processRecord: null,
    modelNodeList: [],
    currentNode: null
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params}}, { call, put }) {
      yield put({ type: "updateState", payload: { processLoading: true }});
      const res = yield call(processService.getAllProcess, { ...params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { processList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { processLoading: false }});
    },

    *addProcess({payload: params}, {put, call}) {
      const res = yield call(processService.addUser, params);
      if (res.code == "200") {
        message.info("新增成功！");
        yield put({ type: 'updateState', payload: { processModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("新增失败！");
      }
    },

    *updateProcess({payload: params}, {put, call}) {
      const res = yield call(processService.updateUser, params);
      if (res.code == "200") {
        message.info("修改成功！");
        yield put({ type: 'updateState', payload: { processModalVisible: false }});
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("修改失败！");
      }
    },

    *submitProcess({payload: params}, {put, call}) {
      const res = yield call(processService.submitProcess, params);
      if (res.code == "200") {
        message.info("提交成功！");
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("提交失败！");
      }
    },

    *auditProcess({payload: params}, {put, call}) {
      const res = yield call(processService.auditProcess, params);
      if (res.code == "200") {
        message.info("审核成功！");
        yield put({ type: 'getListDatas', payload: {}});
      } else {
        message.info("审核失败！");
      }
    },

    *getModelNodeList({payload: params}, {put, call}) {
      // 获取当前流程的所有节点
      const res = yield call(getModelNodeList, {modelId: params.modelId});
      const obj = parseProcessNode(res);

      // 获取当前流程的审核节点
      const currentRes = yield call(processService.getCurrentProcessNode, {procDefId: params.processDefineId, procInstId: params.processInstanceId});
      if (res && res.model) {
        yield put({ type: 'updateState', payload: { modelNodeList: obj.modelNodes, currentNode: currentRes.data }});
      } else {
        message.info("获取模型节点失败！");
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        let params = {};
        if (location.pathname === "/synergy/process") {
          dispatch({ type: 'getListDatas', payload: {params} });
        } else if (location.pathname === "/synergy/todo") {
          params = {dataType: "todo"};
          dispatch({ type: 'getListDatas', payload: {params} });
        }
      });
    },
  },
};
