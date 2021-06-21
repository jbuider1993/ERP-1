import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { Pie  } from '@ant-design/charts';

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
      radius: 1,
      innerRadius: 0.64,
      padding: [7, 7, 7, -100],
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        type: 'inner',
        offset: '-50%',
        style: { textAlign: 'center' },
        autoRotate: false,
        content: '{value}',
      },
      legend: {
        visible: true,
        offsetX: -50,
      },
    };

    return (
      <div className={indexStyles.tableBDiv}>
        <div className={indexStyles.tableBTitleDiv}>服务资源</div>
        <div id={"serverCluster"} className={styles.serverDiskCanvas}>
          <Pie  {...config} />
        </div>
      </div>
    );
  };
}

export default ServerClusterChart;
