import React, {useState} from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio, message, Select } from 'antd';
import moment from 'moment';
import config from "../../../config/config";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const DepartmentModal = (props) => {

  const { departmentModalVisible, departmentInfoData, operateType, onSave, updateDepartment, onCancel } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const onOk = () => {
    validateFields().then(values => {
      operateType == "add" ? onSave(values) : updateDepartment(values);
    }).catch(error => {
      const errors = error.errorFields;
      for (let i = 0; i < errors.length; i++) {
        console.log(errors[i].name[0] + " ===>>> " + errors[i].errors[0]);
      }
    });
  }

  const departmentTypeOptions = config.DEPARTMENT_TYPE.map(item => <Radio key={item.key} value={item.key}>{item.name}</Radio>);
  const departmentStatusOptions = config.DEPARTMENT_STATUS.map(item => <Radio key={item.key} value={item.key}>{item.name}</Radio>);

  return (
    <div>
      <Modal
        centered={true}
        visible={departmentModalVisible}
        title={operateType == "add" ? "新增" : "修改"}
        okText="保存"
        onCancel={onCancel}
        onOk={onOk}
        width={550}
        destroyOnClose={true}
        bodyStyle={{height: "320px"}}
      >
        <Form initialValues={departmentInfoData} form={form} style={{marginLeft: "0px"}}>
          <Row>
            <Col span={0}>
              <FormItem label="部门ID" name={"id"}><Input /></FormItem>
              <FormItem label="父节点ID" name={"parentId"}><Input /></FormItem>
              <FormItem label="长ID" name={"longCode"}><Input /></FormItem>
            </Col>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="部门类型" name={"type"} rules={[{required: true, message: '请选择部门类型'}]}>
                <RadioGroup>
                  {departmentTypeOptions}
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="部门名称" name={"departmentName"} rules={[{required: true, message: '请输入部门名称'}]}>
                <Input placeholder={"请输入部门名称"} disabled={operateType == "edit" ? "disabled" : false}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="部门编号" name={"departmentCode"} rules={[{required: true, message: '请输入部门编号'}]}>
                <Input placeholder={"请输入部门编号"} disabled={operateType == "edit" ? "disabled" : false}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="状态" name={"status"} rules={[{required: true, message: '请选择状态'}]}>
                <RadioGroup>
                  {departmentStatusOptions}
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="职责描述" name={"dutyDesc"} rules={[{required: true, message: '请输入职责描述'}]}>
                <Input.TextArea placeholder={"请输入职责描述"} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default DepartmentModal;
