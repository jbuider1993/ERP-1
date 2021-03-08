import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, AutoComplete, DatePicker } from 'antd';
import commonStyles from '../../../pages/index.css';
import index from "../../../index.less";
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

const RoleSearch = (props) => {
  const { onSearch, onReset } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const handleSearch = () => {
    let fields = getFieldsValue();
    onSearch(fields)
  };

  const handleReset = () => {
    resetFields();
    onReset()
  };

  const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div className={commonStyles.singleRowSearch}>
      <Form form={form}>
        <Row className={index.formRowDiv}>
          <Col span={6}>
            <FormItem {...formItemLayout} label="角色名称" name={"roleName"}>
              <Input placeholder="请输入角色名称" size="default"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label='是否启用' name={"phoneNumber"}>
              <Input placeholder="请选择启用状态" size="default"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label='创建时间' name={"createTime"}>
              <DatePicker placeholder="请输入创建时间" size="default" style={{ width: "100%"}} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Button size="default" icon={<i className="ri-search-line" style={iconStyle}></i>} style={{marginLeft: "10px", border: "0px", background: window._THEMECOLOR_}} onClick={() => handleSearch()}>查询</Button>
              <Button type="default" size="default" icon={<i className="ri-restart-line" style={iconStyle}></i>} style={{marginLeft: "10px"}} onClick={() => handleReset()}>重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RoleSearch;
