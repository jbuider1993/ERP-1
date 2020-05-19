import React, { Component } from 'react';
import {Tabs, Icon, Tag, Empty} from "antd";
import styles from './Nofication.less';
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';

const TabPane = Tabs.TabPane;

class NoficationPane extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activedTabKey: "notice"
    }
  }

  activeTab (activedTabKey) {
    this.setState({activedTabKey});
  }

  render() {

    const { noficationList, messageList, todoList, clearPane, onDetail } = this.props;

    const iconStyle = {
      verticalAlign: "sub",
      marginRight: "8px",
      fontSize: "16px",
      color: "red",
    };

    return (
      <div className={styles.noficationPane}>
        <Tabs
          hideAdd
          tabBarGutter={0}
          onChange={this.activeTab.bind(this)}
          activeKey={this.state.activedTabKey}
          type="editable-card"
          className={styles.tabTitle}
        >
          <TabPane tab={"通知（" + noficationList.length + "）"} key={"notice"} closable={false}>
            <ul className={styles.tabul}>
            {
              noficationList.length  == 0 ? <div className={styles.emptyDiv}><Empty /></div> :
              noficationList.map(item =>
                <li className={styles.tabli}>
                  <div>
                    <i className={"ri-notification-3-line"} style={iconStyle} />
                    <span>{item.title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{item.createTime ? moment(item.createTime).format("YYYY-MM-DD HH:mm:ss") : ""}</span>
                  </div>
                  <div style={{width: "300px", margin: "-15px 0px 0px 24px"}} className={styles.messageContentDiv}>
                    <span style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{item.content.replace(/<[^>]*>|/g,"")}</span>
                  </div>
                </li>)
            }
            </ul>
          </TabPane>
          <TabPane tab={"日程（" + messageList.length + "）"} key={"schedule"} closable={false}>
            <ul className={styles.tabul}>
            {
              messageList.length  == 0 ? <div className={styles.emptyDiv}><Empty /></div> :
              messageList.map(item =>
                <li className={styles.tabli}>
                  <div>
                    <i className={"ri-message-3-line"} style={iconStyle} />
                    <span>{item.title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{item.createTime ? moment(item.createTime).format("YYYY-MM-DD HH:mm:ss") : ""}</span>
                  </div>
                  <div style={{width: "300px", margin: "-15px 0px 0px 24px"}} className={styles.messageContentDiv}>
                    <span>{item.content.replace(/<[^>]*>|/g,"")}</span>
                  </div>
                </li>)
            }
            </ul>
          </TabPane>
          <TabPane tab={"待办（" + todoList.length + "）"} key={"todo"} closable={false}>
            <ul className={styles.tabul}>
            {
              todoList.length == 0 ? <div className={styles.emptyDiv}><Empty imageStyle={{fontSize: "20px"}}/></div> :
              todoList.map(item =>
                <li className={styles.tabli}>
                  <i className="ri-profile-line" style={iconStyle} />
                  <span>{item.modelName}</span>
                  <span className={styles.todoStatus}>
                    <Tag color="#f50" style={{marginRight: "0px"}}>{"审核中"}</Tag>
                  </span>
                  <div className={styles.todoTime}>
                    <span>{item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : ""}</span>
                  </div>
                </li>)
            }
            </ul>
          </TabPane>
        </Tabs>
        <div className={styles.noticeTabButton}>
          <div className={styles.noticeTabClear} onClick={() => clearPane(this.state.activedTabKey)}>
            清空{this.state.activedTabKey == "notice" ? "通知" : this.state.activedTabKey == "schedule" ? "日程" : "待办"}
            </div>
          <div className={styles.noticeTabMore} onClick={() => onDetail(this.state.activedTabKey)}>查看更多</div>
        </div>
      </div>
    )
  };
}

export default NoficationPane;
