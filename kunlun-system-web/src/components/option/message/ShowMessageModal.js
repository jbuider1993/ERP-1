import React from 'react';
import {Form, Modal, Row, Col} from 'antd';
import styles from './Message.less';
import BraftEditor from 'braft-editor';

const FormItem = Form.Item;

const ShowMessageModal = (props) => {

  const { showMessageModalVisible, messageRecord, onCancel} = props;

  const formItemLayout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
  };

  return (
    <div>
      <Modal
        centered={true}
        visible={showMessageModalVisible}
        title={"消息详情"}
        onCancel={onCancel}
        width={800}
        destroyOnClose={true}
        footer={null}
        bodyStyle={{paddingBottom: "0px !important", height: "450px"}}
        maskClosable={false}
      >
        <Form initialValues={messageRecord}>
          <Row>
            <Col span={24} style={{margin: "-10px 0px -10px 0px"}}>
              <FormItem {...formItemLayout} label="消息标题">
                <div style={{marginLeft: "15px"}}>{messageRecord ? messageRecord.title : ""}</div>
              </FormItem>
            </Col>
            <Col span={24} style={{margin: "-10px 0px -10px 0px"}}>
              <FormItem {...formItemLayout} label="概要描述">
                <div style={{marginLeft: "15px"}}>{messageRecord ? messageRecord.description : ""}</div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{margin: "-10px 0px -10px 0px"}}>
              <FormItem {...formItemLayout} label="详细消息">
                <BraftEditor className={styles.draftEditorShowDiv} readOnly={true} defaultValue={messageRecord ? messageRecord.content : ""} controls={[]} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ShowMessageModal;
