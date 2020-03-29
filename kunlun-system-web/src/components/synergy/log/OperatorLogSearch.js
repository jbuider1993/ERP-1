import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, AutoComplete} from 'antd';
import commonStyles from '../../../pages/index.css';
import index from '../../../index.less';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class OperatorLogSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowDetailItem: false
    }
  }

  render() {

    const {onSearch, onReset, form: {getFieldDecorator, getFieldsValue, setFieldsValue, resetFields}} = this.props;

    const handleSearch = () => {
      let fields = getFieldsValue();
      onSearch(fields)
    };

    const handleReset = () => {
      resetFields();
      onReset()
    };

    const onShowDetail = () => {
      const isShowDetailItem = this.state.isShowDetailItem;
      this.setState({ isShowDetailItem: !isShowDetailItem });
    };

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    return (
      <div className={this.state.isShowDetailItem ? commonStyles.doubleRowSearch : commonStyles.singleRowSearch}>
        <Form>
          <Row className={index.formRowDiv}>
            <Col span={6}>
              <FormItem {...formItemLayout} label="登录IP">
                {getFieldDecorator('ip', {initialValue: ""})
                (<Input placeholder="请输入模型名称" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='访问用户'>
                {getFieldDecorator('userName', {initialValue: "",})
                (<Input placeholder="请输入模型Key" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='访问服务'>
                {getFieldDecorator('serviceName', {initialValue: ""})
                (<Input placeholder="请输入创建时间" size="default"/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <Button type="primary" size="default" icon="search" style={{marginLeft: "10px"}} onClick={() => handleSearch()}>查询</Button>
                <Button type="default" size="default" icon="rest" style={{marginLeft: "10px"}} onClick={() => handleReset()}>重置</Button>
                <Button type="dashed" size="default" icon={this.state.isShowDetailItem ? "up" : "down"} style={{ marginLeft: "10px" }} onClick={() => onShowDetail()}>搜索</Button>
              </FormItem>
            </Col>
          </Row>
          {
            this.state.isShowDetailItem ?
            <Row className={index.formRowDiv}>
              <Col span={6}>
                <FormItem {...formItemLayout} label="调用方法">
                  {getFieldDecorator('methodName', {initialValue: ""})
                  (<Input placeholder="请输入模型名称" size="default"/>)}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label='操作时间'>
                  {getFieldDecorator('operateTime', {initialValue: "",})
                  (<Input placeholder="请输入模型Key" size="default"/>)}
                </FormItem>
              </Col>
            </Row> : null
          }
        </Form>
      </div>
    );
  };
}

export default Form.create()(OperatorLogSearch);
