import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Gauge } from '@antv/g2plot';

class ServerMemoryDiskChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showCPULineChart();
    this.showDiskLineChart();
  }

  showCPULineChart() {
    const gaugePlot = new Gauge(document.getElementById('serverMemory'), {
      title: { visible: false, text: '仪表盘'},
      value: 64,
      min: 0,
      max: 100,
      padding: [10, 10, 30, 10],
      gaugeStyle: {
        colors: ['#30bf78', '#a0d911', '#faad14', '#f4664a'],
        tickLabelSize: 15,
      },
      statistic: () => {
        return '<div class="g2plot-gauge-label"><p class="value">CPU使用率</p></div>';
      },
    });
    gaugePlot.render();
  }

  showDiskLineChart() {
    const gaugePlot = new Gauge(document.getElementById('serverDisk'), {
      title: { visible: false, text: '仪表盘' },
      value: 51,
      min: 0,
      max: 100,
      padding: [10, 10, 30, 10],
      gaugeStyle: {
        colors: ['#30bf78', '#a0d911', '#faad14', '#f4664a'],
        tickLabelSize: 15,
      },
      statistic: () => {
        return '<div class="g2plot-gauge-label"><p class="title">磁盘使用率</p></div>';
      },
    });
    gaugePlot.render();
  }

  render() {

    return (
      <div className={indexStyles.tableADiv}>
        <div className={indexStyles.tableATitleDiv}>服务器CPU及磁盘使用统计</div>
        <div className={styles.serverMemoryDiv}>
          <div id={"serverMemory"} className={styles.serverCPU}></div>
          <div id={"serverDisk"} className={styles.serverDisk}></div>
        </div>
      </div>
    );
  };
}

export default ServerMemoryDiskChart;