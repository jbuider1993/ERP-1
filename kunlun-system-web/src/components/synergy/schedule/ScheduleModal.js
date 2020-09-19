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
      scheduleModalVisible, operateType, onSave, onCancel, singleSchedule, saveLoading, onCacheThemeColor
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
      this.formRef.current.validateFields().then(values => {
        onSave(values);
      }).catch(error => {
        console.log("ScheduleModal Error ===>>> " + error);
      });
    };

    const themeColors = ["red", "blue", "green", "orange", "purple"];
    const themeColorOptions = themeColors.map(item =>
      <li className={styles.scheduleThemeLi}>
        <div style={{background: item}} className={styles.scheduleThemeLiDiv} onClick={() => onCacheThemeColor(item)}>
          <i className={singleSchedule && item == singleSchedule.themeColor ? "ri-check-fill" : ""} style={{fontSize: "25px", color: "#ffffff", margin: "-9px 0px 0px -3px"}} />
        </div>
      </li>
    );

    return (
      <div>
        <Modal
          centered={true}
          visible={scheduleModalVisible}
          title={operateType == "add" ? "新建日程" : "编辑日程"}
          okText="保存"
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
                <FormItem {...formItemLayout} label="主题" name={"theme"} rules={[{required: true, message: '请输入日程主题'}]}>
                  <Input placeholder={"请输入日程主题"}/>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="主题颜色" name={"themeColor"} rules={[{required: true, message: '请选择主题颜色'}]}>
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
                <FormItem {...formItemLayout} label="开始时间" name={"startTime"} rules={[{required: true, message: '请输入开始时间'}]}>
                  <DatePicker
                    style={{width: "100%"}}
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="结束时间" name={"endTime"} rules={[{required: true, message: '请输入结束时间'}]}>
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
                <FormItem {...formItemLayout} label="参与人" name={"participant"} rules={[{required: true, message: '请选择参与人'}]}>
                  <Select mode="tags" style={{width: '100%'}} tokenSeparators={[',']}>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...formItemRemarkLayout} label="日程内容" name={"content"} rules={[{required: true, message: '请输入日程内容'}]}>
                  <TextArea placeholder={"请输入日程内容"}/>
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
