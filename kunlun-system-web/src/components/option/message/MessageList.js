import React from 'react';
import { List, Skeleton, Tag, Tooltip } from 'antd';
import styles from './Message.less';
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

const MessageList = (props) => {

  let {messageLoading, messageList, currentSize, total, showMessage, editMessage, loadMoreMessage} = props;

  messageList = messageList ? messageList : [];

  const iconStyle = {
    verticalAlign: "bottom",
    fontSize: "18px",
  };

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
            actions={[<Tooltip title={"编辑"}><i className="ri-edit-2-line" style={{...iconStyle, color: "rgb(135,94,250)"}} onClick={(e) => editMessage(item)} /></Tooltip>,
              <Tooltip title={"查看"}><i className="ri-article-line" style={{...iconStyle, color: "rgb(6,123,96)", marginRight: "10px"}} onClick={() => showMessage(item)} /></Tooltip>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <ListItemMeta
                avatar={<i className={item.type == 1 ? "ri-notification-3-line" : "ri-message-3-line"} style={{marginLeft: "15px", fontSize: "20px", color: item.type == 1 ? "red" : "blue"}} />}
                title={<span>
                        <span onClick={() => showMessage(item)} className={styles.messageTitle}>{item.title}</span>
                        <span style={{float: "right", marginRight: "30%"}}>{moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                      </span>}
                description={<span>{item.description}</span>}
              />
              <div style={{marginRight: "5%"}}>
                <Tag style={{ borderRadius: "20px" }} color={item.type == 1 ? "red" : "blue"}>{item.type == 1 ? "通知" : "消息"}</Tag>
              </div>
            </Skeleton>
          </ListItem>
        )}
      />
    </div>
  );
};

export default MessageList;
