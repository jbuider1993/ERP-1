import * as userService from '../../services/user/userService';
import { message } from "antd";
import config from '../../config/config';

export default {
  namespace: "amapModel",
  state: {
    zoom: 4,
    center: config.amap_info.center,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *downloadUsers({payload: params}, {select, call, put}) {
      const res = yield call(userService.downloadUsers, params);
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
        if (location.pathname === "/user/amap") {
        }
      });
    },
  },
};
