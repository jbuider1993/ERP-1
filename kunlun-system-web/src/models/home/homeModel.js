import * as homeService from '../../services/home/homeService';
import moment from 'moment';

export default {
  namespace: 'homeModel',
  state: {
    loading: false,
    userCounts: null,
    mqQueues: null,
    mqExchanges: null,
    scheduleIndex: 0,
    scheduleTotal: 0,
    scheduleData: null,
    scheduleList: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *getUserCount({ payload: params }, { select, call, put }) {
      try {
        const datas = yield call(homeService.getUserCount, {});
        if (datas.code == 200) {
          yield put({ type: 'updateState', payload: { userCounts: datas.data }});
        }
      } catch (e) {
        console.log("homeModel getUserCount Error: " + e);
      }
    },

    *getMessages({ payload: params }, { select, call, put }) {
      try {
        const res = yield call(homeService.getMessages, params);
        if (res.code == 200) {
          const mqQueues = res.data.queues;
          const mqExchanges = res.data.exchanges;
          yield put({ type: "updateStatus", payload: { mqQueues, mqExchanges }});
        }
      } catch (e) {
        console.log("homeModel getMessages Error: " + e);
      }
    },

    *getSchedules({ payload: params }, { select, call, put }) {
      const allScheduleList = [
        {id: "11111", theme: "技术选型会议", themeColor: "red", startTime: "2020-03-23 00:00:00", endTime: "2019-11-07 00:00:00", location: "会议室2019", participant: "11111", content: "1111111111"},
        {id: "22222", theme: "小组讨论", themeColor: "blue", startTime: "2019-11-08 00:00:00", endTime: "2019-11-08 00:00:00", location: "会议室2019", participant: "22222", content: "2222222222"},
        {id: "33333", theme: "代码评审", themeColor: "green", startTime: "2019-11-11 00:00:00", endTime: "2019-11-17 00:00:00", location: "会议室2019", participant: "33333", content: "3333333333"},
        {id: "44444", theme: "技术选型会议", themeColor: "purple", startTime: "2019-11-15 00:00:00", endTime: "2019-11-17 00:00:00", location: "会议室2019", participant: "44444", content: "4444444444"},
        {id: "55555", theme: "小组讨论", themeColor: "blue", startTime: "2019-11-25 00:00:00", endTime: "2019-11-27 00:00:00", location: "会议室2019", participant: "55555", content: "5555555555"},
      ];
      const scheduleList = allScheduleList.filter(item => moment(new Date()).format("YYYY-MM-DD") == moment(item.startTime).format("YYYY-MM-DD"));
      yield put({ type: "updateState", payload: { scheduleData: scheduleList[0], scheduleList, scheduleTotal: scheduleList.length }});
    },

    *onClickArrow({payload: params}, {select, call, put}) {
      const {arrowType} = params;
      let {scheduleIndex, scheduleTotal, scheduleData, scheduleList} = yield select(state => state.homeModel);
      let resultData = {};
      if (arrowType == "left") {
        scheduleIndex = scheduleIndex > 0 ? scheduleIndex - 1 : scheduleTotal - 1;
      } else {
        scheduleIndex = scheduleIndex < (scheduleTotal - 1) ? scheduleIndex + 1 : 0;
      }
      scheduleData = scheduleList[scheduleIndex];
      yield put({ type: "updateState", payload: { scheduleIndex, scheduleData }});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/home") {
          dispatch({ type: 'updateState', payload: { loading: true }});
          Promise.all([dispatch({ type: 'getUserCount', payload: {} }), dispatch({ type: 'getMessages', payload: {} })]).then(() =>
            dispatch({ type: 'updateState', payload: { loading: false }})
          );

          dispatch({ type: 'getSchedules', payload: {}});
        }
      });
    },
  },
};
