import React from 'react';
import G2 from '@antv/g2';
import styles from './Home.less';
import indexStyles from "../../routes/home/homeIndex.less";

class ServerMemoryChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showLineChart();
  }

  showLineChart() {
    var Shape = G2.Shape;
    // 自定义Shape 部分
    Shape.registerShape('point', 'pointer', {
      drawShape: function drawShape(cfg, group) {
        var center = this.parsePoint({ // 获取极坐标系下画布中心点
          x: 0,
          y: 0
        });
        // 绘制指针
        group.addShape('line', {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: cfg.x,
            y2: cfg.y,
            stroke: cfg.color,
            lineWidth: 5,
            lineCap: 'round'
          }
        });
        return group.addShape('circle', {
          attrs: {
            x: center.x,
            y: center.y,
            r: 9.75,
            stroke: cfg.color,
            lineWidth: 4.5,
            fill: '#fff'
          }
        });
      }
    });

    var data = [{
      value: 5.6
    }];
    var chart = new G2.Chart({
      container: 'serverMemory',
      forceFit: true,
      height: 170,
      padding: { top: -10, right: 20, bottom: 10, left: 20 },
    });
    chart.source(data);

    chart.coord('polar', {
      startAngle: -9 / 8 * Math.PI,
      endAngle: 1 / 8 * Math.PI,
      radius: 0.75
    });
    chart.scale('value', {
      min: 0,
      max: 9,
      tickInterval: 1,
      nice: false
    });

    chart.axis('1', false);
    chart.axis('value', {
      zIndex: 2,
      line: null,
      label: {
        offset: -16,
        textStyle: {
          fontSize: 18,
          textAlign: 'center',
          textBaseline: 'middle'
        }
      },
      subTickCount: 4,
      subTickLine: {
        length: -8,
        stroke: '#fff',
        strokeOpacity: 1
      },
      tickLine: {
        length: -17,
        stroke: '#fff',
        strokeOpacity: 1
      },
      grid: null
    });
    chart.legend(false);
    chart.point().position('value*1').shape('pointer').color('#1890FF').active(false);

    // 绘制仪表盘背景
    chart.guide().arc({
      zIndex: 0,
      top: false,
      start: [0, 0.945],
      end: [9, 0.945],
      style: { // 底灰色
        stroke: '#CBCBCB',
        lineWidth: 18
      }
    });
    // 绘制指标
    chart.guide().arc({
      zIndex: 1,
      start: [0, 0.945],
      end: [data[0].value, 0.945],
      style: {
        stroke: '#1890FF',
        lineWidth: 18
      }
    });
    // 绘制指标数字
    chart.guide().html({
      position: ['50%', '95%'],
      html: '<div style="width: 300px;text-align: center;">' + '<p style="font-size: 20px; color: #545454;margin: 0;">合格率</p>' + '<p style="font-size: 36px;color: #545454;margin: 0;">' + data[0].value * 10 + '%</p>' + '</div>'
    });

    chart.render();
  }

  render() {

    return (
      <div className={indexStyles.tableADiv}>
        <div className={indexStyles.tableATitleDiv}>tableATitleDiv</div>
        <div id={"serverMemory"} className={styles.serverMemoryCanvas}></div>
      </div>
    );
  };
}

export default ServerMemoryChart;
