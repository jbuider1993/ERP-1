import * as scheduleService from '../../services/synergy/scheduleService';

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
    *getListDatas({payload: {currentPage = 1, pageSize = 15, params}}, { call, put }) {
      yield put({ type: "updateState", payload: { logLoading: true }});
      const res = yield call(scheduleService.getScheduleList, { ...params, currentPage, pageSize });
      if (res.code == "200") {
        yield put({
          type: 'updateState',
          payload: { logList: res.data.records, total: res.data.total, currentPage, pageSize },
        });
      }
      yield put({ type: "updateState", payload: { logLoading: false }});
    },

    *initDatas({payload: {currentPage = 1, pageSize = 15, params}}, { call, put }) {
      yield put({ type: "updateState", payload: { logLoading: true }});
      const scheduleList = [
        {id: "11111", type: 'warning', theme: "11111", themeColor: "red", startTime: "2019-11-05 00:00:00", endTime: "2019-11-07 00:00:00", participant: "11111", content: "1111111111"},
        {id: "22222", type: 'warning', theme: "22222", themeColor: "blue", startTime: "2019-11-08 00:00:00", endTime: "2019-11-08 00:00:00", participant: "22222", content: "2222222222"},
        {id: "33333", type: 'warning', theme: "33333", themeColor: "green", startTime: "2019-11-11 00:00:00", endTime: "2019-11-17 00:00:00", participant: "33333", content: "3333333333"},
        {id: "44444", type: 'warning', theme: "44444", themeColor: "purple", startTime: "2019-11-15 00:00:00", endTime: "2019-11-17 00:00:00", participant: "44444", content: "4444444444"},
        {id: "55555", type: 'warning', theme: "55555", themeColor: "blue", startTime: "2019-11-25 00:00:00", endTime: "2019-11-27 00:00:00", participant: "55555", content: "5555555555"},
        {id: "66666", type: 'warning', theme: "66666", themeColor: "blue", startTime: "2019-11-08 00:00:00", endTime: "2019-11-08 00:00:00", participant: "66666", content: "6666666666"},
        {id: "77777", type: 'warning', theme: "77777", themeColor: "purple", startTime: "2019-11-15 00:00:00", endTime: "2019-11-17 00:00:00", participant: "77777", content: "7777777777"},
        {id: "77777", type: 'warning', theme: "77777", themeColor: "purple", startTime: "2019-11-15 00:00:00", endTime: "2019-11-17 00:00:00", participant: "77777", content: "7777777777"},
        {id: "77777", type: 'warning', theme: "77777", themeColor: "purple", startTime: "2019-11-15 00:00:00", endTime: "2019-11-17 00:00:00", participant: "77777", content: "7777777777"},
        {id: "77777", type: 'warning', theme: "77777", themeColor: "purple", startTime: "2019-11-15 00:00:00", endTime: "2019-11-17 00:00:00", participant: "77777", content: "7777777777"},
      ];
      yield put({ type: "updateState", payload: { scheduleLoading: false, scheduleList }});
    },

    *onSave({ payload: params}, { select, call, put}) {
      yield put({ type: "updateState", payload: { saveLoading: true }});
      const {scheduleList, operateType, singleSchedule} = yield select(state => state.scheduleModel);
      params.themeColor = singleSchedule.themeColor;
      scheduleList.push(params);
      yield put({ type: "updateState", payload: { saveLoading: false, scheduleModalVisible: false, scheduleList }});
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        let params = {};
        if (location.pathname === "/synergy/schedule") {
          dispatch({ type: 'getListDatas', payload: {params} });
          dispatch({ type: 'initDatas', payload: {params} });
        }
      });
    },
  },
};
