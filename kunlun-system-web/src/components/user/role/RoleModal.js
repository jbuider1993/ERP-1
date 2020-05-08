import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const RoleModal = (props) => {

  const { roleModalVisible, roleInfoData, operateType, onSave, updateUser, onCancel } = props;

  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const onOk = () => {
    validateFields().then(values => {
      operateType == "add" ? onSave(values) : updateUser(values);
    }).catch(error => {
      console.log("RoleModal Error ===>>> " + error);
    });
  };

  const onClose = () => {
    // resetFields();
    onCancel();
  };

  return (
    <div>
      <Modal
        visible={roleModalVisible}
        title={operateType == "add" ? "新增" : "修改"}
        okText="保存"
        onCancel={onClose}
        onOk={onOk}
        width={500}
        destroyOnClose={false}
      >
        <Form initialValues={roleInfoData} form={form}>
          <Row>
            <Col span={0}>
              <FormItem label="用户ID" name={"id"}>
                <Input />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="角色名称" name={"roleName"} rules={[{required: true, message: '请输入角色名称'}]}>
                <Input placeholder={"请输入角色名称"} />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="权限字符" name={"roleWord"} rules={[{required: true, message: '请输入权限字符'}]}>
                <Input placeholder={"请输入权限字符"} />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="是否启用" name={"status"} rules={[{required: true, message: '请选择是否启用'}]}>
                <Input placeholder={"请选择是否启用"} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleModal;
