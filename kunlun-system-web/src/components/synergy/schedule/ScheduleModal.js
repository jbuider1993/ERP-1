import React from 'react';
import {Modal, Form, Row, Col, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import styles from "./Schedule.less";
import 'braft-editor/dist/index.css';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class ScheduleModal extends React.Component {

  formRef = React.createRef();

  render() {

    const {
      scheduleModalVisible, operateType, onSave, onCancel, singleSchedule, saveLoading, onCacheThemeColor, userList
    } = this.props;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const formItemRemarkLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };

    const onOk = () => {
      let flag = false;
      const optionValues = this.formRef.current.getFieldsValue();
      for (let key of Object.keys(optionValues)) {
        if (key == "id" || (key == "themeColor" && singleSchedule && singleSchedule.themeColor)) {
          continue;
        }
        const value = optionValues[key];
        flag = !value ? true : flag;
      }
      if (flag) {
        this.formRef.current.validateFields().then(values => {
          onSave(values);
        }).catch(error => {
          console.log("ScheduleModal Error ===>>> " + error);
        });
      } else {
        onSave(optionValues);
      }
    };

    const themeColors = ["red", "blue", "green", "orange", "purple"];
    const themeColorOptions = themeColors.map(item =>
      <li className={styles.scheduleThemeLi}>
        <div style={{background: item}} className={styles.scheduleThemeLiDiv} onClick={() => onCacheThemeColor(item)}>
          <i className={singleSchedule && item == singleSchedule.themeColor ? "ri-check-fill" : ""} style={{fontSize: "25px", color: "#ffffff", margin: "-9px 0px 0px -3px"}} />
        </div>
      </li>
    );

    const participantOptions = userList.map(item => <Option key={item.id} value={item.id}>{item.userName}</Option>);

    return (
      <div>
        <Modal
          centered={true}
          visible={scheduleModalVisible}
          title={operateType == "add" ? "????????????" : "????????????"}
          okText="??????"
          onCancel={onCancel}
          onOk={onOk}
          width={800}
          destroyOnClose={true}
          confirmLoading={saveLoading}
        >
          <Form ref={this.formRef} name={"scheduleModalRef"}>
            <Row initialValues={singleSchedule}>
              <Col span={0}>
                <FormItem {...formItemLayout} name={"id"}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="??????" name={"theme"} rules={[{required: true, message: '?????????????????????'}]}>
                  <Input placeholder={"?????????????????????"}/>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="????????????" name={"themeColor"} rules={[{required: true, message: '?????????????????????'}]}>
                  <div>
                    <ul className={styles.scheduleThemeUl}>
                      {themeColorOptions}
                    </ul>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="????????????" name={"startTime"} rules={[{required: true, message: '?????????????????????'}]}>
                  <DatePicker
                    style={{width: "100%"}}
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="????????????" name={"endTime"} rules={[{required: true, message: '?????????????????????'}]}>
                  <DatePicker
                    style={{width: "100%"}}
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="?????????" name={"participant"} rules={[{required: true, message: '??????????????????'}]}>
                  <Select mode="tags" style={{width: '100%'}} tokenSeparators={[',']}>
                    {participantOptions}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemRemarkLayout} label="????????????" name={"content"} rules={[{required: true, message: '?????????????????????'}]}>
                  <TextArea placeholder={"?????????????????????"}/>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  };
}

export default ScheduleModal;
