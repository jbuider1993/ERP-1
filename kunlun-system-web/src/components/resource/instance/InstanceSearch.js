import React from 'react';
import { Form, Row, Col, Input, Button, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';
import index from "../../../index.less";
import commonStyles from '../../../pages/index.css';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

const InstanceSearch = (props) => {

  const { onSearch, toggleExpand, isExpandSearch, onReset } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleSearch = () => {
    let fields = getFieldsValue();
    onSearch(fields)
  };

  const handleReset = () => {
    resetFields();
    onReset()
  };

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div className={isExpandSearch ? commonStyles.singleRowSearch : commonStyles.doubleRowSearch}>
      <Form form={form}>
        <Row className={index.formRowDiv}>
          <Col span={6}>
            <FormItem label={"服务名"} {...formItemLayout} name={"name"}>
              <Input placeholder={"请输入服务名"} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={"主机IP"} {...formItemLayout} name={"url"}>
              <Input placeholder={"请输入主机IP"} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={"实例数"} {...formItemLayout} name={"url"}>
              <Input placeholder={"请输入实例数"} />
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
            <FormItem label={"内存"} {...formItemLayout} name={"url"}>
              <Input placeholder={"请输入内存"} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default InstanceSearch;
