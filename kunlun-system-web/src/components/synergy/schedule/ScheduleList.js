import React from 'react';
import styles from './Schedule.less';
import {Icon, Tooltip, Tag, Calendar, Badge } from 'antd';
import moment from 'moment';

const ScheduleList = (props) => {

  const { scheduleList, calendarMode, scheduleLoading, operateType, onShowDetail, onCacheCalenarMode } = props;

  const dateCellRender = (value) => {
    const listData = scheduleList.filter(item => value.year() == moment(item.startTime).year() && value.month() == moment(item.startTime).month() && value.date() == moment(item.startTime).date());
    return (
      <ul className={styles.events}>
        {
          listData.map(item => (
            <li key={item.id}>
              <Icon type={moment(item.endTime) < new Date() ? "stop" : "play-circle"} style={{color: item.themeColor}} />
              &nbsp;&nbsp;{item.theme}
            </li>
          ))
        }
      </ul>
    );
  };

  const monthCellRender = (value) => {
    const listDatas = scheduleList.filter(item => value.year() == moment(item.startTime).year() && value.month() == moment(item.startTime).month());
    const num = listDatas.length;
    return num ? (
      <div className={styles.notesMonth}>
        <section style={{fontWeight: "bolder"}}>{num}</section>
      </div>
    ) : null;
  };

  const onSelect = (value) => {
    let selectedSchedules;
    if (calendarMode == "month") {
      selectedSchedules = scheduleList.filter(item => value.year() == moment(item.startTime).year() && value.month() == moment(item.startTime).month() && moment(item.startTime).date() == value.date());
    } else {
      selectedSchedules = scheduleList.filter(item => value.year() == moment(item.startTime).year() && moment(item.startTime).month() == value.month());
    }
    if (selectedSchedules && selectedSchedules.length > 0) {
      onShowDetail(selectedSchedules);
    }
  };

  return (
    <div className={ styles.scheduleTableDiv }>
      <Calendar
        className={styles.scheduleTable}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={e => onSelect(e)}
        onPanelChange={onCacheCalenarMode}/>
    </div>
  );
};

export default ScheduleList;
