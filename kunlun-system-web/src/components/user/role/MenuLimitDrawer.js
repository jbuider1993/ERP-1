import React from 'react';
import {Modal, Form, Input, Row, Col, Spin, Tree, Drawer, Button, Divider} from 'antd';
import styles from './Role.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

class MenuLimitDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedTreeNodeKeys: [],
      selectedTreeNode: null
    };
  }

  formRef = React.createRef();

  render() {

    // 从传递过来的props中获取参数
    const {
      menuLimitDrawerVisible, onClose, menuLimitLoading, menuList, onSelectTreeNode
    } = this.props;
    const { checkedTreeNodeKeys, expandedTreeNodeKeys, selectedTreeNode } = this.state;
    const { getFieldsValue, validateFields, setFieldsValue, resetFields } = this.formRef;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };

    const onCheckTreeNode = (checkedTreeNodeKeys, item) => {
      this.setState({ checkedTreeNodeKeys, selectedTreeNode: item.node.props.dataRef })
    };

    const onExpandTreeNode = (expandedTreeNodeKeys, item) => {
      this.setState({ expandedTreeNodeKeys })
    };

    const onOk = () => {
      onSelectTreeNode(selectedTreeNode);
      this.setState({ checkedTreeNodeKeys: [], expandedTreeNodeKeys: [] });
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

    // 返回工具栏新增、批量删除按钮
    return (
      <div className={styles.drawerDiv}>
        <Spin spinning={menuLimitLoading}>
          <Drawer
            title="菜单权限"
            width={"25%"}
            placement="right"
            onClose={onClose}
            maskClosable={false}
            visible={menuLimitDrawerVisible}
            className={styles.menuDrawer}
          >
            <div className={styles.menuDrawerDiv}>
              <div className={styles.menuDrawerModalDiv}>
                <Form ref={this.formRef}>
                  <Row>
                    <Col span={24}>
                      <FormItem {...formItemLayout} label="菜单名称" name={"level"} rules={[{required: false, message: '请选择菜单类型'}]}>
                        <Input/>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className={styles.menuDrawerTreeDiv}>
                <Tree
                  checkable
                  autoExpandParent={true}
                  onCheck={onCheckTreeNode}
                  checkedKeys={checkedTreeNodeKeys}
                  expandedKeys={expandedTreeNodeKeys}
                  onExpand={onExpandTreeNode}
                >
                  {
                    menuList && menuList.length > 0 ? generateTreeNodes(menuList) : null
                  }
                </Tree>
              </div>
              <div className={styles.menuDrawerFooterDiv}>
                <Button style={{marginRight: "20px"}} onClick={onClose}>取消</Button>
                <Button type="primary" onClick={onOk}>确定</Button>
              </div>
            </div>
          </Drawer>
        </Spin>
      </div>
    );
  };
}

export default MenuLimitDrawer;
