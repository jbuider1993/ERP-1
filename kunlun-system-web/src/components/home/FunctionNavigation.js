import React from 'react';
import styles from './Home.less';
import * as Icon from '@ant-design/icons';

class FunctionNavigation extends React.Component {

  render() {

    const {onShowDetail} = this.props;

    return (
      <div className={styles.commonDiv}>
        <div className={styles.commonTitleDiv}>便捷导航</div>
        <div className={styles.commonFunctionDiv}>
          <div className={styles.functionDiv} onClick={() => onShowDetail("list")}>
            <div className={styles.functionIconDiv}><Icon.UserOutlined style={{fontSize: "30px", color: "red"}} /></div>用户管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("amap")}>
            <div className={styles.functionIconDiv}><Icon.EnvironmentOutlined style={{fontSize: "30px", color: "blue"}} /></div>用户地图
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("model")}>
            <div className={styles.functionIconDiv}><Icon.ProjectOutlined style={{fontSize: "30px", color: "green"}} /></div>模型管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("process")}>
            <div className={styles.functionIconDiv}><Icon.AuditOutlined style={{fontSize: "30px", color: "#ff9800"}} /></div>流程管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("zipkin")}>
            <div className={styles.functionIconDiv}><Icon.FileSearchOutlined style={{fontSize: "30px", color: "#7ffb42"}} /></div>调用追踪
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("rabbitmq")}>
            <div className={styles.functionIconDiv}><Icon.NotificationOutlined style={{fontSize: "30px", color: "#795548"}} /></div>MQ管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("log")}>
            <div className={styles.functionIconDiv}><Icon.FileProtectOutlined style={{fontSize: "30px", color: "#9c27b0"}} /></div>操作日志
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("schedule")}>
            <div className={styles.functionIconDiv}><Icon.ScheduleOutlined style={{fontSize: "30px", color: "#000000"}} /></div>日程管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("notice")}>
            <div className={styles.functionIconDiv}><Icon.MessageOutlined style={{fontSize: "30px", color: "#03a9f4"}} /></div>通知公告
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("menu")}>
            <div className={styles.functionIconDiv}><Icon.MenuOutlined style={{fontSize: "30px", color: "#922ac5"}} /></div>菜单管理
          </div>
        </div>
      </div>
    );
  };
}

export default FunctionNavigation;
