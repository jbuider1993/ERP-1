import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './Schedule.less';
import 'remixicon/fonts/remixicon.css';

const ScheduleToolbar = (props) => {

  const { addSave, onExport } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div className={styles.toolBarDiv}>
      <Button type="primary" size="default" icon={<i className="ri-add-line" style={iconStyle}></i>} onClick={() => addSave()}>新建日程</Button>
      <Button type="defalue" size="default" style={{marginLeft: "15px"}} icon={<i className="ri-download-2-line" style={iconStyle}></i>} onClick={() => onExport()}>导出</Button>
    </div>
  );
};

export default ScheduleToolbar;
