import React from 'react';
import styles from './Home.less';
import 'remixicon/fonts/remixicon.css';

class FunctionNavigation extends React.Component {

  render() {

    const {onShowDetail} = this.props;

    return (
      <div className={styles.commonDiv}>
        <div className={styles.commonTitleDiv}>便捷导航</div>
        <div className={styles.commonFunctionDiv}>
          <div className={styles.functionDiv} onClick={() => onShowDetail("list")}>
            <div className={styles.functionIconDiv}><i className="ri-account-box-line" style={{fontSize: "30px", color: "red"}}></i></div>用户管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("amap")}>
            <div className={styles.functionIconDiv}><i className="ri-map-pin-5-line" style={{fontSize: "30px", color: "blue"}}></i></div>用户地图
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("model")}>
            <div className={styles.functionIconDiv}><i className="ri-door-lock-box-line" style={{fontSize: "30px", color: "green"}}></i></div>模型管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("process")}>
            <div className={styles.functionIconDiv}><i className="ri-equalizer-line" style={{fontSize: "30px", color: "#ff9800"}}></i></div>流程管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("zipkin")}>
            <div className={styles.functionIconDiv}><i className="ri-file-search-line" style={{fontSize: "30px", color: "#7ffb42"}}></i></div>调用追踪
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("rabbitmq")}>
            <div className={styles.functionIconDiv}><i className="ri-pages-line" style={{fontSize: "30px", color: "#795548"}}></i></div>MQ管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("log")}>
            <div className={styles.functionIconDiv}><i className="ri-file-settings-line" style={{fontSize: "30px", color: "#9c27b0"}}></i></div>操作日志
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("schedule")}>
            <div className={styles.functionIconDiv}><i className="ri-article-line" style={{fontSize: "30px", color: "#000000"}}></i></div>日程管理
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("notice")}>
            <div className={styles.functionIconDiv}><i className="ri-message-3-line" style={{fontSize: "30px", color: "#03a9f4"}}></i></div>通知公告
          </div>
          <div className={styles.functionDiv} onClick={() => onShowDetail("menu")}>
            <div className={styles.functionIconDiv}><i className="ri-function-line" style={{fontSize: "30px", color: "#922ac5"}}></i></div>菜单管理
          </div>
        </div>
      </div>
    );
  };
}

export default FunctionNavigation;
