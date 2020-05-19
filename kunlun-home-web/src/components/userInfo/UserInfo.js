import React, { Component, useState } from 'react';
import { Divider, Avatar, Form, Col, Input, Button, Tabs, Tree } from 'antd';
import styles from './UserInfo.less';
import 'remixicon/fonts/remixicon.css';
import moment from 'moment';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

/**
 * 顶部主菜单及其内容
 */
const UserInfo = (props) => {

  const { onSaveUserInfo, onCloseUserInfo, tokenModel, roleInfoData, menuList=[]} = props;

  const [form] = Form.useForm();
  const {getFieldDecorator, getFieldsValue, validateFields, resetFields} = form;

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  const userInfo = tokenModel && tokenModel.userInfo ? JSON.parse(tokenModel.userInfo) : "";

  const [expandedTreeNodeKeys, setExpandedTreeNodeKeys] = useState(null);

  const onExpandTreeNode = (expandedTreeNodeKeys, item) => {
    setExpandedTreeNodeKeys({ expandedTreeNodeKeys })
  };

  const resolveMenu = (menuDatas, menuKeyMap) => {
    for (let i = 0; i < menuDatas.length; i++) {
      const item = menuDatas[i];
      menuKeyMap.set(item.key, item);
      if (item.children && item.children.length > 0) {
        resolveMenu(item.children, menuKeyMap);
      }
    }
  };

  const generateMenus = (selectedMenus, menuKeyMap) => {
    if (!selectedMenus || selectedMenus.length == 0) {
      return menuList;
    }

    const selectedMenuList = [];
    const allMenuList = Array.from(menuKeyMap.values());
    const menus = selectedMenus && selectedMenus.length > 0 ? selectedMenus.split(",") : [];
    for (let i = 0; i < menus.length; i++) {
      const menu = menuKeyMap.get(menus[i]);
      if (!menu.parentId || menu.children) {
        selectedMenuList.push(menu);
      }

      if (menu.parentId) {
        const menuObj = allMenuList.filter(item => item.id == menu.parentId)[0];
        if (selectedMenus.indexOf(menuObj.key) < 0) {
          selectedMenuList.push(menuObj);
        }
      }
    }
    return selectedMenuList.sort((x, y) => moment(x.createTime) - moment(y.createTime));
  };

  const menuKeyMap = new Map();
  resolveMenu(menuList, menuKeyMap);
  const selectedMenuList = generateMenus(roleInfoData && roleInfoData.menuIds ? roleInfoData.menuIds : null, menuKeyMap);
  const generateTreeNodes = (data) => data.filter(item => item.show).map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.key} dataRef={item}>
          {generateTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.key} dataRef={item}/>;
  });

  return (
    <div className={styles.userInfoDiv}>
      <div className={styles.userInfoShow}>
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
      <div className={styles.userInfoUpdate}>
        <Tabs defaultActiveKey={"basicInfo"} style={{padding: "0px 20px 20px 20px"}}>
          <TabPane tab={<span><i className={"ri-user-line"} style={iconStyle}/>&nbsp;基本信息</span>} key={"basicInfo"}>
            <Form initialValues={userInfo ? userInfo : null}>
              <Col span={24}>
                <FormItem { ...formItemLayout } label="用户名称" name={"userName"} rules={[{required: true, message: '请输入用户名称'}]}>
                  <Input placeholder={"请输入用户名称"} disabled={"disabled"}/>
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
            <div style={{ textAlign: "center" }}>
              <Button type={"primary"} icon={<i className="ri-save-3-line" style={iconStyle}/>} onClick={onSaveUserInfo}>保存</Button>
              <Button type={"danger"} icon={<i className="ri-close-circle-line" style={iconStyle}/>} style={{ marginLeft: "10px" }} onClick={onCloseUserInfo}>关闭</Button>
            </div>
          </TabPane>
          <TabPane tab={<span><i className={"ri-windows-line"} style={iconStyle}/>&nbsp;菜单权限</span>} key={"menuLimit"}>
            <Tree onExpand={onExpandTreeNode} style={{width: "93%", overflow: "auto", height: "350px"}}>
              {
                menuList && menuList.length > 0 ? generateTreeNodes(selectedMenuList) : null
              }
            </Tree>
          </TabPane>
          <TabPane tab={<span><i className={"ri-database-line"} style={iconStyle}/>&nbsp;数据权限</span>} key={"dataLimit"}>
            <div style={{width: "93%", overflow: "auto", height: "350px"}}>暂无数据</div>
          </TabPane>
          <TabPane tab={<span><i className={"ri-team-line"} style={iconStyle}/>&nbsp;角色用户</span>} key={"roleUser"}>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
};

export default UserInfo;
