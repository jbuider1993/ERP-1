import React, { Component } from 'react';
import { connect } from 'dva';
import UserInfo from '../components/userInfo/UserInfo';

/**
 * 顶部主菜单及其内容
 */
const UserInfoPage = (props) => {

  const { dispatch, history, globalModel } = props;
  const tokenModel = window._USERINFO_;

  debugger

  const userInfoProps = {
    tokenModel,
    onCloseUserInfo: () => {
      dispatch({ type: "globalModel/updateState", payload: { homeView: "home" }});
    }
  };

  return (
    <div>
      <UserInfo {...userInfoProps} />
    </div>
  )
};

function mapStateToProps({ globalModel }) {
  return { globalModel };
}

export default connect(mapStateToProps)(UserInfoPage);
