import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio, Tree } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const ViewRoleModal = (props) => {

  const { viewRoleModalVisible, roleInfoData, operateType, onCancel, menuList } = props;

  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onCheckTreeNode = (checkedTreeNodeKeys, item) => {
    this.setState({ checkedTreeNodeKeys, selectedTreeNode: item.node.props.dataRef })
  };

  const onExpandTreeNode = (expandedTreeNodeKeys, item) => {
    this.setState({ expandedTreeNodeKeys })
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

  return (
    <div>
      <Modal
        visible={viewRoleModalVisible}
        title={"查看详情"}
        onCancel={onCancel}
        onOk={() => {}}
        width={800}
        destroyOnClose={false}
        footer={null}
        bodyStyle={{height: "500px"}}
      >
        <Form initialValues={roleInfoData} form={form}>
          <Row>
            <div>基本信息</div>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="角色名称" name={"roleName"}>
                <div></div>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="权限字符" name={"roleWord"}>
                <div></div>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem { ...formItemLayout } label="是否启用" name={"status"}>
                <div></div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div>菜单权限</div>
            </Col>
            <Col span={8}>
              <div>数据权限</div>
            </Col>
            <Col span={8}>
              <div>分配用户</div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Tree
                checkable
                autoExpandParent={true}
                onCheck={onCheckTreeNode}
                onExpand={onExpandTreeNode}
              >
                {
                  menuList && menuList.length > 0 ? generateTreeNodes(menuList) : null
                }
              </Tree>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewRoleModal;
