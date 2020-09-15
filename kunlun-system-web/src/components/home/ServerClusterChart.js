import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Donut } from '@ant-design/charts';

class ServerClusterChart extends React.Component {

  render() {

    const data = [
      { type: 'kunlun-home-web', value: 1 },
      { type: 'kunlun-system-web', value: 1 },
      { type: 'kunlun-register-service', value: 1 },
      { type: 'kunlun-gateway-service', value: 1 },
      { type: 'kunlun-basedata-service', value: 1 },
      { type: 'kunlun-system-service', value: 1 },
    ];

    const config = {
      forceFit: true,
      radius: 1,
      padding: [7, 7, 7, 7],
      data,
      angleField: 'value',
      colorField: 'type',
      statistic: {
        visible: true,
      },
      legend: {
        visible: true,
        position: 'right-top',
        offsetX: -5,
        offestY: -5,
        text: {
          symbol: "circle",
          style: {r: 5, fill: "#5B8FF9"},
          formatter: (text,cfg) => {
            return text;
          }
        }
      },
    };

    return (
      <div className={indexStyles.tableBDiv}>
        <div className={indexStyles.tableBTitleDiv}>服务器集群资源统计</div>
        <div id={"serverCluster"} className={styles.serverDiskCanvas}>
          <Donut {...config} />
        </div>
      </div>
    );
  };
}

export default ServerClusterChart;
