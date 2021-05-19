import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { DualAxes, G2 } from '@ant-design/charts';
import moment from 'moment';

class RedisInfoChart extends React.Component {

  render() {

    const {redisInfos} = this.props;

    const redisValues = redisInfos.filter(item => item.type == "keyValue").map(item => {
      return {time: item.time, "键值对数": parseInt(item.value)};
    });
    const redisMemorys = redisInfos.filter(item => item.type == "memory").map(item => {
      return {time: item.time, "占用内存": parseFloat(item.value)};
    });

    const registerTheme = G2.registerTheme;
    registerTheme('custom-theme', {
      colors10: ['#ee0606', '#32f307'],
    });

    const config = {
      padding: [15, 18, 13, 18],
      data: [redisMemorys, redisValues],
      xField: 'time',
      yField: ['占用内存', '键值对数'],
      theme: 'custom-theme',
      geometryOptions: [
        {
          geometry: 'column',
          isStack: true,
          columnWidthRatio: 0.4,
        },
        { geometry: 'line' },
      ],
      legend: {
        visible: true,
        flipPage: true,
        offsetX: 18,
      },
    };

    return (
      <div className={indexStyles.redisDiv}>
        <div className={indexStyles.redisTitleDiv}>Redis资源</div>
        <div id={"redisMemory"} className={styles.redisCanvas}>
          <DualAxes {...config} />
        </div>
      </div>
    );
  };
}

export default RedisInfoChart;
