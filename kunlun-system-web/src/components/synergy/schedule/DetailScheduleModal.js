import React from 'react';
import { Modal, List, Skeleton, Icon, Tag } from 'antd';
import styles from './Schedule.less';
import moment from 'moment';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

const DetailScheduleModal = (props) => {

  let {daySchedules, detailScheduleModalVisible, onCancel, editSchedule, deleteSchedule, userList} = props;

  const switchParticipant = (value) => {
    const participants = userList.filter(item => value.indexOf(item.id) > -1).map(item => item.userName);
    return participants.join(", ")
  }

  return (
    <div className={styles.listDiv}>
      <Modal
        visible={detailScheduleModalVisible}
        centered={true}
        title={"详细日程"}
        okText="保存"
        onCancel={onCancel}
        onOk={onCancel}
        width={800}
        destroyOnClose={true}
        footer={[]}
      >
        <List
          className={styles.listContainer}
          loading={false}
          itemLayout="horizontal"
          loadMore={null}
          dataSource={daySchedules.sort((x, y) => moment(x.startTime) - moment(y.startTime))}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
          }}
          renderItem={item => (
            <ListItem
              actions={[<div onClick={(e) => editSchedule(item)}>
                <Icon type={"edit"} style={{fontSize: "15px", color: "red"}} />
              </div>, <div onClick={() => deleteSchedule(item)}>
                <Icon type={"delete"} style={{fontSize: "15px", color: "blue"}} />
              </div>]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <ListItemMeta
                  avatar={<Icon type={moment(item.endTime) < new Date() ? "stop" : "play-circle"} style={{fontSize: "20px", color: item.themeColor}} />}
                  title={
                    <div className={styles.detailTitleDiv}>
                      <div className={styles.detailTitleFont}><span>主&nbsp;&nbsp;&nbsp;&nbsp;题：</span><span style={{color: item.themeColor, fontWeight: "bolder"}}>{item.theme}</span></div>
                      <div className={styles.detailTitleTime}><span>时&nbsp;&nbsp;&nbsp;&nbsp;间：</span>{moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") + " 至 " + moment(item.endTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                    </div>
                  }
                  description={
                    <div className={styles.detailDescriptionDiv}>
                      <div className={styles.detailDescriptionParticipant}>{"参与人：" + switchParticipant(item.participants)}</div>
                      <div className={styles.detailDescriptionContent}><span>内&nbsp;&nbsp;&nbsp;&nbsp;容：</span><span style={{width: "100%"}}>{item.content}</span></div>
                    </div>
                  }
                />
              </Skeleton>
            </ListItem>
          )}
        />
      </Modal>
    </div>
  );
};

export default DetailScheduleModal;
