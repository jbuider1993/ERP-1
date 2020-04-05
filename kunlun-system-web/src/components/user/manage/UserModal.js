import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio } from 'antd';
import moment from 'moment';
import * as Icon from '@ant-design/icons';

const FormItem = Form.Item;

const UserModal = (props) => {

  const { userModalVisible, userInfoData, operateType, onSave, updateUser, onCancel } = props;
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
        visible={userModalVisible}
        title={operateType == "add" ? "新增" : "修改"}
        okText="保存"
        onCancel={onCancel}
        onOk={onOk}
        width={650}
        destroyOnClose={true}
      >
        <Form initialValues={userInfoData}>
          <Row>
            <Col span={0}>
              <FormItem label="用户ID" name={"id"}>
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem { ...formItemLayout } label="用户名" name={"userName"} rules={[{required: true, message: '请输入用户名'}]}>
                <Input placeholder={"请输入用户名"} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem { ...formItemLayout } label="密码" name={"password"} rules={[{required: true, message: '请输入密码'}]}>
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

export default UserModal;
