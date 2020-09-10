import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Gauge } from '@ant-design/charts';

class ServerMemoryDiskChart extends React.Component {

  render() {

    const cpuConfig = {
      width: 300,
      height: 300,
      value: 64,
      min: 0,
      max: 100,
      forceFit: true,
      padding: [10, 10, 25, 10],
      range: [0, 25, 50, 75, 100],
      color: ['#30bf78', '#a0d911', '#faad14', '#f4664a'],
      statistic: {
        visible: true,
        text: 'CPU使用率',
        color: '#30bf78',
        position: ['50%', '105%'],
        size: 15
      },
    };

    const diskConfig = {
      width: 400,
      height: 400,
      value: 51,
      min: 0,
      max: 100,
      forceFit: true,
      padding: [10, 10, 25, 10],
      range: [0, 25, 50, 75, 100],
      color: ['#30bf78', '#a0d911', '#faad14', '#f4664a'],
      statistic: {
        visible: true,
        text: '磁盘使用率',
        color: '#30bf78',
        position: ['50%', '105%'],
        size: 15
      },
    };

    return (
      <div className={indexStyles.tableADiv}>
        <div className={indexStyles.tableATitleDiv}>服务器CPU及磁盘使用统计</div>
        <div className={styles.serverMemoryDiv}>
          <div id={"serverMemory"} className={styles.serverCPU}>
            <Gauge {...cpuConfig} />
          </div>
          <div id={"serverDisk"} className={styles.serverDisk}>
            <Gauge {...diskConfig} />
          </div>
        </div>
      </div>
    );
  };
}

export default ServerMemoryDiskChart;
