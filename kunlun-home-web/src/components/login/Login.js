import React from 'react';
import styles from './Login.less';
import config from '../../config/config';
import {Button, Form, Input, Row, Icon, message, Spin} from 'antd';

const FormItem = Form.Item;

const Login = (props) => {

  const {
    codeModel,
    onLogin,
    refreshCode,
    pageLoading,
    form: {
      getFieldDecorator,
      getFieldsValue,
      validateFields,
      resetFields
    }
  } = props;

  const login = () => {
    validateFields((err, values) => {
      if (!!err) return;

      if (values["code"].toLowerCase() != codeModel.code.toLowerCase()) {
        message.warning("输入的验证码有误！");
        return;
      }

      if (new Date().getTime() - new Date(codeModel.createTime).getTime() > 1000 * 60) {
        message.warning("验证码已过期，请重新输入！");
        resetFields("code");
        return;
      }
      onLogin(values);
    });
  };

  const onKeyEnter = (e) => {
    if (e.keyCode === 13) {
      login()
    }
  };

  return (
    <div className={styles.loginDiv}>
      <div className={styles.loginPicture} style={{ marginLeft: "7.4%", marginTop: "5.2%", height: "90%", width: "85%", border: "40px solid #fafafa"}}>
        <div className={styles.logoDiv}>
          <Icon type={"windows"} theme={"filled"} className={styles.logoIcon} />
          <div className={styles.logoFont}>{config.name}</div>
        </div>
        <div className={styles.spinSpanDiv}>
          <Spin spinning={pageLoading} size={"large"} tip={"页面努力加载中，请稍候！"} className={[styles.spinDot, styles.spinSpan]}>
            <div className={styles.inputDiv}>
              <div className={styles.welcomeDiv}>
                <span className={styles.welcomeFont1}>欢迎使用{config.name}</span>
              </div>
              <Form>
                <Row>
                  <div className={styles.loginFont}>用户登录</div>
                </Row>
                <Row align="left">
                  <FormItem>
                    {getFieldDecorator('userName', {
                      initialValue: "", rules: [{ required: true, message: "请输入用户名!" }]})
                    (<Input style={{ width: "240px" }} placeholder={"请输入用户名"} prefix={<Icon type="user" style={{ color: '#506c86' }} />}/>)}
                  </FormItem>
                </Row>
                <Row align="center">
                  <FormItem>
                    {getFieldDecorator('password', {
                      initialValue: "", rules: [{ required: true, message: "请输入密码!" }]})
                    (<Input.Password style={{ width: "240px" }} placeholder={"请输入密码"} prefix={<Icon type="lock" style={{ color: '#506c86' }} />}/>)}
                  </FormItem>
                </Row>
                <Row style={{ left: "-55px" }}>
                  <FormItem>
                    {getFieldDecorator('code', {
                      initialValue: "", rules: [{ required: true, message: "请输入验证码!" }]})
                    (<Input placeholder={"请输入验证码"} style={{ width: "130px" }} onPressEnter={onKeyEnter} prefix={<Icon type="safety" style={{ color: '#506c86' }} />} />)}
                  </FormItem>
                </Row>
                <Row style={{ right: "13.5%", marginTop: "-20.4%", float: "right", display: "inline-block" }}>
                  <FormItem>
                    <div onClick={refreshCode}>
                      <img src={codeModel ? "data:image/png;base64," + codeModel.binary : null} />
                    </div>
                  </FormItem>
                </Row>
                <Row align="center">
                  <Button type="primary" size="default" style={{ width: "240px" }} onClick={login}>登录</Button>
                </Row>
              </Form>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(Login);
