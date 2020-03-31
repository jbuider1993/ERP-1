import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, AutoComplete} from 'antd';
import commonStyles from '../../../pages/index.css';
import index from "../../../index.less";

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class RoleSearch extends React.Component {

  render() {

    const { onSearch, onReset, form: { getFieldDecorator, getFieldsValue, setFieldsValue, resetFields }} = this.props;

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

    return (
      <div className={commonStyles.singleRowSearch}>
        <Form>
          <Row className={index.formRowDiv}>
            <Col span={6}>
              <FormItem {...formItemLayout} label="角色名称">
                {getFieldDecorator('userName', {initialValue: ""})
                (<Input placeholder="请输入角色名称" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='是否启用'>
                {getFieldDecorator('phoneNumber', {initialValue: "",})
                (<Input placeholder="请选择启用状态" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='创建时间'>
                {getFieldDecorator('email', {initialValue: ""})
                (<Input placeholder="请输入创建时间" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <Button type="primary" size="default" icon="search" style={{marginLeft: "10px"}} onClick={() => handleSearch()}>查询</Button>
                <Button type="default" size="default" icon="rest" style={{marginLeft: "10px"}} onClick={() => handleReset()}>重置</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

export default Form.create()(RoleSearch);
