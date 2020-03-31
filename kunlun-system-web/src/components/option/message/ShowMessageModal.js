import React from 'react';
import {Form, Modal, Row, Col} from 'antd';
import styles from './Message.less';

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
        visible={showMessageModalVisible}
        title={"消息详情"}
        onCancel={onCancel}
        height={600}
        width={800}
        destroyOnClose={true}
        footer={[]}
      >
        <Form>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="消息标题">
                <div>{messageRecord ? messageRecord.title : ""}</div>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="概要描述">
                <div>{messageRecord ? messageRecord.description : ""}</div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="详细消息">
                <div>{messageRecord ? messageRecord.content : ""}</div>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Form.create()(ShowMessageModal);
