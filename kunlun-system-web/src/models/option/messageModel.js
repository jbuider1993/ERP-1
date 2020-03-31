import * as messageService from '../../services/option/messageService';
import config from "../../config/config";
import {message} from "antd";

export default {
  namespace: 'messageModel',
  state: {
    messageLoading: false,
    newMessageModalVisible: false,
    showMessageModalVisible: false,
    messageModalType: "add",
    messageList: [],
    currentSize: "",
    pageSize: "",
    total: "",
    messageRecord: null,
    messageType: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *getListDatas({ payload: {currentPage = 1, pageSize = config.PAGE_SIZE, params} }, { select, call, put }) {
      yield put({type: "updateState", payload: {messageLoading: true}});
      const res = yield call(messageService.getAllMessages, { params, currentPage, pageSize });
      let messageList = [], currentSize = "", total = "", size = "";
      if (res.code == 200) {
        messageList = res.data.records;
        currentSize = res.data.currentPage;
        total = res.data.total;
        size = res.data.pageSize;
      }
      yield put({type: "updateState", payload: {messageLoading: false, messageList, currentSize, total, pageSize: size}});
    },

    *addMessage({ payload: params }, { select, call, put }) {
      const {messageType} = yield select(state => state.messageModel);
      params.type = messageType;

      const res = yield call(messageService.addMessage, params);
      if (res.code == 200) {
        message.success("消息新增成功！");
      } else {
        message.error("消息新增失败！");
      }
      yield put({type: "getListDatas", payload: {}});
      yield put({type: "updateState", payload: {newMessageModalVisible: false}});
    },

    *loadMoreMessage({ payload: params }, { select, call, put }) {
      yield put({type: "updateState", payload: {messageLoading: true}});
      const {pageSize} = yield select(state => state.messageModel);
      let totalSize = pageSize + config.PAGE_SIZE;
      const res = yield call(messageService.getAllMessages, {currentPage: 1, pageSize: totalSize, params});
      let messageList = [], currentSize = "", total = "", size = "";
      if (res.code == 200) {
        messageList = res.data.records;
        currentSize = res.data.currentPage;
        total = res.data.total;
        size = res.data.pageSize;
      }
      yield put({type: "updateState", payload: {messageLoading: false, messageList, currentSize, total, pageSize: size}});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/option/notice") {
          dispatch({ type: 'getListDatas', payload: {} });
        }
      });
    },
  },
};
