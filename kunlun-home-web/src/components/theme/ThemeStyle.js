import React, { Component } from 'react';
import styles from './Theme.less';
import { Icon, Switch } from "antd";

const ThemeStyle = (props) => {

  const { themeStyle, onChangeStyle } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "3px",
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <ul style={{ listStyle: "none", cursor: "pointer", marginLeft: "-40px" }}>
        <li style={{ marginBottom: "5px" }}>
          <i className="ri-layout-fill" style={iconStyle}></i>&nbsp;样式布局：
        </li>
        <li>
          <ul style={{ listStyle: "none", cursor: "pointer", marginLeft: "-40px" }}>
            <li title={"左侧菜单布局"} className={themeStyle == "siderMenu" ? styles.selectedThemeDiv : styles.themeDiv} onClick={() => onChangeStyle("siderMenu")}>
              <div className={styles.headerDiv}>Header</div>
              <div className={styles.siderDiv}>Sider</div>
              <div className={styles.contentDiv}>Content</div>
            </li>
            <li title={"子菜单布局"} className={themeStyle == "subMenu" ? styles.selectedThemeDiv : styles.themeDiv} onClick={() => onChangeStyle("subMenu")}>
              <div className={styles.headerDiv}>Header</div>
              <div className={styles.subMenuDiv}>SubMenu</div>
              <div className={styles.contentSubMenuDiv}>Content</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
};

export default ThemeStyle;
