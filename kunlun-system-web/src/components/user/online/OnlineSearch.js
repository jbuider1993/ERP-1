import React, { Component } from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import commonStyles from '../../../pages/index.css';
import index from "../../../index.less";
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;

class OnlineSearch extends React.Component {

  constructor(props) {
    super(props);
  }

  formRef = React.createRef();

  render() {

    const { onSearch, onReset, toggleExpand, isExpandSearch } = this.props;
    const { getFieldsValue, validateFields, setFieldsValue, resetFields } = this.formRef;

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
      <div className={isExpandSearch ? commonStyles.singleRowSearch : commonStyles.doubleRowSearch}>
        <Form ref={this.formRef}>
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
                <Button size="default" icon={<i className="ri-search-line" style={iconStyle}></i>} style={{marginLeft: "10px", border: "0px", background: window._THEMECOLOR_}} onClick={() => handleSearch()}>查询</Button>
                <Button type="default" size="default" icon={<i className="ri-restart-line" style={iconStyle}></i>} style={{marginLeft: "10px"}} onClick={() => handleReset()}>重置</Button>
                <Button type="dashed" style={{marginLeft: "10px"}} onClick={() => toggleExpand()}>
                  <i className={isExpandSearch ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"} style={iconStyle}></i>搜索
                </Button>
              </FormItem>
            </Col>
          </Row>
          <Row style={{ display: isExpandSearch ? "none" : "flex"}} className={index.formRowDiv}>
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
