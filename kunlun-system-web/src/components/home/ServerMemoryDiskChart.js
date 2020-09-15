import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Gauge } from '@ant-design/charts';

class ServerMemoryDiskChart extends React.Component {

  render() {

    const cpuConfig = {
      value: 64,
      forceFit: true,
      padding: [7, 0, 18, 0],
      range: [0, 25, 50, 75, 100],
      color: ['#30bf78', '#a0d911', '#faad14', '#f4664a'],
      statistic: {
        visible: true,
        text: 'CPU使用率',
        color: '#30bf78',
        position: ['50%', '105%'],
        size: 13
      },
    };

    const diskConfig = {
      value: 51,
      forceFit: true,
      padding: [7, 0, 18, 0],
      range: [0, 25, 50, 75, 100],
      color: ['#30bf78', '#a0d911', '#faad14', '#f4664a'],
      statistic: {
        visible: true,
        text: '磁盘使用率',
        color: '#30bf78',
        position: ['50%', '105%'],
        size: 13
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
