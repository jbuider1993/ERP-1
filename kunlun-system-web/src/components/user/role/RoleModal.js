import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const RoleModal = (props) => {

  const { roleModalVisible, roleInfoData, operateType, onSave, updateUser, onCancel } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onOk = () => {
    validateFields((err, values) => {
      if (!err) {
        operateType == "add" ? onSave(values) : updateUser(values);
      }
    });
  };

  return (
    <div>
      <Modal
        visible={roleModalVisible}
        title={operateType == "add" ? "新增" : "修改"}
        okText="保存"
        onCancel={onCancel}
        onOk={onOk}
        width={800}
        destroyOnClose={true}
      >
        <Form initialValues={roleInfoData}>
          <Row>
            <Col span={0}>
              <FormItem label="用户ID" name={"id"}>
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem { ...formItemLayout } label="角色名称" name={"roleName"} rules={[{required: true, message: '请输入角色名称'}]}>
                <Input placeholder={"请输入角色名称"} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem { ...formItemLayout } label="密码" name={"roleWord"} rules={[{required: true, message: '请输入密码'}]}>
                <Input placeholder={"请输入密码"} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem { ...formItemLayout } label="电话号码" name={"phoneNumber"} rules={[{required: true, message: '请输入电话号码'}]}>
                <Input placeholder={"请输入电话号码"} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem { ...formItemLayout } label="邮箱" name={"email"} rules={[{required: true, message: '请输入邮箱'}]}>
                <Input placeholder={"请输入邮箱"} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleModal;
