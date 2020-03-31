import React from 'react';
import { Modal, Form, Row, Col, Tabs, Steps, Divider } from 'antd';
import moment from 'moment';
import styles from "./Model.less";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Step = Steps.Step;

const ModelModal = (props) => {

  const { modelModalVisible, modelRecord, onCancel, modelNodeList } = props;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div>
      <Modal
        visible={modelModalVisible}
        onCancel={onCancel}
        title={"模型编辑"}
        width={800}
        height={400}
        destroyOnClose={true}
        footer={null}
        mask={false}
        className={styles.modelModal}
      >
        <div className={styles.modalDiv}>
          <Divider orientation="left">基本信息</Divider>
          <div className={styles.modalFormDiv}>
            <Form>
              <Row>
                <Col span={12}>
                  <FormItem { ...formItemLayout } label="模型名称">
                    <div>{modelRecord ? modelRecord.modelName : ""}</div>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem { ...formItemLayout } label="模型key">
                    <div>{modelRecord ? modelRecord.modelKey : ""}</div>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem { ...formItemLayout } label="创建时间">
                    <div>{modelRecord ? moment(modelRecord.createTime).format("YYYY-MM-DD") : ""}</div>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem { ...formItemLayout } label="部署时间">
                    <div>{modelRecord ? moment(modelRecord.deployTime).format("YYYY-MM-DD") : ""}</div>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem { ...formItemLayout } label="模型描述">
                    <div>{modelRecord && modelRecord.metaInfo ? JSON.parse(modelRecord.metaInfo).description : ""}</div>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <Divider orientation="left" className={styles.modalDivider}>流程模型</Divider>
          <div className={styles.modelStep}>
            <Steps type={"navigation"} current={modelNodeList.length}>
              {
                modelNodeList.map(item =>
                  <Step title={item.name} status={"process"} description="" />
                )
              }
            </Steps>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Form.create()(ModelModal);
