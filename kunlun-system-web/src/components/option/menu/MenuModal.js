import React from 'react';
import { Modal, Form, Input, Row, Col, Radio, Spin, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';
import styles from './Menu.less';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = AutoComplete.Option;

class MenuModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      radioCheckedValue: config.MENU_LEVEL[0].value
    }
  }

  formRef = React.createRef();

  render() {

    // 从传递过来的props中获取参数
    const {
      menuModalVisible, onCancel, onSave, saveLoading, onSelectParentMenu, onShowIconModal, onRadioChange,
      selectedTreeNode, selectedIconRows, menuInfoData, menuModalType,
    } = this.props;
    const { isChecked, radioCheckedValue } = this.state;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const singleFormItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };

    // 点击Modal框确定按钮触发的事件
    const onOk = () => {
      this.formRef.current.validateFields((err, values) => {
        if (!err) {
          onSave(values);
        }
      });
    };

    const onChangeType = (e) => {
      this.setState({ radioCheckedValue: e.target.value, isChecked: true });
    };

    const initMenuTitle = (selectedTreeNode, menuInfoData, field) => {
      if (selectedTreeNode) {
        return field == "id" ? selectedTreeNode.id : selectedTreeNode.name;
      }
      if (menuInfoData) {
        return field == "id" ? menuInfoData.parentId : menuInfoData.parent;
      }
      return "";
    };

    const getLongCode = (selectedTreeNode, menuInfoData) => {
      if (selectedTreeNode) {
        const longCode = selectedTreeNode.longCode;
        let newLongCode;
        if (longCode.indexOf("_") > 0) {
          newLongCode = longCode.substr(0, longCode.lastIndexOf("_")) + "_" + (menuInfoData ? menuInfoData.id : "");
        } else {
          newLongCode = longCode + (menuInfoData ? ("_" + menuInfoData.id) : "");
        }
        return newLongCode;
      }
      if (menuInfoData) {
        return menuInfoData.longCode;
      }
      return "";
    };

    const initMenuIcon = (selectedIconRows, menuInfoData, field) => {
      if (selectedIconRows) {
        return field == "id" ? selectedIconRows.iconId : selectedIconRows.key;
      }
      if (menuInfoData) {
        return field == "id" ? menuInfoData.iconId : menuInfoData.key;
      }
      return "";
    };

    const levelOptions = config.MENU_LEVEL.map(item => <Radio key={item.key} value={item.value}>{item.name}</Radio>);

    const showOptions = config.STATUS_FLAG.map(item => <Radio key={item.key} value={item.value}>{item.name}</Radio>);

    // 返回工具栏新增、批量删除按钮
    return (
      <div>
        <Spin spinning={saveLoading}>
          <Modal
            centered={true}
            className={styles.modal}
            visible={menuModalVisible}
            title={menuModalType == "add" ? "新增菜单" : "编辑菜单"}
            okText="保存"
            onCancel={onCancel}
            onOk={onOk}
            width={800}
            destroyOnClose={true}
          >
            <Form align="center" style={{marginLeft: "-4%"}} initialValues={menuInfoData} ref={this.formRef}>
              <Row>
                <Col span={0}>
                  <FormItem {...formItemLayout} label="" name={"id"} rules={[{required: false, message: ''}]}/>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单类型" rules={[{required: false, message: ''}]}>
                    <RadioGroup value={isChecked ? radioCheckedValue : (menuInfoData && menuInfoData.children ? config.MENU_LEVEL[0].value : config.MENU_LEVEL[1].value)} onChange={onChangeType}>
                      {levelOptions}
                    </RadioGroup>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="是否显示" name={"show"} rules={[{required: false, message: ''}]}>
                    <RadioGroup value={radioCheckedValue}>
                      {showOptions}
                    </RadioGroup>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={0}>
                  <FormItem {...formItemLayout} label="父级菜单Id" name={"parentId"} rules={[{required: false, message: ''}]}>
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="父级菜单" name={"parent"} rules={[{required: false, message: '请选择父级菜单'}]}>
                    <Input onClick={onSelectParentMenu}
                            disabled={isChecked ? (radioCheckedValue == config.MENU_LEVEL[0].key ? true : false) : (menuInfoData && menuInfoData.children ? true : false)}
                            suffix={<i className="ri-arrow-down-s-line" style={{fontSize: "20px"}}/>}/>
                  </FormItem>
                </Col>
                <Col span={0}>
                  <FormItem {...formItemLayout} label="longCode" name={"longCode"} rules={[{required: false, message: ''}]}>
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单名称" name={"name"} rules={[{required: false, message: '请输入菜单名称'}]}>
                    <Input/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单key" name={"key"} rules={[{required: false, message: '请输入菜单key'}]}>
                    <Input/>
                  </FormItem>
                </Col>
                <Col span={0}>
                  <FormItem {...formItemLayout} label="菜单图标Id" name={"iconId"} rules={[{required: false, message: ''}]}>
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单图标" name={"icon"} rules={[{required: false, message: '请选择菜单图标'}]}>
                    <Input onClick={onShowIconModal} suffix={<Icon type="down" className="certain-category-icon"/>}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem {...singleFormItemLayout} label="菜单url" name={"url"} rules={[{required: false, message: '请输入菜单url'}]}>
                    <Input/>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
        </Spin>
      </div>
    );
  };
}

export default MenuModal;
