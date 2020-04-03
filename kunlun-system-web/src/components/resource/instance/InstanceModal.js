import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio, Spin, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';
import styles from './Machine.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = AutoComplete.Option;

class MachineModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      radioCheckedValue: config.MENU_LEVEL[0].key
    }
  }

  render() {

    // 从传递过来的props中获取参数
    const {
      machineModalVisible, onCancel, onSave, machineInfoData, operateType, saveLoading,
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

    const levelOptions = config.MENU_LEVEL.map(item => <Radio key={item.key} value={item.key}>{item.name}</Radio>);

    const forbidOptions = config.STATUS_FLAG.map(item => <Radio key={item.key} value={item.value}>{item.name}</Radio>);

    // 返回工具栏新增、批量删除按钮
    return (
      <div>
        <Spin spinning={saveLoading}>
          <Modal
            className={styles.modal}
            visible={machineModalVisible}
            title={operateType == "add" ? "新增菜单" : "编辑菜单"}
            okText="保存"
            onCancel={onCancel}
            onOk={onOk}
            width={650}
            destroyOnClose={true}
          >
            <Form align="center" style={{marginLeft: "-4%"}}>
              <Row>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单类型" name={"level"} rules={[{required: false, message: '请选择菜单类型'}]}>
                    <RadioGroup value={radioCheckedValue} onChange={onLevelChange}>
                      {levelOptions}
                    </RadioGroup>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="是否禁用" name={"forbid"} rules={[{required: false, message: '请选择菜单类型'}]}>
                    <RadioGroup value={radioCheckedValue}>
                      {forbidOptions}
                    </RadioGroup>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="父级菜单" name={"parent"} rules={[{required: false, message: 'parent'}]}>
                    <Input disabled={radioCheckedValue == config.MENU_LEVEL[0].key ? true : false}
                            suffix={<Icon type="down" className="certain-category-icon"/>}/>
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
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单图标" name={"icon"} rules={[{required: false, message: '请选择菜单图标'}]}>
                    <Input suffix={<Icon type="down" className="certain-category-icon"/>}/>
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="菜单url" name={"url"} rules={[{required: false, message: '请输入菜单url'}]}>
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

export default MachineModal;
