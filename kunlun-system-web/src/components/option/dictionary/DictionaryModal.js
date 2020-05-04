import React from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import config from '../../../config/config';
import styles from './Dictionary.less';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const Option = Select.Option;

const DictionaryModal = (props) => {

  const {
    dictionaryModalVisible, onCancel, onSave, dictionaryInfoData, modalType, operateType,
  } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  debugger

  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
  };

  const onOk = () => {
    validateFields().then(values => {
      onSave(values);
    }).catch(error => {
      console.log("===== 登陆验证失败 =====");
    });
  };

  const dictStatusOptions = config.STATUS_FLAG.map(item => <Option key={item.key} value={item.key}>{item.name}</Option>);

  return (
    <div>
      <Modal
        className={styles.modal}
        visible={dictionaryModalVisible}
        title={(operateType == "add" ? "新增" : "编辑") + (modalType == "item" ? "字典项" : "字典值")}
        okText="保存"
        onCancel={onCancel}
        onOk={onOk}
        width={500}
        destroyOnClose={true}
      >
        <Form align="center" initialValues={dictionaryInfoData} form={form}>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout}
                        label={modalType == "item" ? "字典名称" : "编码"}
                        name={modalType == "item" ? "dictName" : "dictSubCode"}
                        rules={[{required: false, message: ''}]}>
                <Input/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout}
                        label={modalType == "item" ? "字典编码" : "字典值"}
                        name={modalType == "item" ? "dictCode" : "dictValue"}
                        rules={[{required: false, message: ''}]}>
                <Input/>
              </FormItem>
            </Col>
          </Row>
          <Row style={{display: modalType == "item" ? "block" : "none"}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="状态" name={"status"} rules={[{required: false, message: ''}]}>
                <Select>
                  {dictStatusOptions}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="描述" name={"description"} rules={[{required: false, message: '请选择父级菜单'}]}>
                <Input/>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default DictionaryModal;
