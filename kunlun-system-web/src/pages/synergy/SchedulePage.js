import React from 'react';
import { connect } from 'dva';
import ScheduleToolbar from "../../components/synergy/schedule/ScheduleToolbar";
import ScheduleStatistics from "../../components/synergy/schedule/ScheduleStatistics";
import ScheduleList from "../../components/synergy/schedule/ScheduleList";
import ScheduleModal from "../../components/synergy/schedule/ScheduleModal";
import DetailScheduleModal from "../../components/synergy/schedule/DetailScheduleModal";
import styles from '../../components/synergy/schedule/Schedule.less';
import { Modal, message, Spin } from "antd";
import config from '../../config/config';
import * as commonUtil from '../../utils/commonUtil';

const SchedulePage = (props) => {

  const { dispatch, scheduleModel } = props;
  const { scheduleList, calendarMode, daySchedules, detailScheduleModalVisible, scheduleLoading, operateType, scheduleModalVisible, singleSchedule, saveLoading } = scheduleModel;

  const scheduleToolBarProps = {
    addSave: () => {
      dispatch({ type: 'scheduleModel/updateState', payload: { scheduleModalVisible: true, operateType: "add" }});
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
      dispatch({ type: 'scheduleModel/onSave', payload: values});
    },
    onCancel: () => {
      dispatch({ type: 'scheduleModel/updateState', payload: { scheduleModalVisible: false }});
    }
  };

  const detailScheduleModelProps = {
    daySchedules,
    detailScheduleModalVisible,
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

function mapStateToProps({ scheduleModel }){
  return { scheduleModel };
}

export default connect(mapStateToProps)(SchedulePage);
