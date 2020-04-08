import React, { Component } from 'react';
import { Layout, Icon, Card, Divider, Avatar, Form, Col, Input, Button } from 'antd';
import styles from './UserInfo.less';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;

/**
 * 顶部主菜单及其内容
 */
const UserInfo = (props) => {

  const { onSaveUserInfo, onCloseUserInfo, tokenModel} = props;

  const [form] = Form.useForm();
  const {getFieldDecorator, getFieldsValue, validateFields, resetFields} = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div className={styles.userInfoDiv}>
      <div className={styles.userInfoShow}>
        <Card title="个人资料" className={styles.cardHeader}>
          <div style={{ textAlign: "center" }}>
            <Avatar shape="square" size={120} icon={<i className={"ri-user-line"} />} />
          </div>
          <Divider className={styles.divider} />
          <div>
            <span><i className={"ri-user-line"} style={iconStyle}/>&nbsp;登录名称：</span>
            <span className={styles.personInfoSpan}>{tokenModel ? tokenModel.userInfo.userName : ""}</span>
          </div>
          <Divider className={styles.divider} />
          <div>
            <span><i className={"ri-file-user-line"} style={iconStyle}/>&nbsp;用户角色：</span>
            <span className={styles.personInfoSpan}>{tokenModel ? tokenModel.userInfo.userName : ""}</span>
          </div>
          <Divider className={styles.divider} />
          <div>
            <span><i className={"ri-cellphone-line"} style={iconStyle}/>&nbsp;手机号码：</span>
            <span className={styles.personInfoSpan}>{tokenModel ? tokenModel.userInfo.phoneNumber : ""}</span>
          </div>
          <Divider className={styles.divider} />
          <div>
            <span><i className={"ri-mail-line"} style={iconStyle}/>&nbsp;邮箱地址：</span>
            <span className={styles.personInfoSpan}>{tokenModel ? tokenModel.userInfo.email : ""}</span>
          </div>
          <Divider className={styles.divider} />
          <div>
            <span><i className={"ri-time-line"} style={iconStyle}/>&nbsp;创建时间：</span>
            <span className={styles.personInfoSpan}>{tokenModel ? tokenModel.userInfo.createTime.substr(0, tokenModel.userInfo.createTime.indexOf("T")) : ""}</span>
          </div>
          <Divider className={styles.divider} />
        </Card>
      </div>
      <div className={styles.userInfoUpdate}>
        <Card title="基本资料" className={styles.cardHeader}>
          <div style={{ marginLeft: "-35%" }}>
            <Form initialValues={tokenModel ? tokenModel.userInfo : null}>
              <Col span={24}>
                <FormItem { ...formItemLayout } label="用户名称" name={"userName"} rules={[{required: true, message: '请输入用户名称'}]}>
                  <Input placeholder={"请输入用户名称"} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem { ...formItemLayout } label="手机号码" name={"phoneNumber"} rules={[{required: true, message: '请输入手机号码'}]}>
                  <Input placeholder={"请输入手机号码"} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem { ...formItemLayout } label="邮箱地址" name={"email"} rules={[{required: true, message: '请输入用户名'}]}>
                  <Input placeholder={"请输入用户名"} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem { ...formItemLayout } label="旧密码" name={"password"} rules={[{required: true, message: '请输入旧密码'}]}>
                  <Input placeholder={"请输入旧密码"} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem { ...formItemLayout } label="新密码" name={"newPassword"} rules={[{required: true, message: '请输入新密码'}]}>
                  <Input placeholder={"请输入新密码"} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem { ...formItemLayout } label="确认密码" name={"newPassword"} rules={[{required: true, message: '请输入确认密码'}]}>
                  <Input placeholder={"请输入确认密码"} />
                </FormItem>
              </Col>
            </Form>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button type={"primary"} icon={<i className="ri-save-3-line" style={iconStyle}/>} onClick={onSaveUserInfo}>保存</Button>
            <Button type={"danger"} icon={<i className="ri-close-circle-line" style={iconStyle}/>} style={{ marginLeft: "10px" }} onClick={onCloseUserInfo}>关闭</Button>
          </div>
        </Card>
      </div>
    </div>
  )
};

export default UserInfo;
