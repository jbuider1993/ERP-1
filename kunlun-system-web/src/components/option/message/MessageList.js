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
        renderItem={item => (
          <ListItem
            actions={[<div className={styles.operator} onClick={(e) => editMessage(item)}>edit</div>, <div className={styles.operator} onClick={() => showMessage(item)}>more</div>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <ListItemMeta
                avatar={<i className={item.type == 1 ? "ri-notification-3-line" : "ri-message-3-line"} style={{fontSize: "20px"}} />}
                title={<div onClick={() => showMessage(item)} className={styles.messageTitle}>{item.title}</div>}
                description={moment(item.createTime).format("YYYY-MM-DD HH:mm:ss") + "&nbsp;&nbsp;" + item.description}
              />
              <div style={{marginRight: "5%"}}>
                <Tag style={{ borderRadius: "20px" }} color={item.type == 1 ? "blue" : "purple"}>{item.type == 1 ? "通知" : "消息"}</Tag>
              </div>
            </Skeleton>
          </ListItem>
        )}
      />
      <div className={styles.listPagationDiv}>
        <div className={styles.listPagation}>
          <div className={styles.listPagationA}>{"第 " + (messageList && messageList.length > 0 ? ("1 - " + (messageList.length)) : "0 - 0") + " 条"}</div>
          <div className={styles.listPagationB}>{"共 " + (total ? total : 0) + " 条"}</div>
        </div>
        <div className={styles.loadMoreDiv} onClick={() => loadMoreMessage()}>加载更多</div>
      </div>
    </div>
  );
};

export default MessageList;
