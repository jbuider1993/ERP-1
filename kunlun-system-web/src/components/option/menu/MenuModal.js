import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio, Spin, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';
import styles from './Menu.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = AutoComplete.Option;

class MenuModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      radioCheckedValue: config.MENU_LEVEL[0].key
    }
  }

  render() {

    // 从传递过来的props中获取参数
    const {
      menuModalVisible, onCancel, onSave, saveLoading, onSelectParentMenu, onShowIconModal, onRadioChange,
      selectedTreeNode, selectedIconRows, menuInfoData, menuModalType,
      form: {
        getFieldDecorator,
        validateFields,
      }
    } = this.props;
    const { radioCheckedValue } = this.state;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    // 点击Modal框确定按钮触发的事件
    const onOk = () => {
      validateFields((err, values) => {
        if (!err) {
          onSave(values);
        }
      });
    };

    const onLevelChange = (e) => {
      this.setState({ radioCheckedValue: e.target.value });
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

    const levelOptions = config.MENU_LEVEL.map(item => <Radio key={item.key} value={item.key}>{item.name}</Radio>);

    const forbidOptions = config.STATUS_FLAG.map(item => <Radio key={item.key} value={item.value}>{item.name}</Radio>);

    // 返回工具栏新增、批量删除按钮
    return (
      <div>
        <Spin spinning={saveLoading}>
          <Modal
            className={styles.modal}
            visible={menuModalVisible}
            title={menuModalType == "add" ? "新增菜单" : "编辑菜单"}
            okText="保存"
            onCancel={onCancel}
            onOk={onOk}
            width={800}
            destroyOnClose={true}
          >
            <Form align="center" style={{marginLeft: "-4%"}}>
              <Row>
                <Col span={0}>
                  <FormItem {...formItemLayout} label="">
                    {getFieldDecorator('id', {
                      initialValue: menuInfoData ? menuInfoData.id : null,
                      rules: [{required: false, message: ''}]
                    })}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单类型">
                    {getFieldDecorator('level', {
                      initialValue: menuInfoData ? menuInfoData.level : radioCheckedValue,
                      rules: [{required: false, message: '请选择菜单类型'}]
                    })
                    (<RadioGroup value={radioCheckedValue} onChange={onLevelChange}>
                      {levelOptions}
                    </RadioGroup>)
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="是否禁用">
                    {getFieldDecorator('forbid', {
                      initialValue: menuInfoData ? menuInfoData.forbid : false,
                      rules: [{required: false, message: '请选择菜单类型'}]
                    })
                    (<RadioGroup value={radioCheckedValue}>
                      {forbidOptions}
                    </RadioGroup>)
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={0}>
                  <FormItem {...formItemLayout} label="父级菜单Id">
                    {getFieldDecorator('parentId', {
                      initialValue: initMenuTitle(selectedTreeNode, menuInfoData, "id"),
                      rules: [{required: false, message: ''}]
                    })
                    (<Input />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="父级菜单">
                    {getFieldDecorator('parent', {
                      initialValue: initMenuTitle(selectedTreeNode, menuInfoData, "name"),
                      rules: [{required: false, message: '请选择父级菜单'}]
                    })
                    (<Input onClick={onSelectParentMenu}
                            disabled={radioCheckedValue == config.MENU_LEVEL[0].key ? true : false}
                            suffix={<Icon type="down" className="certain-category-icon"/>}/>)}
                  </FormItem>
                </Col>
                <Col span={0}>
                  <FormItem {...formItemLayout} label="longCode">
                    {getFieldDecorator('longCode', {
                      initialValue: getLongCode(selectedTreeNode, menuInfoData),
                      rules: [{required: false, message: ''}]
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单名称">
                    {getFieldDecorator('name', {
                      initialValue: menuInfoData ? menuInfoData.name : "",
                      rules: [{required: false, message: '请输入菜单名称'}]
                    })(<Input/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单key">
                    {getFieldDecorator('key', {
                      initialValue: menuInfoData ? menuInfoData.key : "",
                      rules: [{required: false, message: '请输入菜单key'}]
                    })(<Input/>)}
                  </FormItem>
                </Col>
                <Col span={0}>
                  <FormItem {...formItemLayout} label="菜单图标Id">
                    {getFieldDecorator('iconId', {
                      initialValue: initMenuIcon(selectedIconRows, menuInfoData, "id"),
                      rules: [{required: false, message: ''}]
                    })(<Input />)
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单图标">
                    {getFieldDecorator('icon', {
                      initialValue: initMenuIcon(selectedIconRows, menuInfoData, "name"),
                      rules: [{required: false, message: '请选择菜单图标'}]
                    })(<Input onClick={onShowIconModal} suffix={<Icon type="down" className="certain-category-icon"/>}/>)
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单url">
                    {getFieldDecorator('url', {
                      initialValue: menuInfoData ? menuInfoData.url : "",
                      rules: [{required: false, message: '请输入菜单url'}]
                    })(<Input/>)}
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

export default Form.create()(MenuModal);
