import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { DualLine } from '@ant-design/charts';
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

    const config = {
      padding: "auto",
      forceFit: true,
      data: [redisValues, redisMemorys],
      xField: 'time',
      yField: ['键值对数', '占用内存'],
      lineConfigs: [{
          color: '#32f307',
          smooth: true,
          lineSize: 2,
        }, {
          color: '#ee0606',
          smooth: true,
          lineSize: 2,
        },
      ],
      tooltip: {
        custom: {
          customContent: (title, items) => {
            const dateTitle = moment(new Date()).format("YYYY-MM-DD") + " " + title;
            return (
              <div style={{ padding: '15px 0px 0px 0px' }}>
                <h5>{dateTitle}</h5>
                <p style={{ padding: '10px 15px 0px 0px' }}>键值对数：{items && items[1] && items[1].value} 个</p>
                <p>占用内存：{items && items[0] && items[0].value} K</p>
              </div>
            );
          },
        },
      },
    };

    return (
      <div className={indexStyles.redisDiv}>
        <div className={indexStyles.redisTitleDiv}>Redis键值对及内存使用统计</div>
        <div id={"redisMemory"} className={styles.redisCanvas}>
          <DualLine {...config} />
        </div>
      </div>
    );
  };
}

export default RedisInfoChart;
