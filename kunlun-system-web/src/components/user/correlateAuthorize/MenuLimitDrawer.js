import React from 'react';
import {Form, Input, Row, Col, Spin, Tree, Drawer, Button} from 'antd';
import styles from './CorrelateAuthorize.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class MenuLimitDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedTreeNodeKeys: [],
      expandedTreeNodeKeys: []
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const keys = nextProps.roleInfoData && nextProps.roleInfoData.menuIds ? nextProps.roleInfoData.menuIds : null;
    if (keys && keys.length > 0) {
      this.setState({checkedTreeNodeKeys: keys.split(",")});
    } else {
      this.setState({checkedTreeNodeKeys: []});
    }
  }

  formRef = React.createRef();

  render() {

    const {
      menuLimitDrawerVisible, onClose, menuLimitLoading, menuList, onSelectTreeNode, roleInfoData
    } = this.props;
    const { checkedTreeNodeKeys, expandedTreeNodeKeys } = this.state;
    const { getFieldsValue, validateFields, setFieldsValue, resetFields } = this.formRef;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const onCheckTreeNode = (checkedTreeNodeKeys, item) => {
      this.setState({ checkedTreeNodeKeys })
    }

    const onExpandTreeNode = (expandedTreeNodeKeys, item) => {
      this.setState({ expandedTreeNodeKeys })
    }

    const onOk = () => {
      onSelectTreeNode(checkedTreeNodeKeys);
      this.setState({ checkedTreeNodeKeys: [], expandedTreeNodeKeys: [] });
      onClose();
    }

    const generateTreeNodes = (data) => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.key} dataRef={item}>
            {generateTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.key} dataRef={item}/>;
    })

    // 返回工具栏新增、批量删除按钮
    return (
      <div>
        <Spin spinning={menuLimitLoading}>
          <Drawer
            title={(roleInfoData && roleInfoData.roleName ? roleInfoData.roleName + "_" : "") + "菜单权限"}
            width={300}
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
                      <FormItem {...formItemLayout} name={"level"}>
                        <Search style={{marginLeft: "20px", width: "138%"}} placeholder="请输入菜单名称" onSearch={() => {}} enterButton />
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
