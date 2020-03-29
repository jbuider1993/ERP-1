import React from 'react';
import G2 from '@antv/g2';
import styles from './Home.less';
import indexStyles from "../../routes/home/homeIndex.less";

class ServerDiskChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showLineChart();
  }

  showLineChart() {
    var data = [{
      item: '事例一',
      count: 40,
      percent: 0.4
    }, {
      item: '事例二',
      count: 21,
      percent: 0.21
    }, {
      item: '事例三',
      count: 17,
      percent: 0.17
    }, {
      item: '事例四',
      count: 13,
      percent: 0.13
    }, {
      item: '事例五',
      count: 9,
      percent: 0.09
    }];
    var chart = new G2.Chart({
      container: 'serverDisk',
      forceFit: true,
      height: 190,
      padding: { top: 20, right: 40, bottom: 45, left: 40 },
      animate: false
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    });
    chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.55
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    // 辅助文本
    chart.guide().html({
      position: ['50%', '50%'],
      html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
      alignX: 'middle',
      alignY: 'middle'
    });
    var interval = chart.intervalStack().position('percent').color('item').label('percent', {
      formatter: function formatter(val, item) {
        return item.point.item + ': ' + val;
      }
    }).tooltip('item*percent', function(item, percent) {
      percent = percent * 100 + '%';
      return {
        name: item,
        value: percent
      };
    }).style({
      lineWidth: 1,
      stroke: '#fff'
    });
    chart.render();
    interval.setSelected(data[0]);
  }

  render() {

    return (
      <div className={indexStyles.tableBDiv}>
        <div className={indexStyles.tableBTitleDiv}>tableBTitleDiv</div>
        <div id={"serverDisk"} className={styles.serverDiskCanvas}></div>
      </div>
    );
  };
}

export default ServerDiskChart;
