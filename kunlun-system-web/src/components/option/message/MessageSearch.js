import React from 'react';
import { Form, Row, Col, Input, Button, AutoComplete, Icon } from 'antd';
import styles from './Message.less';
import commonStyles from '../../../pages/index.css';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class MessageSearch extends React.Component {

  constructor(props) {
    super(props);
  }

  formRef = React.createRef();

  render() {

    const {addMenu, unfoldCollapse, onSearch, onReset} = this.props;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const searchMenuList = () => {
      const params = this.formRef.current.getFieldsValue();
      onSearch(params);
    };

    const handleReset = () => {
      this.formRef.current.resetFields();
      onReset()
    };

    const messageTypes = [{key: 1, name: "通知"}, {key: 1, name: "消息"}];
    const messageOptions = messageTypes.map(item => <Option key={item.key} value={item.name}>{item.name}</Option>);

    const iconStyle = {
      verticalAlign: "bottom",
      marginRight: "5px",
    };

    return (
      <div className={commonStyles.singleRowSearch}>
        <Form ref={this.formRef}>
          <Row className={styles.formRowDiv}>
            <Col span={6}>
              <FormItem label={"消息名称"} {...formItemLayout} name={"name"}>
                <Input placeholder={"请输入消息名称"}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"消息类型"} {...formItemLayout} name={"url"}>
                <AutoComplete
                  placeholder={"请选择消息类型"}
                  dataSource={messageOptions}
                >
                  <Input suffix={<Icon type="down" className="certain-category-icon"/>}/>
                </AutoComplete>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={"创建时间"} {...formItemLayout} name={"level"}>
                <Input placeholder={"请输入创建时间"}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <div style={{marginLeft: "10px"}}>
                <Button onClick={searchMenuList} icon={<i className="ri-search-line" style={iconStyle}></i>} style={{border: "0px", background: window._THEMECOLOR_}}>查询</Button>
                <Button onClick={() => handleReset()} style={{marginLeft: "10px"}} icon={<i className="ri-restart-line" style={iconStyle}></i>}>重置</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

export default MessageSearch;
