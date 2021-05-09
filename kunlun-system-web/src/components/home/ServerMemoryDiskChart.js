import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Gauge } from '@ant-design/charts';

class ServerMemoryDiskChart extends React.Component {

  render() {

    const cpuConfig = {
      percent: 0.7,
      padding: [3, 0, 6.5, 0],
      radius: 1,
      innerRadius: 0.75,
      range: {
        ticks: [0, 1],
        color: ['l(0) 0:#30bf78 0.5:#a0d911 0.7:#faad14 1:#f4664a'],
      },
      indicator: {
        pointer: { style: { stroke: '#D0D0D0' } },
        pin: { style: { stroke: '#D0D0D0' } },
      },
      statistic: {
        content: {
          offsetY: 15,
          style: {
            fontSize: '14px',
            color: '#4B535E',
          },
          formatter: function formatter() {
            return 'CPU使用率';
          },
        },
      },
    };

    const diskConfig = {
      percent: 0.5,
      padding: [3, 0, 6.5, 0],
      radius: 1,
      innerRadius: 0.75,
      range: {
        ticks: [0, 1],
        color: ['l(0) 0:#30bf78 0.5:#a0d911 0.7:#faad14 1:#f4664a'],
      },
      indicator: {
        pointer: { style: { stroke: '#D0D0D0' } },
        pin: { style: { stroke: '#D0D0D0' } },
      },
      statistic: {
        content: {
          offsetY: 15,
          style: {
            fontSize: '14px',
            color: '#4B535E',
          },
          formatter: function formatter() {
            return '磁盘使用率';
          },
        },
      },
    };

    return (
      <div className={indexStyles.tableADiv}>
        <div className={indexStyles.tableATitleDiv}>服务器资源</div>
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
