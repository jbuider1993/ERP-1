import React, {useState} from 'react';
import { Modal, Form, Row, Col, Tree, Tag } from 'antd';
import 'remixicon/fonts/remixicon.css';
import moment from 'moment';
import style from './Role.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const ViewRoleModal = (props) => {

  const { viewRoleModalVisible, roleInfoData, operateType, onCancel, menuList, userList } = props;

  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const [expandedTreeNodeKeys, setExpandedTreeNodeKeys] = useState(null);

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onExpandTreeNode = (expandedTreeNodeKeys, item) => {
    setExpandedTreeNodeKeys({ expandedTreeNodeKeys })
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

  const resolveMenu = (menuDatas, menuKeyMap) => {
    for (let i = 0; i < menuDatas.length; i++) {
      const item = menuDatas[i];
      menuKeyMap.set(item.key, item);
      if (item.children && item.children.length > 0) {
        resolveMenu(item.children, menuKeyMap);
      }
    }
  };

  const iconStyle = {
    fontSize: "16px",
    verticalAlign: "sub",
    marginRight: "8px"
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

  let allotedUsers = [];
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    if (roleInfoData && roleInfoData.userIds && roleInfoData.userIds.indexOf(user.id) > -1) {
      allotedUsers.push(user);
    }
  }

  const itemStyle = {
    marginLeft: "10px",
  }

  return (
    <div>
      <Modal
        centered={true}
        visible={viewRoleModalVisible}
        title={"查看详情"}
        onCancel={onCancel}
        onOk={() => {}}
        width={600}
        destroyOnClose={false}
        footer={null}
        bodyStyle={{height: "465px", padding: "15px"}}
      >
        <Form form={form}>
          <Row>
            <div><i className="ri-shield-user-line" style={iconStyle}/>基本信息</div>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="角色名称" name={"roleName"}>
                <div style={itemStyle}>{roleInfoData && roleInfoData.roleName ? roleInfoData.roleName : ""}</div>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="权限字符" name={"roleWord"}>
                <div style={itemStyle}>{roleInfoData && roleInfoData.roleWord ? roleInfoData.roleWord : ""}</div>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="是否启用" name={"status"}>
                <div style={itemStyle}>{roleInfoData && roleInfoData.status ?
                  <Tag color={"#87d068"} style={{padding: "0px 10px 0px 10px"}}>是</Tag> :
                  <Tag color={"#8abdf1"} style={{padding: "0px 10px 0px 10px"}}>否</Tag>}
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div><i className="ri-windows-line" style={iconStyle}/>菜单权限</div>
            </Col>
            <Col span={8}>
              <div><i className="ri-database-line" style={iconStyle}/>数据权限</div>
            </Col>
            <Col span={8}>
              <div><i className="ri-team-line" style={iconStyle}/>分配用户</div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Tree onExpand={onExpandTreeNode} style={{width: "93%", overflow: "auto", height: "325px"}}>
                {
                  menuList && menuList.length > 0 ? generateTreeNodes(selectedMenuList) : null
                }
              </Tree>
            </Col>
            <Col span={8}>
              <div style={{width: "93%", overflow: "auto", height: "325px"}}>暂无数据</div>
            </Col>
            <Col span={8}>
              <ul style={{width: "93%", overflow: "auto", height: "325px", lineHeight: 1.8}}>
                {
                  allotedUsers ? allotedUsers.map(item => <li>{item.userName}</li>) : null
                }
              </ul>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewRoleModal;
