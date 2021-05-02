import React, {useState} from 'react';
import { Modal, Form, Input, Row, Col, Radio, Select } from 'antd';
import moment from 'moment';
import config from "../../../config/config";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const WorkPostModal = (props) => {

  const { workPostModalVisible, workPostInfoData, operateType, onSave, updateWorkPost, onCancel } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const onOk = () => {
    validateFields().then(values => {
      operateType == "add" ? onSave(values) : updateWorkPost(values);
    }).catch(error => {
      const errors = error.errorFields;
      for (let i = 0; i < errors.length; i++) {
        console.log(errors[i].name[0] + " ===>>> " + errors[i].errors[0]);
      }
    });
  }

  const workPostSexOptions = config.DEPARTMENT_STATUS.map(item => <Radio key={item.key} value={item.key}>{item.name}</Radio>);

  return (
    <div>
      <Modal
        centered={true}
        visible={workPostModalVisible}
        title={operateType == "add" ? "新增" : "修改"}
        okText="保存"
        onCancel={onCancel}
        onOk={onOk}
        width={500}
        destroyOnClose={true}
        bodyStyle={{height: "260px"}}
      >
        <Form initialValues={workPostInfoData} form={form} style={{marginLeft: "0px"}}>
          <Row>
            <Col span={0}>
              <FormItem label="部门ID" name={"id"}>
                <Input />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="岗位名称" name={"postName"} rules={[{required: true, message: '请输入岗位名称'}]}>
                <Input placeholder={"请输入岗位名称"} disabled={operateType == "edit" ? "disabled" : false}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="岗位编号" name={"postCode"} rules={[{required: true, message: '请输入岗位编号'}]}>
                <Input placeholder={"请输入岗位编号"} disabled={operateType == "edit" ? "disabled" : false}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="状态" name={"status"} rules={[{required: true, message: '请选择状态'}]}>
                <RadioGroup>
                  {workPostSexOptions}
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
};

export default WorkPostModal;
