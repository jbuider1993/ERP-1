import React from 'react';
import { connect } from 'dva';
import MessageSearch from "../../components/option/message/MessageSearch";
import MessageToolBar from "../../components/option/message/MessageToolBar";
import MessageList from "../../components/option/message/MessageList";
import NewMessageModal from "../../components/option/message/NewMessageModal";
import ShowMessageModal from "../../components/option/message/ShowMessageModal";

const MessagePage = (props) => {

  const { dispatch, location, messageModel } = props;
  const {newMessageModalVisible, showMessageModalVisible, messageModalType, messageLoading, messageList, currentSize,
    messageType, total, messageRecord} = messageModel;

  const messageToolBarProps = {
    addMessage: (event) => {
      dispatch({ type: "messageModel/updateState", payload: {newMessageModalVisible: true, messageType: event.key}});
    },
    deleteMessage: () => {},
  };

  const newMessageModalProps = {
    newMessageModalVisible,
    messageModalType,
    messageRecord,
    onCancel: () => {
      dispatch({ type: "messageModel/updateState", payload: {newMessageModalVisible: false}});
    },
    onOk: (record) => {
      dispatch({ type: "messageModel/addMessage", payload: record });
    },
  };

  const messageListProps = {
    messageLoading,
    messageList,
    currentSize,
    total,
    showMessage: (messageRecord) => {
      dispatch({ type: "messageModel/updateState", payload: {showMessageModalVisible: true, messageRecord}});
    },
    editMessage: (messageRecord) => {
      dispatch({ type: "messageModel/updateState", payload: {newMessageModalVisible: true, messageRecord}});
    },
    loadMoreMessage: () => {
      dispatch({ type: "messageModel/loadMoreMessage", payload: {}});
    },
  };

  const showMessageModalProps = {
    showMessageModalVisible,
    messageRecord,
    onCancel: () => {
      dispatch({ type: "messageModel/updateState", payload: {showMessageModalVisible: false}});
    }
  };

  return (
    <div>
      <MessageSearch />
      <MessageToolBar {...messageToolBarProps} />
      <MessageList {...messageListProps} />
      <NewMessageModal {...newMessageModalProps} />
      <ShowMessageModal {...showMessageModalProps} />
    </div>
  );
};

function mapStateToProps({ messageModel }) {
  return { messageModel };
}

export default connect(mapStateToProps)(MessagePage);
