import * as machineService from '../../services/resource/machineService';
import { message } from 'antd';
import config from '../../config/config';

export default {
  namespace: "machineModel",
  state: {
    machineLoading: false,
    machineList: [],
    machineModalVisible: false,
    operateType: "add",
    machineInfoData: null,
    saveLoading: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *getMachineList({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { machineLoading: true }});
      const res = yield call(machineService.getMachineList, { currentPage: 0, pageSize: config.PAGE_SIZE_LIST[0] });
      if (res.code == "200") {
        yield put({ type: "updateState", payload: { machineList: res.data }});
      }
      yield put({ type: "updateState", payload: { machineLoading: false }});
    },

    *downloadTemplate({ payload: params }, { select, call, put }) {
      const res = yield call(machineService.downloadTemplate, { type: "machine" });
      if (res.code != "200") {
        message.error(res.message)
      }
    },

    *onSave({ payload: params }, { select, call, put }) {
      yield put({ type: "updateState", payload: { saveLoading: true }});
      const { level } = params;
      const { selectedTreeNode, selectedIconRows } = yield select(state => state.menuModel);
      params["iconId"] = selectedIconRows[0]["id"];
      params["parentId"] = level == "1" ? null : selectedTreeNode["id"];
      params["longCode"] = level == "1" ? null : selectedTreeNode["longCode"];
      // const res = yield call(menuService.addMenu, params);
      // if (res.code == "200") {
      //   yield put({ type: "updateState", payload: { menuModalVisible: false }});
      //   yield put({ type: "getMenuTreeList", payload: {}});
      //   message.info("添加成功！");
      // } else {
      //   message.info("添加失败！");
      // }
      yield put({ type: "updateState", payload: { saveLoading: false }});
    },

    *onDelete({ payload: params }, { select, call, put }) {
      // const res = yield call(menuService.deleteMenu, params);
      // if (res.code == "200") {
      //   yield put({ type: "getMenuTreeList", payload: {}});
      //   console.log("删除成功！");
      // } else {
      //   console.log("删除失败！");
      // }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/resource/virtual") {
          dispatch({ type: 'getMachineList', payload: {} });
        }
      });
    },
  },
};
