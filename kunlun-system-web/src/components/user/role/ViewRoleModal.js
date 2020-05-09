import React, {useState} from 'react';
import { Modal, Form, Row, Col, Tree, Tag } from 'antd';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const ViewRoleModal = (props) => {

  const { viewRoleModalVisible, roleInfoData, operateType, onCancel, menuList, allotedUsers } = props;

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

  const generateTreeNodes = (data) => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.key} dataRef={item}>
          {generateTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.key} dataRef={item}/>;
  });

  const iconStyle = {
    fontSize: "16px",
    verticalAlign: "sub",
    marginRight: "8px"
  };

  return (
    <div>
      <Modal
        visible={viewRoleModalVisible}
        title={"查看详情"}
        onCancel={onCancel}
        onOk={() => {}}
        width={700}
        destroyOnClose={false}
        footer={null}
        bodyStyle={{height: "450px"}}
      >
        <Form form={form}>
          <Row>
            <div><i className="ri-shield-user-line" style={iconStyle}/>基本信息</div>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="角色名称" name={"roleName"}>
                <div>{roleInfoData && roleInfoData.roleName ? roleInfoData.roleName : ""}</div>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="权限字符" name={"roleWord"}>
                <div>{roleInfoData && roleInfoData.roleWord ? roleInfoData.roleWord : ""}</div>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="是否启用" name={"status"}>
                <div>{roleInfoData && roleInfoData.status ? <Tag color="#87d068" style={{padding: "0px 10px 0px 10px"}}>是</Tag> : <Tag style={{padding: "0px 10px 0px 10px"}}>否</Tag>}</div>
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
              <Tree onExpand={onExpandTreeNode} style={{width: "93%", overflowY: "scroll", height: "300px"}}>
                {
                  menuList && menuList.length > 0 ? generateTreeNodes(menuList) : null
                }
              </Tree>
            </Col>
            <Col span={8}>
              <div style={{width: "93%", overflowY: "scroll", height: "300px"}}>暂无数据</div>
            </Col>
            <Col span={8}>
              <ul style={{width: "93%", overflowY: "scroll", height: "300px", lineHeight: 1.8}}>
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
