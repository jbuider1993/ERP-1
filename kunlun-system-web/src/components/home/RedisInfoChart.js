import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Line } from '@ant-design/charts';

class RedisInfoChart extends React.Component {

  componentDidMount() {
    setInterval(() => {
      this.props.getRedisInfos();
    }, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval();
  }

  render() {

    const {redisInfos} = this.props;

    debugger

    const config = {
      padding: [50, 20, 30, 60],
      forceFit: true,
      data: redisInfos,
      xField: 'time',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        type: 'dateTime',
        label: {
          visible: true,
          autoHide: true,
        },
      },
      color: (d) => {
        return d === 'memory' ? '#f5072a' : '#0a5ef1';
      },
      legend: { visible: true },
      label: {
        visible: true,
        type: 'line',
      },
      animation: { appear: { animation: 'clipingWithData' } },
      smooth: true,
    };

    return (
      <div className={indexStyles.redisDiv}>
        <div className={indexStyles.redisTitleDiv}>Redis键值对及内存使用统计</div>
        <div id={"redisMemory"} className={styles.redisCanvas}>
          <Line {...config} />
        </div>
      </div>
    );
  };
}

export default RedisInfoChart;
