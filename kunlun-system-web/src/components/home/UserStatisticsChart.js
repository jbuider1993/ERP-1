import React from 'react';
import G2 from '@antv/g2';
import styles from './Home.less';
import indexStyles from "../../routes/home/homeIndex.less";

class UserStatisticsChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showLineChart();
  }

  showLineChart() {
    var data = [{
      year: '1', value: 3
    }, {
      year: '2', value: 4
    }, {
      year: '3', value: 3.5
    }, {
      year: '4', value: 5
    }, {
      year: '5', value: 4.9
    }, {
      year: '6', value: 6
    }, {
      year: '7', value: 7
    }, {
      year: '8', value: 9
    }, {
      year: '9', value: 5
    }, {
      year: '10', value: 3
    }, {
      year: '11', value: 8
    }, {
      year: '12', value: 2
    }];
    var chart = new G2.Chart({
      container: 'userNum',
      forceFit: true,
      padding: { top: 20, right: 30, bottom: 20, left: 40 }
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

    return (
      <div className={indexStyles.userChartMonthDiv}>
        <div className={indexStyles.userChartMonthInfoDiv}>用户访问量月统计趋势图</div>
        <div className={indexStyles.rightDiv}>
          <div>
            <div id={"userNum"} className={styles.userNumCanvas}></div>
          </div>
        </div>
      </div>
    );
  };
}

export default UserStatisticsChart;
