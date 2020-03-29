import React, { Component } from 'react';
import {Tabs, Icon, Tag} from "antd";
import styles from './Nofication.less';
import moment from 'moment';

const TabPane = Tabs.TabPane;

class NoficationPane extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activedTabKey: "1"
    }
  }

  activeTab (activedTabKey) {
    this.setState({activedTabKey});
  }

  render() {

    const { noficationList, messageList, todoList, clearPane, onDetail } = this.props;

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
          <TabPane tab={"通知（" + noficationList.length + "）"} key={"1"} closable={false}>
            <ul className={styles.tabul}>
            {
              noficationList.length  == 0 ? <div className={styles.emptyDiv}>
                  <Icon type={"rocket"} className={styles.iconDiv}/><div className={styles.dataDiv}>暂无数据</div>
                </div> :
              noficationList.map(item =>
                <li className={styles.tabli}>
                  <Icon type="mail" theme={"filled"} className={styles.noficationIcon} />
                  <span>{item.title}</span>
                  <span>{item.time ? moment(item.time).format("YYYY-MM-DD HH:mm:ss") : ""}</span>
                </li>)
            }
            </ul>
          </TabPane>
          <TabPane tab={"日程（" + messageList.length + "）"} key={"2"} closable={false}>
            <ul className={styles.tabul}>
            {
              messageList.length  == 0 ? <div className={styles.emptyDiv}>
                  <Icon type={"rocket"} className={styles.iconDiv}/><div className={styles.dataDiv}>暂无数据</div>
                </div> :
              messageList.map(item =>
                <li className={styles.tabli}>
                  <Icon type="message" theme={"filled"} className={styles.noficationIcon}/>
                  <span>{item.title}</span>
                  <span>{item.content}</span>
                  <span>{item.time ? moment(item.time).format("YYYY-MM-DD HH:mm:ss") : ""}</span>
                </li>)
            }
            </ul>
          </TabPane>
          <TabPane tab={"待办（" + todoList.length + "）"} key={"3"} closable={false}>
            <ul className={styles.tabul}>
            {
              todoList.length == 0 ? <div className={styles.emptyDiv}>
                  <Icon type={"rocket"} className={styles.iconDiv}/><div className={styles.dataDiv}>暂无数据</div>
                </div> :
              todoList.map(item =>
                <li className={styles.tabli}>
                  <Icon type="flag" theme={"filled"} className={styles.noficationIcon} />
                  <span>{item.modelName}</span>
                  <span className={styles.todoStatus}>
                    <Tag color="#f50">{"审核中"}</Tag>
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
            清空{this.state.activedTabKey == "1" ? "通知" : this.state.activedTabKey == "2" ? "日程" : "待办"}
            </div>
          <div className={styles.noticeTabMore} onClick={() => onDetail(this.state.activedTabKey)}>查看更多</div>
        </div>
      </div>
    )
  };
}

export default NoficationPane;
