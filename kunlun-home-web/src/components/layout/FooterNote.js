import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import config from "../../config/config";

const { Footer } = Layout;

/**
 * 顶部主菜单及其内容
 */
const FooterNote = (props) => {

  const { themeColor } = props;

  return (
    <Footer style={{ height: 0, textAlign: "center", paddingTop: "0.2%", zIndex: "99", background: themeColor }}>
      <span style={{ color: "#d1d1d1", fontSize: "10px" }}>{config.footerText}</span>
    </Footer>
  )
};

export default FooterNote;
