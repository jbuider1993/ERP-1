import React from 'react';
import { Form, Row, Col, Input, Button, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';
import commonStyles from '../../../pages/index.css';
import index from "../../../index.less";

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class MenuSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expand: true
    };
  }

  render() {

    const {addMenu, unfoldCollapse, onSearch, onReset, form: {getFieldDecorator, getFieldsValue, resetFields}} = this.props;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const toggleCollapse = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    };

    const searchMenuList = () => {
      const params = getFieldsValue();
      onSearch(params);
    };

    const handleReset = () => {
      resetFields();
      onReset()
    };

    const menuLevelOptions = config.MENU_LEVEL.map(item => <Option key={item.key} value={item.name}>{item.name}</Option>);

    return (
      <div className={this.state.expand ? commonStyles.singleRowSearch : commonStyles.doubleRowSearch}>
        <Form>
          <Row className={index.formRowDiv}>
            <Col span={6}>
              <FormItem label={"菜单名称"} {...formItemLayout}>
                {getFieldDecorator("name", {initialValue: ""})
                (<Input placeholder={"请输入菜单名称"}/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"访问路径"} {...formItemLayout}>
                {getFieldDecorator("url", {initialValue: ""})
                (<Input placeholder={"请输入访问路径"}/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"菜单级别"} {...formItemLayout}>
                {getFieldDecorator("level", {initialValue: ""})
                (<AutoComplete
                  placeholder={"请输入菜单级别"}
                  dataSource={menuLevelOptions}
                >
                  <Input suffix={<Icon type="down" className="certain-category-icon"/>}/>
                </AutoComplete>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <div style={{marginTop: "4px", marginLeft: "10px"}}>
                <Button type={"primary"} onClick={searchMenuList} icon={"search"}>查询</Button>
                <Button onClick={() => handleReset()} style={{marginLeft: "10px"}} icon={"rest"}>重置</Button>
                <Button type="dashed" style={{marginLeft: "10px"}} onClick={() => toggleCollapse()} icon={this.state.expand ? 'down' : "up"}>搜索</Button>
              </div>
            </Col>
          </Row>
          <Row style={{display: this.state.expand ? "none" : "block"}} className={index.formRowDiv}>
            <Col span={6}>
              <FormItem label={"是否禁用"} {...formItemLayout}>
                {getFieldDecorator("forbid", {initialValue: ""})
                (<Input placeholder={"请选择是否禁用"}/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"创建时间"} {...formItemLayout}>
                {getFieldDecorator("createTime", {initialValue: ""})
                (<Input placeholder={"请输入创建时间"}/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

export default Form.create()(MenuSearch);
