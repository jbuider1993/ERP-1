import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Donut } from '@antv/g2plot';

class ServerClusterChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showLineChart();
  }

  showLineChart() {
    const data = [
      { type: 'kunlun-home-web', value: 3 },
      { type: 'kunlun-system-web', value: 6 },
      { type: 'kunlun-register-service', value: 8 },
      { type: 'kunlun-gateway-service', value: 5 },
      { type: 'kunlun-basedata-service', value: 3 },
      { type: 'kunlun-system-service', value: 4 },
    ];

    const ringPlot = new Donut(document.getElementById('serverCluster'), {
      forceFit: true,
      title: { visible: false, text: '环图-指标卡'},
      description: { visible: false, text: '环图指标卡能够代替tooltip，在环图中心挖空部分显示各分类的详细信息。'},
      radius: 0.9,
      width: 'auto',
      height: 200,
      padding: [0, 150, 0, 0],
      data,
      angleField: 'value',
      colorField: 'type',
      statistic: {
        visible: true,
      },
      legend: {
        position: "right-top",
        offsetX: -70,
        offsetY: 10
      }
    });

    ringPlot.render();
  }

  render() {

    return (
      <div className={indexStyles.tableBDiv}>
        <div className={indexStyles.tableBTitleDiv}>服务器集群资源统计</div>
        <div id={"serverCluster"} className={styles.serverDiskCanvas}></div>
      </div>
    );
  };
}

export default ServerClusterChart;
