import React from 'react';
import styles from './Home.less';
import {Avatar, Tooltip, Empty } from 'antd';
import moment from 'moment';
import indexStyles from '../../pages/home/homeIndex.less';
import * as Icon from '@ant-design/icons';
import 'remixicon/fonts/remixicon.css';

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
              <i className="ri-article-line" style={{fontSize: "19px", marginRight: "15px"}}></i>
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
                <div className={styles.arrowLeft} onClick={() => onClickArrow("left")}>
                  <i className="ri-arrow-left-circle-line"></i>
                </div>
                <div>
                  <div><span>主题：</span><span style={{color: scheduleData.themeColor}}>&nbsp;{scheduleData.theme}</span></div>
                  <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{display: "flex", flex: 1}}><span>时间：</span><span>&nbsp;{moment(scheduleData.startTime).format(timeFormat) + " - " + moment(scheduleData.endTime).format(timeFormat)}</span></div>
                    <div style={{display: "flex", flex: 1}}><span>地点：</span><span>&nbsp;{scheduleData.location}</span></div>
                  </div>
                  <div><span>内容：</span><span>&nbsp;{scheduleData.content}</span></div>
                  <div className={styles.scheduleShowPersonDiv}>
                    <span>人员：</span>
                    <span className={styles.personDiv}>{scheduleData.participant}</span>
                  </div>
                </div>
                <div className={styles.arrowRight} onClick={() => onClickArrow("right")}>
                  <i className="ri-arrow-right-circle-line"></i>
                </div>
              </div>
          }
        </div>
      </div>
    );
  };
}

export default TodaySchedule;
