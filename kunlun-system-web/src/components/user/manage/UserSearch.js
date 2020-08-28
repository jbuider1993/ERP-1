import React, { Component } from 'react';
import {Form, Input, Button, Row, Col, AutoComplete, DatePicker} from 'antd';
import styles from './User.less';
import index from '../../../index.less';
import commonStyles from '../../../pages/index.css';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;

const UserSearch = (props) => {

  const { onSearch, onReset } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const handleSearch = () => {

    debugger

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
            <FormItem {...formItemLayout} label="用户名" name={"userName"}>
              <Input placeholder="请输入用户名" size="default"/>
            </FormItem>
          </Col>
          <Col span={6} className={styles.colDiv}>
            <FormItem {...formItemLayout} label='电话号码' name={"phoneNumber"}>
              <Input placeholder="请输入电话号码" size="default"/>
            </FormItem>
          </Col>
          <Col span={6} className={styles.colDiv}>
            <FormItem {...formItemLayout} label='创建时间' name={"createTime"}>
              <DatePicker placeholder="请输入创建时间" size="default" style={{ width: "100%"}} />
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

export default UserSearch;
