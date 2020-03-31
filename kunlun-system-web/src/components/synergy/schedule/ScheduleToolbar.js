import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './Schedule.less';

const ScheduleToolbar = (props) => {

  const { addSave, onExport } = props;

  return (
    <div className={styles.toolBarDiv}>
      <Button type="primary" size="default" icon="plus" onClick={() => addSave()}>新建日程</Button>
      <Button type="defalue" size="default" style={{marginLeft: "15px"}} icon="export" onClick={() => onExport()}>导出</Button>
    </div>
  );
};

export default ScheduleToolbar;
