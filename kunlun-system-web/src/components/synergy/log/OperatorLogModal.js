import React from 'react';
import { Modal, Form, Row, Col } from 'antd';
import moment from 'moment';
import styles from "./OperatorLog.less";
import config from '../../../config/config';

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
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>登录地址</span>}>
                  <div>{logRecord ? logRecord.ip : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>登录用户</span>}>
                  <div>{logRecord ? logRecord.userName : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>操作描述</span>}>
                  <div>{logRecord ? logRecord.operateDescription : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <FormItem { ...formTwoItemLayout } label={<span style={{color: config.VIEW_COLOR}}>请求URL</span>}>
                  <div>{logRecord ? logRecord.requestUrl : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>请求方式</span>}>
                  <div>{logRecord ? logRecord.style : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <FormItem { ...formTwoItemLayout } label={<span style={{color: config.VIEW_COLOR}}>请求参数</span>}>
                  <div>{logRecord ? logRecord.params : ""}</div>
                </FormItem>
              </Col>

            </Row>
            <Row>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>请求协议</span>}>
                  <div>{logRecord ? logRecord.protocal : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>访问服务</span>}>
                  <div>{logRecord ? logRecord.serviceName : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>服务端口</span>}>
                  <div>{logRecord ? logRecord.port : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <FormItem { ...formTwoItemLayout } label={<span style={{color: config.VIEW_COLOR}}>调用类</span>}>
                  <div>{logRecord ? logRecord.clzName : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>调用方法</span>}>
                  <div>{logRecord ? logRecord.methodName : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginLeft: "-12px" }}>
              <Col span={24}>
                <FormItem { ...formOneItemLayout } label={<span style={{color: config.VIEW_COLOR}}>异常信息</span>}>
                  <div>{logRecord ? logRecord.exceptionInfo : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>运行线程</span>}>
                  <div>{logRecord ? logRecord.threadName : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>访问状态</span>}>
                  <div>{logRecord ? logRecord.status : ""}</div>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem { ...formItemLayout } label={<span style={{color: config.VIEW_COLOR}}>操作时间</span>}>
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
