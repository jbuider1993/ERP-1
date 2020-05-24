import React from 'react';
import styles from './Login.less';
import config from '../../config/config';
import {Button, Form, Input, Row, message, Spin} from 'antd';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;

const Login = (props) => {

  const {codeModel, onLogin, refreshCode, pageLoading} = props;

  const [form] = Form.useForm();
  const {getFieldsValue, validateFields, resetFields} = form;

  const login = () => {
    validateFields().then(values => {
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
    }).catch(error => {
      console.log("===== 登陆验证失败 =====");
    });
  };

  const onKeyEnter = (e) => {
    if (e.keyCode === 13) {
      login()
    }
  };

  return (
    <div className={styles.loginDiv}>
      <div className={styles.loginPicture} style={{ marginLeft: "7.4%", marginTop: "5.2%", height: "91%", width: "85%", border: "40px solid #fafafa"}}>
        <div className={styles.logoDiv}>
          <i className="ri-global-fill" style={{ fontSize: "35px", marginLeft: "5px", marginTop: "-12px", float: "left" }}></i>
          <div className={styles.logoFont}>{config.name}</div>
        </div>
        <div className={styles.spinSpanDiv}>
          <Spin spinning={pageLoading} size={"large"} tip={"页面努力加载中，请稍候！"} className={[styles.spinDot, styles.spinSpan]}>
            <div className={styles.inputDiv} style={{marginRight: "11%", marginTop: "3%"}}>
              <div className={styles.welcomeDiv}>
                <span className={styles.welcomeFont1}>欢迎使用{config.name}</span>
              </div>
              <Form initialValues={{}} form={form}>
                <Row align="center">
                  <div className={styles.loginFont}>用户登录</div>
                </Row>
                <Row align="center">
                  <FormItem name={"userName"} rules={[{required: true, message: "请输入用户名!"}]}>
                    <Input style={{ width: "240px" }} placeholder={"请输入用户名"} prefix={<i className="ri-user-3-line" style={{ color: '#506c86' }}></i>}/>
                  </FormItem>
                </Row>
                <Row align="center">
                  <FormItem name={"password"} rules={[{ required: true, message: "请输入密码!" }]}>
                    <Input.Password style={{ width: "240px" }} placeholder={"请输入密码"} prefix={<i className="ri-lock-password-line" style={{ color: '#506c86' }}></i>}/>
                  </FormItem>
                </Row>
                <Row align="center" style={{ marginLeft: "-110px" }}>
                  <FormItem name={"code"} rules={[{ required: true, message: "请输入验证码!" }]}>
                    <Input placeholder={"请输入验证码"} style={{ width: "130px" }} onPressEnter={onKeyEnter} prefix={<i className="ri-shield-flash-line" style={{ color: '#506c86' }}></i>} />
                  </FormItem>
                </Row>
                <Row style={{ marginRight: "13%", marginTop: "-17.5%", float: "right", display: "inline-block" }}>
                  <FormItem>
                    <div onClick={refreshCode}>
                      <img src={codeModel ? "data:image/png;base64," + codeModel.binary : "default.png"} style={{height: "30px", width: "100px", border: "1px solid #E8E8E8"}}/>
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

export default Login;
