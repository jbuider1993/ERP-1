import config from "../config/config";
import * as globalService from '../services/globalService';

export default {
  namespace: "noficationModel",
  state: {
    noficationList: [],
    messageList: [],
    todoList: [],
    badgeCount: 0,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *getMessageInfo({ payload: params }, { select, call, put }) {
      // 通知消息
      const resMsg = yield call(globalService.getMessageList, {currentPage: 0, pageSize: 50000, params});
      const noficationList = new Array();
      const messageList = new Array();
      if (resMsg.code == 200) {
        const list = resMsg.data.records;
        for (let i = 0; i < list.length; i++) {
          if (list[i].type == "1" && noficationList.length < 5) {
            noficationList.push(list[i]);
          } else if (list[i].type == "2" && messageList.length < 5) {
            messageList.push(list[i]);
          }
        }
      }

      // 待办
      params = {...params, dataType: "todo"};
      const resTodo = yield call(globalService.getTodoList, { ...params, currentPage: 1, pageSize: 5 });
      const todoList = resTodo.data.records;

      // 徽标提示数
      const badgeCount = noficationList.length + messageList.length + todoList.length;
      yield put({ type: "updateState", payload: { noficationList, messageList, todoList, badgeCount }});
    },

    * clearPane({ payload: params }, { select, call, put }) {
      const { paneKey } = params;
      let { badgeCount, noficationList, messageList, todoList } = yield select(state => state.noficationModel);
      switch (paneKey) {
        case "1": {
          badgeCount = badgeCount - noficationList.length;
          yield put({ type: "updateState", payload: { noficationList: [], badgeCount }});
          break;
        }
        case "2": {
          badgeCount = badgeCount - messageList.length;
          yield put({ type: "updateState", payload: { messageList: [], badgeCount }});
          break;
        }
        case "3": {
          badgeCount = badgeCount - todoList.length;
          yield put({ type: "updateState", payload: { todoList: [], badgeCount }});
          break;
        }
      }
    },

    * onDetail({ payload: params }, { select, call, put }) {
      const { paneKey } = params;
      let { activeHeadMenuKey, activeSideMenuKey, paneTabs } = yield select(state => state.globalModel);
      switch (paneKey) {
        case "1":
        case "2": {
          activeHeadMenuKey = config.frame_menu.main[4].key;
          activeSideMenuKey = config.frame_menu.sider.option[2].key;
          const menuObj = config.frame_menu.sider.option[2];
          const flagObj = paneTabs.filter(item => item.key == menuObj.key);
          if (flagObj && flagObj.length > 0) {
            return;
          } else {
            paneTabs.push({key: menuObj.key, title: menuObj.name, url: menuObj.url});
            yield put({type: "globalModel/updateState", payload: {activeHeadMenuKey, activeSideMenuKey, paneTabs}});
          }
          break;
        }
        case "3": {
          activeHeadMenuKey = config.frame_menu.main[2].key;
          activeSideMenuKey = config.frame_menu.sider.synergy[2].key;
          const menuObj = config.frame_menu.sider.synergy[2];
          const flagObj = paneTabs.filter(item => item.key == menuObj.key);
          if (flagObj && flagObj.length > 0) {
            return;
          } else {
            paneTabs.push({key: menuObj.key, title: menuObj.name, url: menuObj.url});
            yield put({type: "globalModel/updateState", payload: {activeHeadMenuKey, activeSideMenuKey, paneTabs}});
          }
          break;
        }
        case "4": {
          activeHeadMenuKey = config.frame_menu.main[4].key;
          activeSideMenuKey = config.frame_menu.sider.option[4].key;
          const menuObj = config.frame_menu.sider.option[4];
          const flagObj = paneTabs.filter(item => item.key == menuObj.key);
          if (flagObj && flagObj.length > 0) {
            return;
          } else {
            paneTabs.push({key: menuObj.key, title: menuObj.name, url: menuObj.url});
            yield put({type: "globalModel/updateState", payload: {activeHeadMenuKey, activeSideMenuKey, paneTabs}});
          }
          break;
        }
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname == "/") {
          dispatch({ type: "getMessageInfo", payload: {}});
        }
      });
    },
  },
};
