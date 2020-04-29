import React, {useState} from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio, message, Select } from 'antd';
import moment from 'moment';
import config from "../../../config/config";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const UserModal = (props) => {

  const { userModalVisible, userInfoData, operateType, onSave, updateUser, onCancel } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const [email, setEmail] = useState(null);
  const [emailSuffix, setEmailSuffix] = useState("@126.com");
  const [confirmPassword, setConfirmPassword] = useState(null);

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onOk = () => {
    validateFields().then(values => {
      if (values.password != confirmPassword) {
        message.warning("两次输入的密码不一致！");
        return;
      }
      values.email = email + emailSuffix;
      operateType == "add" ? onSave(values) : updateUser(values);
    }).catch(error => {
      const errors = error.errorFields;
      for (let i = 0; i < errors.length; i++) {
        console.log(errors[i].name[0] + " ===>>> " + errors[i].errors[0]);
      }
    });
  };

  const userSexOptions = config.USER_SEX.map(item => <Radio key={item.name} value={item.name}>{item.name}</Radio>);

  const selectAfter = (
    <Select defaultValue="@126.com" className="select-after" onChange={value => setEmailSuffix(value)}>
      <Option value="@126.com">@126.com</Option>
      <Option value="@163.com">@163.com</Option>
      <Option value="@qq.com">@qq.com</Option>
      <Option value="@foxmail.com">@foxmail.com</Option>
      <Option value="@sina.com">@sina.com</Option>
      <Option value="@139.com">@139.com</Option>
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
        width={800}
        destroyOnClose={true}
        bodyStyle={{height: "260px"}}
      >
        <Form initialValues={userInfoData} form={form} style={{marginLeft: "-45px"}}>
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
              <FormItem { ...formItemLayout } label="性别" name={"sex"} rules={[{required: true, message: '请输入密码'}]}>
                <RadioGroup>
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
              <FormItem { ...formItemLayout } label="确认密码" rules={[{required: true, message: '请输入密码'}]}>
                <Input placeholder={"请输入密码"} value={confirmPassword ? confirmPassword : (userInfoData && userInfoData.password ? userInfoData.password : null)} onChange={e => setConfirmPassword(e.target.value)}/>
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
              <FormItem { ...formItemLayout } label="邮箱" rules={[{required: true, message: '请输入邮箱'}]}>
                <Input placeholder={"请输入邮箱"} addonAfter={selectAfter} onChange={e => setEmail(e.target.value)}
                       value={email ? email : (userInfoData && userInfoData.email ? userInfoData.email.substr(0, userInfoData.email.indexOf("@")) : null)}/>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
