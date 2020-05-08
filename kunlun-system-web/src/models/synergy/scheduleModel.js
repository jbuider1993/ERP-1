import * as scheduleService from '../../services/synergy/scheduleService';
import config from '../../config/config';
import {message} from 'antd';

export default {
  namespace: 'scheduleModel',
  state: {
    scheduleList: [],
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

      debugger

      yield put({ type: "updateState", payload: { scheduleLoading: true }});
      const res = yield call(scheduleService.getAllSchedules, params);

      debugger

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
        message.success("新增成功");
      } else {
        message.error("新增失败");
      }
      yield put({ type: "updateState", payload: { scheduleLoading: false }});
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        let params = {};

        debugger

        if (location.pathname === "/synergy/schedule") {
          dispatch({ type: 'getListDatas', payload: params });
        }
      });
    },
  },
};
