import React from 'react';
import { Form, Row, Col, Input, Button, AutoComplete, Icon } from 'antd';
import styles from './Message.less';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class MessageSearch extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {addMenu, unfoldCollapse, onSearch, onReset, form: {getFieldDecorator, getFieldsValue, resetFields}} = this.props;

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

    const messageTypes = [{key: 1, name: "通知"}, {key: 1, name: "消息"}];
    const messageOptions = messageTypes.map(item => <Option key={item.key} value={item.name}>{item.name}</Option>);

    return (
      <div>
        <Form>
          <Row className={styles.formRowDiv}>
            <Col span={6}>
              <FormItem label={"消息名称"} {...formItemLayout}>
                {getFieldDecorator("name", {initialValue: ""})
                (<Input placeholder={"请输入消息名称"}/>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"消息类型"} {...formItemLayout}>
                {getFieldDecorator("url", {initialValue: ""})
                (<AutoComplete
                  placeholder={"请选择消息类型"}
                  dataSource={messageOptions}
                >
                  <Input suffix={<Icon type="down" className="certain-category-icon"/>}/>
                </AutoComplete>)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"创建时间"} {...formItemLayout}>
                {getFieldDecorator("level", {initialValue: ""})
                (<Input placeholder={"请输入创建时间"}/>)}
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

export default Form.create()(MessageSearch);
