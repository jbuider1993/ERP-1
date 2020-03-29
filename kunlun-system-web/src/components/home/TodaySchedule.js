import React from 'react';
import styles from './Home.less';
import {Avatar, Icon, Collapse } from 'antd';
import moment from 'moment';

const { Panel } = Collapse;

class TodaySchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activedKey: ["1"]
    }
  }

  render() {

    const {scheduleList} = this.props;

    const constructScheduleHeader = (item) => {
      return (
        <div>
          <span>{moment(item.startTime).format("HH:mm")}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{item.theme}</span>
        </div>);
    };

    const changePanel = (e) => {
      if (e && e.length > 0) {
        this.setState({activedKey: e.slice(1, 2)});
      }
    };

    const onPanelChange = () => {};

    return (
      <div className={styles.todayScheduleDiv}>
        <div className={styles.scheduleDiv}>工作日程</div>
        <div className={styles.scheduleDetailDiv}>
          <Collapse activeKey={this.state.activedKey} onChange={e => changePanel(e)} className={styles.collapseDiv}>
            {
              scheduleList && scheduleList.slice(0, 3).map((item, index) =>
                <Panel header={constructScheduleHeader(item)} key={index + 1} className={this.state.activedKey[0] == (index + 1) ? styles.collapseBackgroundDiv : null}>
                  <div className={styles.scheduleTimeAndLocationDiv}>
                    <div><span>时间：</span><span>&nbsp;{moment(item.startTime).format("YYYY-MM-DD")}</span></div>
                    <div><span>地点：</span><span>&nbsp;{item.location}</span></div>
                  </div>
                  <div><span>内容：</span><span>&nbsp;{item.content}</span></div>
                  <div className={styles.scheduleDistanceDiv}>
                    <Avatar icon="user" />&nbsp;&nbsp;
                    <Avatar>PM</Avatar>&nbsp;&nbsp;
                    <Avatar>USER</Avatar>&nbsp;&nbsp;
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />&nbsp;&nbsp;
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>&nbsp;&nbsp;
                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                  </div>
                </Panel>
              )
            }
          </Collapse>
        </div>
      </div>
    );
  };
}

export default TodaySchedule;
