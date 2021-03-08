import React from 'react';
import { Modal, Form, Row, Col, Radio } from 'antd';
import config from '../../../config/config';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class IconModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iconStyle: "line"
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
          width={500}
          destroyOnClose={true}
          footer={null}
        >
          <Form style={{marginLeft: "20px"}}>
            <Row>
              <Col span={24}>
                <FormItem {...formRadioLayout} label={<span style={{color: config.VIEW_COLOR}}>主题风格</span>}>
                  <RadioGroup value={this.state.iconStyle} onChange={onRadioChange}>
                    {iconStyleOptions}
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={<span style={{color: config.VIEW_COLOR}}>图标名称</span>}>
                  <div>{iconInfoData ? iconInfoData.name : ""}</div>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={<span style={{color: config.VIEW_COLOR}}>图标key</span>}>
                  <div>{iconInfoData ? iconInfoData.key : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={<span style={{color: config.VIEW_COLOR}}>图标</span>}>
                  <div><i className={iconInfoData ? "ri-" + iconInfoData.name + "-" + this.state.iconStyle : ""} style={{fontSize: "20px"}}/></div>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  };
}

export default IconModal;
