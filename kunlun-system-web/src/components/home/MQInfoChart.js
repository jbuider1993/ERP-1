import React from 'react';
import G2 from '@antv/g2';
import styles from './Home.less';
import indexStyles from "../../routes/home/homeIndex.less";

class MQInfoChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showLineChart();
  }

  showLineChart() {
    var data = [{
      year: '1991', value: 3
    }, {
      year: '1992', value: 4
    }, {
      year: '1993', value: 3.5
    }, {
      year: '1994', value: 5
    }, {
      year: '1995', value: 4.9
    }, {
      year: '1996', value: 6
    }, {
      year: '1997', value: 7
    }, {
      year: '1998', value: 9
    }, {
      year: '1999', value: 13
    }, {
      year: '2000', value: 13
    }, {
      year: '2001', value: 13
    }, {
      year: '2002', value: 13
    }];
    var chart = new G2.Chart({
      container: 'mqExchange',
      forceFit: true,
      padding: { top: 20, right: 30, bottom: 40, left: 40 }
    });
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('year', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('year*value');
    chart.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });

    chart.render();
  }

  render() {

    const {onShowDetail} = this.props;

    return (
      <div className={indexStyles.mqDiv}>
        <div className={indexStyles.mqTitleDiv}>
          <div className={indexStyles.mqTitleFontDiv}>高级缓存消息队列使用情况</div>
          <div onClick={() => onShowDetail("mq")} className={indexStyles.serviceInvokeHover}>查看详情</div>
        </div>
        <div id={"mqExchange"} className={styles.mqCanvas}></div>
      </div>
    );
  };
}

export default MQInfoChart;
