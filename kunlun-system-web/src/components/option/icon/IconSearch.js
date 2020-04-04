import React from 'react';
import { Form, Row, Col, Input, Button, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';
import index from "../../../index.less";
import commonStyles from '../../../pages/index.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class IconSearch extends React.Component {

  formRef = React.createRef();

  render() {

    const {onSearch, onReset} = this.props;
    const { getFieldsValue, setFieldsValue, resetFields } = this.formRef;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const searchMenuList = () => {
      const params = getFieldsValue();
      onSearch(params);
    };

    const handleReset = () => {
      resetFields();
      onReset()
    };

    const menuLevelOptions = config.MENU_LEVEL.map(item => <Option key={item.key}
                                                                   value={item.name}>{item.name}</Option>);

    return (
      <div className={commonStyles.singleRowSearch}>
        <Form ref={this.formRef}>
          <Row className={index.formRowDiv}>
            <Col span={6}>
              <FormItem label={"菜单名称"} {...formItemLayout} name={"name"}>
                <Input placeholder={"请输入菜单名称"}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"访问路径"} {...formItemLayout} name={"url"}>
                <Input placeholder={"请输入访问路径"}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"创建时间"} {...formItemLayout} name={"createTime"}>
                <Input placeholder={"请输入创建时间"}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <div style={{marginTop: "4px", marginLeft: "10px"}}>
                <Button type={"primary"} onClick={searchMenuList} icon={"search"}>查询</Button>
                <Button onClick={() => handleReset()} style={{marginLeft: "10px"}} icon={"rest"}>重置</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

export default IconSearch;
