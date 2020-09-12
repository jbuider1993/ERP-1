import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import {AutoComplete, Input, Tooltip} from 'antd';
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';

class NewsMessageChart extends React.Component {

  render() {

    const {onShowDetail} = this.props;

    const dateFormat = "YYYY-MM-DD";
    const list = [
      {id: "11111", title: "Spring新技术研讨会", date: new Date(), type: "new"},
      {id: "22222", title: "项目研发进展通告", date: new Date(), type: "message"},
      {id: "33333", title: "新员工报道及培训流程修订通知", date: new Date(), type: "new"},
      {id: "44444", title: "公司高层召开员工扩大会议通知", date: new Date(), type: "message"},
      {id: "55555", title: "禁止在各楼通道及厕所抽烟", date: new Date(), type: "new"},
      {id: "55555", title: "禁止在各楼通道及厕所抽烟", date: new Date(), type: "new"},
      {id: "55555", title: "禁止在各楼通道及厕所抽烟", date: new Date(), type: "new"},
      {id: "55555", title: "禁止在各楼通道及厕所抽烟", date: new Date(), type: "message"},
      {id: "55555", title: "禁止在各楼通道及厕所抽烟", date: new Date(), type: "message"},
      {id: "55555", title: "禁止在各楼通道及厕所抽烟", date: new Date(), type: "new"},
    ];

    return (
      <div className={indexStyles.messageChartDiv}>
        <div className={indexStyles.userChartMonthInfoDiv}>
          <div className={indexStyles.tableCTitleFont}>新闻通知</div>
          <div className={indexStyles.tableCTitleTool}>
            <div onClick={() => onShowDetail("notice")} className={indexStyles.fontWeightHover}>
              <Tooltip title={"查看详情"}>
                <i className="ri-article-line" style={{fontSize: "19px", marginRight: "15px"}}></i>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className={indexStyles.newMessgeRightDiv}>
          {
            list.map(item => <div className={indexStyles.newMessageLi}>
              <i className={item.type == "new" ? "ri-pages-line" : "ri-notification-3-line"} style={{marginRight: "10px", fontSize: "16px", verticalAlign: "sub"}} />
              <span style={{marginRight: "10px", color: item.type == "new" ? "#30bf78" : "blue", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{item.title}</span>
              <span style={{color: "#faad14"}}>{moment(item.date).format(dateFormat)}</span>
            </div>)
          }
        </div>
      </div>
    );
  };
}

export default NewsMessageChart;
