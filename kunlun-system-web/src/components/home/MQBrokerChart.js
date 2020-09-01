import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Line } from '@ant-design/charts';
import {Tooltip} from 'antd';
import 'remixicon/fonts/remixicon.css';
import moment from 'moment';

class MQBrokerChart extends React.Component {

  render() {

    const {onShowDetail, mqInfos} = this.props;

    const config = {
      padding: 'auto',
      forceFit: true,
      data: mqInfos,
      xField: 'time',
      yField: 'value',
      legend: { position: 'right' },
      seriesField: 'type',
      color: ['#1979c9', '#D62A0D', '#FAA219', '#27f503'],
      responsive: true,
      tooltip: {
        custom: {
          customContent: (title, items) => {
            const dateTitle = moment(new Date()).format("YYYY-MM-DD") + " " + title;
            return (
              <div style={{ padding: '15px 0px 0px 0px' }}>
                <h5>{dateTitle}</h5>
                <p style={{ padding: '10px 15px 0px 0px' }}>消息数：{items && items[0] && items[0].value} 个</p>
                <p style={{ padding: '0px 15px 0px 0px' }}>交换器数：{items && items[1] && items[1].value} 个</p>
                <p style={{ padding: '0px 15px 0px 0px' }}>队列数：{items && items[2] && items[2].value} 个</p>
                <p style={{ padding: '0px 15px 0px 0px' }}>通道数：{items && items[3] && items[3].value} 个</p>
              </div>
            );
          },
        },
      },
    };

    return (
      <div className={indexStyles.mqDiv}>
        <div className={indexStyles.mqTitleDiv}>
          <div className={indexStyles.mqTitleFontDiv}>MQ队列Broker消息数量统计</div>
          <div onClick={() => onShowDetail("rabbitmq")} className={indexStyles.fontWeightHover}>
            <Tooltip title={"查看详情"}>
              <i className="ri-article-line" style={{fontSize: "19px", marginRight: "20px"}}></i>
            </Tooltip>
          </div>
        </div>
        <div id={"mqExchange"} className={styles.mqCanvas}>
          <Line {...config}/>
        </div>
      </div>
    );
  };
}

export default MQBrokerChart;
