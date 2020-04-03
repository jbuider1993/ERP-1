import React from 'react';
import { Modal, Form, Row, Col } from 'antd';
import moment from 'moment';
import styles from "./OperatorLog.less";

const FormItem = Form.Item;

const OperatorLogModal = (props) => {

  const { logModalVisible, logRecord, onCancel } = props;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const formTwoItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const formOneItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  return (
    <div>
      <Modal
        visible={logModalVisible}
        onCancel={onCancel}
        title={"日志详情"}
        width={850}
        destroyOnClose={true}
        footer={null}
        mask={false}
        className={styles.processModal}
      >
        <div>
          <Form>
            <Row>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="登录地址">
                  <div>{logRecord ? logRecord.ip : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="登录用户">
                  <div>{logRecord ? logRecord.userName : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="操作描述">
                  <div>{logRecord ? logRecord.operateDescription : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <FormItem { ...formTwoItemLayout } label="请求URL">
                  <div>{logRecord ? logRecord.requestUrl : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="请求方式">
                  <div>{logRecord ? logRecord.style : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <FormItem { ...formTwoItemLayout } label="请求参数">
                  <div>{logRecord ? logRecord.params : ""}</div>
                </FormItem>
              </Col>

            </Row>
            <Row>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="请求协议">
                  <div>{logRecord ? logRecord.protocal : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="访问服务">
                  <div>{logRecord ? logRecord.serviceName : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="服务端口">
                  <div>{logRecord ? logRecord.port : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <FormItem { ...formTwoItemLayout } label="调用类">
                  <div>{logRecord ? logRecord.clzName : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="调用方法">
                  <div>{logRecord ? logRecord.methodName : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginLeft: "-12px" }}>
              <Col span={24}>
                <FormItem { ...formOneItemLayout } label="异常信息">
                  <div>{logRecord ? logRecord.exceptionInfo : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="运行线程">
                  <div>{logRecord ? logRecord.threadName : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="访问状态">
                  <div>{logRecord ? logRecord.status : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label="操作时间">
                  <div>{logRecord ? moment(logRecord.operateTime).format("YYYY-MM-DD") : ""}</div>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default OperatorLogModal;
