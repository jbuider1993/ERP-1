import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Line } from '@ant-design/charts';
import {Tooltip} from 'antd';
import 'remixicon/fonts/remixicon.css';

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
