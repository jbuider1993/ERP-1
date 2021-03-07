import * as scheduleService from '../../services/synergy/scheduleService';
import config from '../../config/config';
import {message} from 'antd';
import * as userService from "@/services/user/userService";

export default {
  namespace: 'scheduleModel',
  state: {
    scheduleList: [],
    userList: [],
    scheduleLoading: false,
    operateType: 'add',
    scheduleModalVisible: false,
    daySchedules: [],
    detailScheduleModalVisible: false,
    singleSchedule: null,
    calendarMode: "month",
    saveLoading: false,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *getListDatas({payload: params}, { call, put }) {
      yield put({ type: "updateState", payload: { scheduleLoading: true }});
      const res = yield call(scheduleService.getAllSchedules, params);
      if (res.code == "200") {
        yield put({type: 'updateState', payload: { scheduleList: res.data }});
      }
      yield put({ type: "updateState", payload: { scheduleLoading: false }});
    },

    *onSave({ payload: params}, { select, call, put}) {
      yield put({ type: "updateState", payload: { scheduleLoading: true }});
      const res = yield call(scheduleService.addSchedule, params);
      if (res.code == "200") {
        yield put({type: 'updateState', payload: { scheduleList: res.data }});
        yield put({type: 'getListDatas', payload: {}});
        message.success("新增成功");
      } else {
        message.error("新增失败");
      }
      yield put({ type: "updateState", payload: { scheduleLoading: false }});
    },

    *getUserList({payload: {params}}, { select, call, put }) {
      const res = yield call(userService.getAllUser, { ...params, currentPage: 1, pageSize: 999999 });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { userList: res.data.records },
        });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        let params = {};
        if (location.pathname === "/synergy/schedule") {
          dispatch({ type: 'getListDatas', payload: params });
        }
      });
    },
  },
};
