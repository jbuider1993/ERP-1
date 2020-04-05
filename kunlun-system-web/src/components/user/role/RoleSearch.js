import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, AutoComplete} from 'antd';
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
    labelCol: {span: 10},
    wrapperCol: {span: 14},
  };

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div className={commonStyles.singleRowSearch}>
      <Form>
        <Row className={index.formRowDiv}>
          <Col span={6}>
            <FormItem {...formItemLayout} label="角色名称" name={"userName"}>
              <Input placeholder="请输入角色名称" size="default"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label='是否启用' name={"phoneNumber"}>
              <Input placeholder="请选择启用状态" size="default"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label='创建时间' name={"email"}>
              <Input placeholder="请输入创建时间" size="default"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Button type="primary" size="default" icon={<i className="ri-search-line" style={iconStyle}></i>} style={{marginLeft: "10px"}} onClick={() => handleSearch()}>查询</Button>
              <Button type="default" size="default" icon={<i className="ri-restart-line" style={iconStyle}></i>} style={{marginLeft: "10px"}} onClick={() => handleReset()}>重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RoleSearch;
