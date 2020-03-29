import React, { Component } from 'react';
import {Form, Input, Button, Row, Col, AutoComplete, Icon} from 'antd';
import styles from './Online.less';
import index from "../../../index.less";

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class OnlineSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expand: true
    };
  }

  render() {

    const { onSearch, onReset, form: { getFieldDecorator, getFieldsValue, setFieldsValue, resetFields }} = this.props;

    const toggleCollapse = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    };

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

    return (
      <div>
        <Form>
          <Row className={index.formRowDiv}>
            <Col span={6}>
              <FormItem {...formItemLayout} label="登录账号">
                {getFieldDecorator('loginName', {initialValue: ""})
                (<Input placeholder="请输入登录账号" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='主机IP'>
                {getFieldDecorator('loginIp', {initialValue: "",})
                (<Input placeholder="请输入主机IP" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='登录地点'>
                {getFieldDecorator('loginAddress', {initialValue: ""})
                (<Input placeholder="请输入登录地点" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <Button type="primary" size="default" icon="search" style={{marginLeft: "10px"}} onClick={() => handleSearch()}>查询</Button>
                <Button type="default" size="default" icon="rest" style={{marginLeft: "10px"}} onClick={() => handleReset()}>重置</Button>
                <Button type="dashed" style={{marginLeft: "10px"}} onClick={() => toggleCollapse()}><Icon type={this.state.expand ? 'down' : "up"}/>搜索</Button>
              </FormItem>
            </Col>
          </Row>
          <Row style={{ display: this.state.expand ? "none" : "block"}} className={index.formRowDiv}>
            <Col span={6}>
              <FormItem {...formItemLayout} label='浏览器'>
                {getFieldDecorator('usedBrowser', {initialValue: ""})
                (<Input placeholder="请输入浏览器" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='操作系统'>
                {getFieldDecorator('usedWindow', {initialValue: ""})
                (<Input placeholder="请输入操作系统" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='是否在线'>
                {getFieldDecorator('online', {initialValue: ""})
                (<Input placeholder="请选择状态" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='登录时间'>
                {getFieldDecorator('loginTime', {initialValue: ""})
                (<Input placeholder="请输入登录时间" size="default"/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

export default Form.create()(OnlineSearch);
