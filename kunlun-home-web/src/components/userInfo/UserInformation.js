import React, { Component, useState } from 'react';
import { Divider, Avatar, Form, Col, Input, Button, Tabs, Tree } from 'antd';
import styles from './UserInfo.less';
import 'remixicon/fonts/remixicon.css';
import moment from 'moment';

const TreeNode = Tree.TreeNode;

/**
 * 顶部主菜单及其内容
 */
const UserInformation = (props) => {

  const {tokenModel, roleInfoData} = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  const userInfo = tokenModel && tokenModel.userInfo ? JSON.parse(tokenModel.userInfo) : "";

  return (
    <div id={"userInformation"} className={styles.userInfoShow}>
      <div style={{margin: "0px 0px 10px 0px"}}>
        <i className="ri-file-text-line" style={{fontSize: "18px", verticalAlign: "sub", marginRight: "5px"}}/>个人资料
      </div>
      <div className={styles.cardHeader}>
        <div style={{ textAlign: "center" }}>
          <Avatar shape="square" size={120} icon={<i className={"ri-user-line"} />} />
        </div>
        <Divider className={styles.divider} />
        <div>
          <span><i className={"ri-user-line"} style={iconStyle}/>&nbsp;登录名称：</span>
          <span className={styles.personInfoSpan}>{userInfo ? userInfo.userName : ""}</span>
        </div>
        <Divider className={styles.divider} />
        <div>
          <span><i className={"ri-file-user-line"} style={iconStyle}/>&nbsp;用户角色：</span>
          <span className={styles.personInfoSpan}>{userInfo ? userInfo.userName : ""}</span>
        </div>
        <Divider className={styles.divider} />
        <div>
          <span><i className={"ri-cellphone-line"} style={iconStyle}/>&nbsp;手机号码：</span>
          <span className={styles.personInfoSpan}>{userInfo ? userInfo.phoneNumber : ""}</span>
        </div>
        <Divider className={styles.divider} />
        <div>
          <span><i className={"ri-mail-line"} style={iconStyle}/>&nbsp;邮箱地址：</span>
          <span className={styles.personInfoSpan}>{userInfo ? userInfo.email : ""}</span>
        </div>
        <Divider className={styles.divider} />
        <div>
          <span><i className={"ri-time-line"} style={iconStyle}/>&nbsp;创建时间：</span>
          <span className={styles.personInfoSpan}>{userInfo ? userInfo.createTime.substr(0, userInfo.createTime.indexOf("T")) : ""}</span>
        </div>
        <Divider className={styles.divider} />
      </div>
    </div>
  )
};

export default UserInformation;
