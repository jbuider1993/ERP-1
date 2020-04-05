import React from 'react';
import { Form, Row, Col, Input, Button, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';
import commonStyles from '../../../pages/index.css';
import index from "../../../index.less";
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class MenuSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expand: true
    };
  }

  formRef = React.createRef();

  render() {

    const {addMenu, unfoldCollapse, onSearch, onReset} = this.props;
    const {getFieldDecorator, getFieldsValue, resetFields} = this.formRef;

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

    const iconStyle = {
      verticalAlign: "bottom",
      marginRight: "5px",
    };

    return (
      <div className={this.state.expand ? commonStyles.singleRowSearch : commonStyles.doubleRowSearch}>
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
              <FormItem label={"菜单级别"} {...formItemLayout} name={"level"}>
                <AutoComplete
                  placeholder={"请输入菜单级别"}
                  dataSource={menuLevelOptions}
                >
                  <Input suffix={<Icon type="down" className="certain-category-icon"/>}/>
                </AutoComplete>
              </FormItem>
            </Col>
            <Col span={6}>
              <div style={{marginLeft: "10px"}}>
                <Button type={"primary"} onClick={searchMenuList} icon={<i className="ri-search-line" style={iconStyle}></i>}>查询</Button>
                <Button onClick={() => handleReset()} style={{marginLeft: "10px"}} icon={<i className="ri-restart-line" style={iconStyle}></i>}>重置</Button>
                <Button type="dashed" style={{marginLeft: "10px"}} onClick={() => toggleCollapse()}>
                  <i className={this.state.expand ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"} style={iconStyle}></i>搜索
                </Button>
              </div>
            </Col>
          </Row>
          <Row style={{display: this.state.expand ? "none" : "block"}} className={index.formRowDiv}>
            <Col span={6}>
              <FormItem label={"是否禁用"} {...formItemLayout} name={"forbid"}>
                <Input placeholder={"请选择是否禁用"}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"创建时间"} {...formItemLayout} name={"createTime"}>
                <Input placeholder={"请输入创建时间"}/>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

export default MenuSearch;
