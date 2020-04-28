import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio, message, Select } from 'antd';
import moment from 'moment';
import config from "../../../config/config";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const UserModal = (props) => {

  const { userModalVisible, userInfoData, operateType, onSave, updateUser, onCancel, radioChangeSex } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onOk = () => {
    validateFields().then(values => {
      operateType == "add" ? onSave(values) : updateUser(values);
    }).catch(error => {
      const errors = error.errorFields;
      for (let i = 0; i < errors.length; i++) {
        console.log(errors[i].name[0] + " ===>>> " + errors[i].errors[0]);
      }
    });
  };

  const userSexOptions = config.USER_SEX.map(item => <Radio key={item.key} value={item.value}>{item.name}</Radio>);

  const selectAfter = (
    <Select defaultValue="@126.com" className="select-after">
      <Option value=".com">@126.com</Option>
      <Option value=".jp">@163.com</Option>
      <Option value=".cn">@qq.com</Option>
      <Option value=".cn">@foxmail.com</Option>
      <Option value=".cn">@sina.com</Option>
      <Option value=".cn">@139.com</Option>
    </Select>
  );

  return (
    <div>
      <Modal
        visible={userModalVisible}
        title={operateType == "add" ? "新增" : "修改"}
        okText="保存"
        onCancel={onCancel}
        onOk={onOk}
        width={700}
        destroyOnClose={true}
      >
        <Form initialValues={userInfoData} form={form}>
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
              <FormItem { ...formItemLayout } label="性别" name={"password"} rules={[{required: true, message: '请输入密码'}]}>
                <RadioGroup value={radioChangeSex}>
                  {userSexOptions}
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem { ...formItemLayout } label="密码" name={"password"} rules={[{required: true, message: '请输入密码'}]}>
                <Input placeholder={"请输入密码"} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem { ...formItemLayout } label="确认密码" name={"password"} rules={[{required: true, message: '请输入密码'}]}>
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
                <Input placeholder={"请输入邮箱"} addonAfter={selectAfter}/>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
