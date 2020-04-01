import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Line } from '@antv/g2plot';
import {Icon, Tooltip} from 'antd';

class MQBrokerChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showLineChart();
  }

  showLineChart() {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 24 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 37 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ];

    const linePlot = new Line(document.getElementById('mqExchange'), {
      title: { visible: false, text: '配置折线数据点样式'},
      description: { visible: false, text: '自定义配置趋势线上数据点的样式'},
      padding: [20, 15, 40, 35],
      forceFit: true,
      data,
      xField: 'year',
      yField: 'value',
      point: { visible: true },
      label: { visible: true, type: 'point' },
    });
    linePlot.render();
  }

  render() {

    const {onShowDetail} = this.props;

    return (
      <div className={indexStyles.mqDiv}>
        <div className={indexStyles.mqTitleDiv}>
          <div className={indexStyles.mqTitleFontDiv}>MQ队列Broker消息数量统计</div>
          <div onClick={() => onShowDetail("rabbitmq")} className={indexStyles.fontWeightHover}>
            <Tooltip title={"查看详情"}>
              <Icon type="profile" style={{fontSize: "16px", marginTop: "5px", marginRight: "20px"}} />
            </Tooltip>
          </div>
        </div>
        <div id={"mqExchange"} className={styles.mqCanvas}></div>
      </div>
    );
  };
}

export default MQBrokerChart;