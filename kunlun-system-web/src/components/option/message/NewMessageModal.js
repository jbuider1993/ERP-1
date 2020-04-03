import React from 'react';
import {Drawer, Form, Button, Divider, Modal, Row, Col, Input, Icon} from 'antd';
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
    validateFields((error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          content: values.content.toHTML(), // or values.content.toRAW()
          description: values.description
        };
        this.props.onOk(submitData);
      }
    })
  }

  render() {

    const {
      newMessageModalVisible, messageModalType, messageRecord, onCancel, onOk,
    } = this.props;
    const [form] = Form.useForm();
    const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 21},
    };

    return (
      <div>
        <Modal
          visible={newMessageModalVisible}
          title={messageModalType == "add" ? "新增菜单" : "编辑菜单"}
          okText="保存"
          onCancel={onCancel}
          onOk={() => this.handleSubmit(validateFields)}
          height={600}
          width={"70%"}
          destroyOnClose={true}
        >
          <Form initialValues={messageRecord}>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label="消息标题" name={"title"} rules={[{required: false, message: '请输入消息标题'}]}>
                  <Input placeholder={"请输入消息标题"} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem {...formItemLayout} label="概要描述" name={"description"} rules={[{required: false, message: '请输入概要描述'}]}>
                  <TextArea placeholder={"请输入概要描述"} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
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
