import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, AutoComplete} from 'antd';
import commonStyles from '../../../pages/index.css';
import index from '../../../index.less';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class OperatorLogSearch extends React.Component {

  constructor(props) {
    super(props);
  }

  formRef = React.createRef();

  render() {

    const {onSearch, onReset, isExpandSearch, onShowDetailSearch} = this.props;
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
      <div className={isExpandSearch ? commonStyles.doubleRowSearch : commonStyles.singleRowSearch}>
        <Form ref={this.formRef}>
          <Row className={index.formRowDiv}>
            <Col span={6}>
              <FormItem {...formItemLayout} label="登录IP" name={"ip"}>
                <Input placeholder="请输入模型名称" size="default"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='访问用户' name={"userName"}>
                <Input placeholder="请输入模型Key" size="default"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label='访问服务' name={"serviceName"}>
                <Input placeholder="请输入创建时间" size="default"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <Button size="default" icon={<i className="ri-search-line" style={iconStyle}></i>} style={{marginLeft: "10px", border: "0px", background: window._THEMECOLOR_}} onClick={() => handleSearch()}>查询</Button>
                <Button type="default" size="default" icon={<i className="ri-restart-line" style={iconStyle}></i>} style={{marginLeft: "10px"}} onClick={() => handleReset()}>重置</Button>
                <Button type="dashed" size="default" style={{ marginLeft: "10px" }} onClick={() => onShowDetailSearch()}>
                  <i className={isExpandSearch ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"} style={iconStyle}></i>搜索
                </Button>
              </FormItem>
            </Col>
          </Row>
          {
            isExpandSearch ?
            <Row className={index.formRowDiv}>
              <Col span={6}>
                <FormItem {...formItemLayout} label="调用方法" name={"methodName"}>
                  <Input placeholder="请输入模型名称" size="default"/>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label='操作时间' name={"operateTime"}>
                  <Input placeholder="请输入模型Key" size="default"/>
                </FormItem>
              </Col>
            </Row> : null
          }
        </Form>
      </div>
    );
  };
}

export default OperatorLogSearch;
