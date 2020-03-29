import React from 'react';
import {Radio, Drawer, Button, Tabs} from 'antd';
import styles from './Theme.less';
import { SketchPicker } from 'react-color';
import ThemeStyle from './ThemeStyle';

const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

const ThemeDrawer = (props) => {

  // 从传递过来的props中获取参数
  const { themeDrawerVisible, onClose, onChangeColor, onDefaultColor, onDefaultStyle, themeColor,
          themeStyle, onChangeStyle, onSelectStyle, selectedStyle, siderColor, onTabStyle } = props;

  const themeStyleProps = {
    themeStyle,
    onChangeStyle,
    onTabStyle
  };

  // 返回工具栏新增、批量删除按钮
  return (
    <div>
      <Drawer
        mask={false}
        className={themeStyle == "hsc" ? styles.drawer : [styles.drawer, styles.drawerStyle]}
        width={"260px"}
        placement="right"
        onClose={onClose}
        visible={themeDrawerVisible}
      >
        <Tabs
          hideAdd
          onChange={() => {}}
          type="editable-card"
          className={styles.tabPane}
        >
          <TabPane tab={"主题样式"} key={"style"} closable={false} style={{ marginLeft: "15px", marginRight: "15px", marginBottom: "15px" }}>
            <ThemeStyle {...themeStyleProps} />
            <Button type={"primary"} icon="save" onClick={onDefaultStyle} style={{ width: "230px" }}>默认</Button>
          </TabPane>
          <TabPane tab={"主题颜色"} key={"color"} closable={false} className={styles.sketchPicker} style={{ marginLeft: "15px", marginRight: "15px" }}>
            <RadioGroup onChange={onSelectStyle} value={selectedStyle} style={{ marginBottom: "10px" }}>
              <Radio value={"theme"}>主题栏</Radio>
              <Radio value={"sider"}>侧边栏</Radio>
            </RadioGroup>
            <SketchPicker style={{ marginBottom: "15px" }} color={selectedStyle == "theme" ? themeColor : siderColor} onChangeComplete={onChangeColor} />
            <Button type={"primary"} icon="save" onClick={onDefaultColor} style={{ width: "230px", marginTop: "15px" }}>默认</Button>
          </TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
};

export default ThemeDrawer;
