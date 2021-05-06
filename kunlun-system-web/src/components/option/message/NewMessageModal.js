import React from 'react';
import {Form, Button, Modal, Row, Col, Input} from 'antd';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import styles from './Message.less';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class NewMessageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editor: BraftEditor.createEditorState(null)
    }
  }

  formRef = React.createRef();

  componentWillReceiveProps(nextProps, nextContext) {
    // 设置编辑器内容
    const record = nextProps.messageRecord;
    if (!record) {
      return nextProps;
    }
    record.content = BraftEditor.createEditorState(record.content);
    return {record, nextContext};
  }

  handleSubmit(validateFields) {
    validateFields().then(values => {
      const submitData = {
        title: values.title,
        content: values.content.toHTML(), // or values.content.toRAW()
        description: values.description
      };
      this.props.onOk(submitData);
    }).catch(error => {
      console.log("NewMessageModal error ===>>> " + error)
    });
  }

  render() {

    const {
      newMessageModalVisible, messageModalType, messageRecord, onCancel, onOk,
    } = this.props;

    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 22},
    };

    return (
      <div>
        <Modal
          centered={true}
          visible={newMessageModalVisible}
          title={messageModalType == "add" ? "新增通知" : "编辑通知"}
          okText="保存"
          onCancel={onCancel}
          onOk={() => this.handleSubmit(this.formRef.current.validateFields)}
          width={950}
          destroyOnClose={true}
          bodyStyle={{paddingBottom: "0px !important"}}
          maskClosable={false}
        >
          <Form initialValues={messageRecord} ref={this.formRef} name={"messageRef"}>
            <Row>
              <Col span={24} style={{margin: "-10px 0px -10px 0px"}}>
                <FormItem {...formItemLayout} label="消息标题" name={"title"} rules={[{required: false, message: '请输入消息标题'}]}>
                  <Input placeholder={"请输入消息标题"} />
                </FormItem>
              </Col>
              <Col span={24} style={{margin: "0px 0px -10px 0px"}}>
                <FormItem {...formItemLayout} label="概要描述" name={"description"} rules={[{required: false, message: '请输入概要描述'}]}>
                  <TextArea placeholder={"请输入概要描述"} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{margin: "0px 0px -15px 0px"}}>
                <FormItem {...formItemLayout} label="详细消息" name={"content"} rules={[{required: false, message: '请输入正文内容'}]}>
                  <BraftEditor className={styles.draftEditorDiv} placeholder="请输入正文内容"/>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  };
}

export default NewMessageModal;
