import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio, Spin, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = AutoComplete.Option;

class IconModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iconStyle: "outlined"
    }
  }

  render() {

    const {iconModalVisible, onCancel, iconInfoData} = this.props;

    const formRadioLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const onRadioChange = (e) => {
      this.setState({ iconStyle: e.target.value });
    };

    const iconStyleOptions = config.ICON_STYLE.map(item => <Radio value={item.key}>{item.name}</Radio>);

    return (
      <div>
        <Modal
          visible={iconModalVisible}
          title={"查看图标"}
          onCancel={onCancel}
          width={650}
          destroyOnClose={true}
          footer={[]}
        >
          <Form align="center" style={{marginLeft: "-4%"}}>
            <Row>
              <Col span={24}>
                <FormItem {...formRadioLayout} label="主题风格">
                  <RadioGroup value={this.state.iconStyle} onChange={onRadioChange}>
                    {iconStyleOptions}
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="图标名称">
                  <div>{iconInfoData ? iconInfoData.name : ""}</div>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="图标">
                  <div><Icon type={iconInfoData ? iconInfoData.key : ""} theme={this.state.iconStyle} /></div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="图标key">
                  <div>{iconInfoData ? iconInfoData.key : ""}</div>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  };
}

export default Form.create()(IconModal);
