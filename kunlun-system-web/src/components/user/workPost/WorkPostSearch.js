import React, { Component } from 'react';
import {Form, Input, Button, Row, Col, Select} from 'antd';
import styles from './WorkPost.less';
import index from '../../../index.less';
import commonStyles from '../../../pages/index.css';
import 'remixicon/fonts/remixicon.css';
import moment from 'moment';
import config from "@/config/config";

const FormItem = Form.Item;
const Option = Select.Option;

const WorkPostSearch = (props) => {

  const { onSearch, onReset } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, getFieldValue, validateFields, setFieldsValue, resetFields } = form;

  const handleSearch = () => {
    let fields = getFieldsValue();
    const date = getFieldValue("createTime");
    if (date) {
      fields["createTime"] = moment(date).format("yyyy-MM-DD");
    }
    onSearch(fields)
  }

  const handleReset = () => {
    resetFields();
    onReset()
  }

  const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  }

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  }

  const statusOptions = config.DEPARTMENT_STATUS.map(item => <Option key={item.key} value={item.name}>{item.name}</Option>);

  return (
    <div className={commonStyles.singleRowSearch}>
      <Form form={form}>
        <Row className={index.formRowDiv}>
          <Col span={6}>
            <FormItem {...formItemLayout} label="岗位名称" name={"userName"}>
              <Input placeholder="请输入岗位名称" size="default"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label='岗位编号' name={"phoneNumber"}>
              <Input placeholder="请输入岗位编号" size="default"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label='状态' name={"status"}>
              <Select placeholder="请选择状态" style={{ width: "100%"}}>
                {statusOptions}
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Button size="default" icon={<i className="ri-search-line" style={iconStyle}></i>} style={{marginLeft: "10px", border: "0px", background: window._THEMECOLOR_}} onClick={() => handleSearch()}>查询</Button>
              <Button size="default" icon={<i className="ri-restart-line" style={iconStyle}></i>} style={{marginLeft: "10px"}} onClick={() => handleReset()}>重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default WorkPostSearch;
