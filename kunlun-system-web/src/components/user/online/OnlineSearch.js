import React, { Component } from 'react';
import {Form, Input, Button, Row, Col, AutoComplete, Icon} from 'antd';
import commonStyles from '../../../pages/index.css';
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

    const { onSearch, onReset } = this.props;
    const [form] = Form.useForm();
    const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

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
      <div className={this.state.expand ? commonStyles.singleRowSearch : commonStyles.doubleRowSearch}>
        <Form>
          <Row className={index.formRowDiv}>
            <Col span={6}>
              <FormItem {...formItemLayout} label="登录账号" name={"loginName"}>
                <Input placeholder="请输入登录账号" size="default"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='主机IP' name={"loginIp"}>
                <Input placeholder="请输入主机IP" size="default"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='登录地点' name={"loginAddress"}>
                <Input placeholder="请输入登录地点" size="default"/>
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
              <FormItem {...formItemLayout} label='浏览器' name={"usedBrowser"}>
                <Input placeholder="请输入浏览器" size="default"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='操作系统' name={"usedWindow"}>
                <Input placeholder="请输入操作系统" size="default"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='是否在线' name={"online"}>
                <Input placeholder="请选择状态" size="default"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='登录时间' name={"loginTime"}>
                <Input placeholder="请输入登录时间" size="default"/>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

export default OnlineSearch;
