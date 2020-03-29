import React, { Component } from 'react';
import styles from './Theme.less';
import { Icon, Switch } from "antd";

const ThemeStyle = (props) => {

  const { themeStyle, onChangeStyle, onTabStyle } = props;

  return (
    <div style={{ marginBottom: "15px" }}>
      <ul style={{ listStyle: "none", cursor: "pointer", marginLeft: "-40px" }}>
        <li style={{ marginBottom: "5px" }}><Icon type="layout" />&nbsp;样式布局：</li>
        <li>
          <ul style={{ listStyle: "none", cursor: "pointer", marginLeft: "-40px" }}>
            <li className={themeStyle == "hsc" ? [styles.themeDiv, styles.themeDivHover] : styles.themeDiv} onClick={() => onChangeStyle("hsc")}>
              <div className={styles.headerDiv}>Header</div>
              <div className={styles.siderDiv}>Sider</div>
              <div className={styles.contentDiv}>Content</div>
            </li>
            <li className={themeStyle == "hscf" ? [styles.themeDiv, styles.themeDivHover] : styles.themeDiv} onClick={() => onChangeStyle("hscf")}>
              <div className={styles.headerDiv}>Header</div>
              <div className={styles.siderDiv}>Sider</div>
              <div className={styles.contentDiv}>Content</div>
              <div className={styles.footerDiv}>Footer</div>
            </li>
          </ul>
        </li>
        <li style={{ marginBottom: "5px" }}><Icon type="block" />&nbsp;页签样式：</li>
        <li>
          <Switch checkedChildren="无间距" unCheckedChildren="有空隙" defaultChecked onChange={onTabStyle} />
        </li>
      </ul>
    </div>
  )
};

export default ThemeStyle;
