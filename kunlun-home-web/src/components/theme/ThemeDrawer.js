import React from 'react';
import {Radio, Drawer, Button, Tabs, Icon} from 'antd';
import styles from './Theme.less';
import { SketchPicker } from 'react-color';
import ThemeStyle from './ThemeStyle';
import config from '../../config/config';
import 'remixicon/fonts/remixicon.css';

const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

const ThemeDrawer = (props) => {

  // 从传递过来的props中获取参数
  const { themeDrawerVisible, onClose, onChangeColor, onDefaultColor, onDefaultStyle, themeColor,
          themeStyle, onChangeStyle, onSelectStyle, selectedStyle, siderColor, onTabStyle, onChangeThemeColor } = props;

  const themeStyleProps = {
    themeStyle,
    onChangeStyle,
    onTabStyle,
  };

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "3px",
  };

  return (
    <div>
      <Drawer
        mask={false}
        className={styles.drawer}
        width={"300px"}
        placement="right"
        onClose={onClose}
        visible={themeDrawerVisible}
        mask={true}
      >
        <Tabs
          hideAdd
          onChange={() => {}}
          type="editable-card"
          className={styles.tabPane}
        >
          <TabPane tab={"主题样式"} key={"style"} closable={false} style={{ marginLeft: "15px", marginRight: "15px", marginBottom: "15px" }}>
            <ThemeStyle {...themeStyleProps} />
            <Button type={"primary"} icon={<i className="ri-save-3-line" style={iconStyle}></i>} onClick={onDefaultStyle} style={{ width: "270px" }}>恢复默认</Button>
          </TabPane>
          <TabPane tab={"主题颜色"} key={"color"} closable={false} className={styles.sketchPicker} style={{ marginLeft: "15px", marginRight: "15px" }}>
            <div style={{paddingBottom: "5px"}}>
              <div style={{width: "89%", paddingBottom: "5px"}}>
                <i className="ri-list-settings-fill" style={iconStyle}></i>
                <span style={{marginLeft: "5px", fontWeight: "bolder"}}>预置：</span>
              </div>
              <div style={{paddingBottom: "5px"}}>
                <RadioGroup onChange={(e) => onChangeColor("preset", e.target.value)} value={themeColor} style={{ marginBottom: "10px", lineHeight: "2" }}>
                  {
                    config.theme_color.map(item => <Radio value={item.value} style={{color: item.value}}>{item.name}</Radio>)
                  }
                </RadioGroup>
              </div>
              <div>
                <div style={{width: "89%", paddingBottom: "5px"}}>
                  <i className="ri-edit-box-fill" style={iconStyle}></i>
                  <span style={{marginLeft: "5px", fontWeight: "bolder"}}>自定义：</span>
                </div>
                <div>
                  <RadioGroup onChange={onSelectStyle} value={selectedStyle} style={{ marginBottom: "10px" }}>
                    <Radio value={"theme"}>主题栏</Radio>
                    <Radio value={"sider"}>侧边栏</Radio>
                  </RadioGroup>
                  <SketchPicker style={{ marginBottom: "15px" }} color={selectedStyle == "theme" ? themeColor : siderColor} onChangeComplete={(e) => onChangeColor("select", e.hex)} />
                </div>
              </div>
            </div>
            <Button type={"primary"} icon={<i className="ri-save-3-line" style={iconStyle}></i>} onClick={onDefaultColor} style={{ width: "270px", marginTop: "15px" }}>恢复默认</Button>
          </TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
};

export default ThemeDrawer;
