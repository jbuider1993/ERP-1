import React from 'react';
import styles from './Home.less';
import {Avatar, Icon, Tooltip, Empty } from 'antd';
import moment from 'moment';
import indexStyles from '../../pages/home/homeIndex.less';

class TodaySchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activedKey: ["1"]
    }
  }

  render() {

    const {scheduleData, scheduleIndex, scheduleTotal, onShowDetail, onClickArrow} = this.props;

    const dateFormat = "YYYY年MM月DD日";
    const timeFormat = "HH时mm分";

    return (
      <div className={styles.todayScheduleDiv}>
        <div className={styles.scheduleDiv}>
          <div className={indexStyles.mqTitleFontDiv}>事项日程</div>
          <div onClick={() => onShowDetail("schedule")} className={indexStyles.fontWeightHover}>
            <Tooltip title={"查看详情"}>
              <Icon type="profile" style={{fontSize: "16px", marginTop: "5px", marginRight: "20px"}} />
            </Tooltip>
          </div>
        </div>
        <div className={styles.scheduleShowDiv}>
          <div className={styles.scheduleToolBarDiv}>
            <div>{moment(new Date()).format(dateFormat)}&nbsp;&nbsp;&nbsp;&nbsp;第&nbsp;{scheduleTotal == 0 ? 0 : scheduleIndex + 1}&nbsp;条，共&nbsp;{scheduleTotal}&nbsp;条</div>
          </div>
          {
            !scheduleData ? <Empty /> :
              <div className={styles.scheduleContentDiv}>
                <div className={styles.arrowLeft}>
                  <Icon type="left-circle" className={styles.arrowIcon} onClick={() => onClickArrow("left")}/>
                </div>
                <div><span>主题：</span><span style={{color: scheduleData.themeColor}}>&nbsp;{scheduleData.theme}</span></div>
                <div><span>时间：</span><span>&nbsp;{moment(scheduleData.startTime).format(timeFormat) + " - " + moment(scheduleData.endTime).format(timeFormat)}</span></div>
                <div><span>地点：</span><span>&nbsp;{scheduleData.location}</span></div>
                <div><span>内容：</span><span>&nbsp;{scheduleData.content}</span></div>
                <div className={styles.scheduleShowPersonDiv}>
                  <span>人员：</span>
                  <span className={styles.personDiv}>{scheduleData.participant}</span>
                </div>
                <div className={styles.arrowRight}>
                  <Icon type="right-circle" className={styles.arrowIcon} onClick={() => onClickArrow("right")}/>
                </div>
              </div>
          }
        </div>
      </div>
    );
  };
}

export default TodaySchedule;
