import React from 'react';
import { connect } from 'dva';
import ScheduleToolbar from "../../components/synergy/schedule/ScheduleToolbar";
import ScheduleStatistics from "../../components/synergy/schedule/ScheduleStatistics";
import ScheduleList from "../../components/synergy/schedule/ScheduleList";
import ScheduleModal from "../../components/synergy/schedule/ScheduleModal";
import DetailScheduleModal from "../../components/synergy/schedule/DetailScheduleModal";
import styles from '../../components/synergy/schedule/Schedule.less';
import { Spin } from "antd";
import moment from 'moment';

const SchedulePage = (props) => {

  const { dispatch, scheduleModel } = props;
  const { scheduleList, calendarMode, daySchedules, detailScheduleModalVisible, scheduleLoading, operateType,
    scheduleModalVisible, singleSchedule, saveLoading, userList } = scheduleModel;

  const scheduleToolBarProps = {
    addSave: () => {
      dispatch({ type: 'scheduleModel/updateState', payload: { scheduleModalVisible: true, operateType: "add" }});
      dispatch({ type: 'scheduleModel/getUserList', payload: {}});
    },
    onExport:() => {}
  };

  const scheduleStatisticsProps = {
    scheduleList
  };

  const scheduleListProps = {
    scheduleList,
    calendarMode,
    scheduleLoading,
    operateType,
    onShowDetail: (daySchedules) => {
      dispatch({ type: 'scheduleModel/updateState', payload: { daySchedules, detailScheduleModalVisible: true }});
      dispatch({ type: 'scheduleModel/getUserList', payload: {}});
    },
    onCacheCalenarMode: (value, mode) => {
      dispatch({ type: 'scheduleModel/updateState', payload: { calendarMode: mode }});
    }
  };

  const scheduleModelProps = {
    operateType,
    scheduleModalVisible,
    singleSchedule,
    saveLoading,
    userList,
    onCacheThemeColor: (themeColor) => {
      let obj = {};
      if (operateType == "edit") {
        singleSchedule.themeColor = themeColor;
        obj = singleSchedule;
      } else {
        obj.themeColor = themeColor;
      }
      dispatch({ type: 'scheduleModel/updateState', payload: { singleSchedule: obj }});
    },
    onSave: (values) => {
      values["startTime"] = moment(values["startTime"]).format("yyyy-MM-DD HH:mm:ss");
      values["endTime"] = moment(values["endTime"]).format("yyyy-MM-DD HH:mm:ss");
      values["participants"] = values["participant"].join(",");
      values["themeColor"] = singleSchedule.themeColor;
      dispatch({ type: 'scheduleModel/onSave', payload: values});
    },
    onCancel: () => {
      dispatch({ type: 'scheduleModel/updateState', payload: { scheduleModalVisible: false }});
    }
  };

  const detailScheduleModelProps = {
    daySchedules,
    detailScheduleModalVisible,
    userList,
    onCancel: () => {
      dispatch({ type: 'scheduleModel/updateState', payload: { detailScheduleModalVisible: false }});
    },
    editSchedule: (singleSchedule) => {
      dispatch({ type: 'scheduleModel/updateState', payload: { scheduleModalVisible: true, operateType: "edit", singleSchedule }});
    },
    deleteSchedule: () => {},
  };

  return (
    <div style={{marginTop: "-10px"}}>
      <Spin spinning={scheduleLoading}>
        <ScheduleToolbar {...scheduleToolBarProps} />
        <div className={styles.scheduleFlexDiv}>
          <ScheduleStatistics {...scheduleStatisticsProps} />
          <ScheduleList {...scheduleListProps} />
        </div>
        <ScheduleModal {...scheduleModelProps} />
        <DetailScheduleModal {...detailScheduleModelProps} />
      </Spin>
    </div>
  );
};

function mapStateToProps({ globalModel, scheduleModel }){
  return { globalModel, scheduleModel };
}

export default connect(mapStateToProps)(SchedulePage);
