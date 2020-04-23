import React from 'react';
import { Modal, Form, Row, Col, Tabs, Steps } from 'antd';
import moment from 'moment';
import styles from "./Process.less";
import config from "../../../config/config";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Step = Steps.Step;

const ProcessModal = (props) => {

  const { processModalVisible, processRecord, onCancel, modelName, modelNodeList } = props;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  let processStatus;
  if (processRecord && processRecord.processStatus) {
    processStatus = config.PROCESS_STATUS.filter(item => item.key == processRecord.processStatus);
  }

  return (
    <div>
      <Modal
        visible={processModalVisible}
        onCancel={onCancel}
        title={"模型流程"}
        width={800}
        bodyStyle={{height: "400px"}}
        destroyOnClose={true}
        footer={null}
        mask={false}
        className={styles.processModal}
      >
        <div style={{width: "500px"}}>
          <Form>
            <Row>
              <Col span={12}>
                <FormItem { ...formItemLayout } label="模型名称">
                  <div>{processRecord ? processRecord.modelName : ""}</div>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem { ...formItemLayout } label="启动节点">
                  <div>{processRecord ? processRecord.currentExecuteName : ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem { ...formItemLayout } label="审核节点">
                  <div>{processRecord ? processRecord.nextExecuteName : ""}</div>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem { ...formItemLayout } label="流程状态">
                  <div>{processStatus ? processStatus[0].name: ""}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem { ...formItemLayout } label="启动时间">
                  <div>{processRecord ? moment(processRecord.startTime).format("YYYY-MM-DD") : ""}</div>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem { ...formItemLayout } label="完成时间">
                  <div>{processRecord ? moment(processRecord.endTime).format("YYYY-MM-DD") : ""}</div>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div className={styles.processTab}>
          <Tabs
            hideAdd
            onChange={() => {}}
            type="editable-card"
            className={styles.tabPane}
            tabBarGutter={0}
          >
            <TabPane tab={"流程模型"} key={"style"} closable={false} style={{ marginLeft: "15px", marginRight: "15px", marginBottom: "15px" }}>
              <div className={styles.processStep}>
                <Steps direction="vertical" current={1}>
                  {
                    modelNodeList.map(item =>
                      <Step title={item.name} description="" />
                    )
                  }
                </Steps>
              </div>
            </TabPane>
            <TabPane tab={"审核记录"} key={"color"} closable={false} className={styles.sketchPicker} style={{ marginLeft: "15px", marginRight: "15px" }}>
              <div className={styles.processStep}>
                <Steps direction="vertical" current={1}>
                  <Step title="Finished" description="This is a description." />
                  <Step title="In Progress" description="This is a description." />
                  <Step title="Waiting" description="This is a description." />
                </Steps>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Modal>
    </div>
  );
};

export default ProcessModal;
