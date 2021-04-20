import React from 'react';
import { Layout } from 'antd';
import Login from '../components/login/Login';
import { connect } from 'dva';
import config from '../config/config';

const { Content, Footer } = Layout;

/**
 * 登录界面
 */
const LoginPage = (props) => {

  const { dispatch, globalModel } = props;
  const { colorValue, codeModel, pageLoading } = globalModel;

  const loginProps = {
    codeModel,
    pageLoading,
    onLogin: (data) => {
      dispatch({ type: "globalModel/login", payload: data });
    },
    refreshCode: () => {
      dispatch({ type: "globalModel/getAuthCode", payload: {}});
    },
  };

  return (
    <Layout style={{ width: "100%", height: '100%', borderRight: 0, background: "#31ac90" }}>
      <Content style={{ height: "90%" }}>
        <Login {...loginProps} />
      </Content>
      <Footer style={{textAlign: "center", padding: "10px"}}>{config.footerText}</Footer>
    </Layout>
  )
}

function mapStateToProps({ globalModel }) {
  return { globalModel };
}

export default connect(mapStateToProps)(LoginPage);
