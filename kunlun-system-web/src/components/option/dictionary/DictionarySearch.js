import React, { Component } from 'react';
import {Form, Input, Button, Row, Col, AutoComplete, DatePicker, Icon} from 'antd';
import styles from './Dictionary.less';
import index from '../../../index.less';
import commonStyles from '../../../pages/index.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class DictionarySearch extends React.Component {

  render() {

    const { onSearch, onReset } = this.props;
    const [form] = Form.useForm();
    const { getFieldsValue, setFieldsValue, resetFields } = form;

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
        <Form initialValues={{}}>
          <Row className={index.formRowDiv}>
            <Col span={6}>
              <FormItem {...formItemLayout} label="用户名" name={"dictionaryName"}>
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

export default DictionarySearch;
