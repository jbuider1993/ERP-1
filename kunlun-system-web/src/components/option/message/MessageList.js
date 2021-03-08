import React from 'react';
import { List, Skeleton, Tag } from 'antd';
import styles from './Message.less';
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

const MessageList = (props) => {

  let {messageLoading, messageList, currentSize, total, showMessage, editMessage, loadMoreMessage} = props;

  messageList = messageList ? messageList : [];

  return (
    <div className={styles.listDiv}>
      <List
        className={styles.listContainer}
        loading={false}
        itemLayout="horizontal"
        loadMore={null}
        dataSource={messageList}
        footer={
          <div className={styles.listPagationDiv}>
            <div className={styles.listPagationA}>{"第 " + (messageList && messageList.length > 0 ? ("1 - " + (messageList.length)) : "0 - 0") + " 条"}</div>
            <div className={styles.loadMoreDiv} onClick={() => loadMoreMessage()}>加载更多</div>
            <div className={styles.listPagationB}>{"共 " + (total ? total : 0) + " 条"}</div>
          </div>
        }
        renderItem={item => (
          <ListItem
            className={styles.messageListItem}
            actions={[<div className={styles.operator} onClick={(e) => editMessage(item)}>edit</div>, <div className={styles.operator} onClick={() => showMessage(item)}>more</div>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <ListItemMeta
                avatar={<i className={item.type == 1 ? "ri-notification-3-line" : "ri-message-3-line"} style={{marginLeft: "15px", fontSize: "20px"}} />}
                title={<span>
                        <span onClick={() => showMessage(item)} className={styles.messageTitle}>{item.title}</span>
                        <span style={{float: "right", marginRight: "30%"}}>{moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                      </span>}
                description={<span>{item.description}</span>}
              />
              <div style={{marginRight: "5%"}}>
                <Tag style={{ borderRadius: "20px" }} color={item.type == 1 ? "blue" : "purple"}>{item.type == 1 ? "通知" : "消息"}</Tag>
              </div>
            </Skeleton>
          </ListItem>
        )}
      />
    </div>
  );
};

export default MessageList;
