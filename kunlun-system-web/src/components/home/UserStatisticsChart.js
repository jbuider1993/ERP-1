import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import {AutoComplete, Input} from 'antd';
// import { Line } from '@antv/g2plot';
import moment from 'moment';
import { Line } from '@ant-design/charts';

const { Option } = AutoComplete;

class UserStatisticsChart extends React.Component {

  // componentWillReceiveProps() {
  //   // 显示线图
  //   this.showLineChart();
  // }

  showLineChart() {
    const data = [
      { month: '1', value: 3 },
      { month: '2', value: 4 },
      { month: '3', value: 3.5 },
      { month: '4', value: 15 },
      { month: '5', value: 4.9 },
      { month: '6', value: 6 },
      { month: '7', value: 17 },
      { month: '8', value: 9 },
      { month: '9', value: 13 },
      { month: '10', value: 3 },
      { month: '11', value: 23 },
      { month: '12', value: 13 },
    ];

    debugger

    const {userStatistics} = this.props;
    const linePlot = new Line(document.getElementById('userVisitChart'), {
      title: { visible: false, text: '配置折线数据点样式'},
      description: { visible: false, text: '自定义配置趋势线上数据点的样式'},
      padding: [20, 15, 25, 30],
      forceFit: true,
      data: userStatistics && userStatistics.length > 0 ? userStatistics : data,
      xField: 'month',
      yField: 'value',
      label: { visible: true, type: 'point'},
      point: {
        visible: true,
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#2593fc',
          lineWidth: 2,
        },
      },
    });
    linePlot.repaint();
  }

  render() {

    const {userStatistics, onSelectYear} = this.props;

    const userStatisticLineConfig = {
      title: { visible: false, text: '配置折线数据点样式'},
      description: { visible: false, text: '自定义配置趋势线上数据点的样式'},
      padding: [20, 15, 25, 30],
      forceFit: true,
      data: userStatistics && userStatistics.length > 0 ? userStatistics : data,
      xField: 'month',
      yField: 'value',
      label: { visible: true, type: 'point'},
      point: {
        visible: true,
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#2593fc',
          lineWidth: 2,
        },
      },
    }

    const startYear = Number.parseInt(moment(new Date()).format("YYYY"));
    let yearDateSource = new Array();
    for (let i = 5; i >= 0; i--) {
      const objDate = {key: startYear - i, value: startYear - i};
      yearDateSource.push(objDate);
    }
    const yearOptions = yearDateSource.map(item => <Option key={item.key} value={item.value}>{item.value}</Option>);

    return (
      <div className={indexStyles.userChartMonthDiv}>
        <div className={indexStyles.userChartMonthInfoDiv}>
          <div className={indexStyles.userChartMonthfont}>用户访问量统计</div>
          <div id="userChartMonthSelect" className={indexStyles.userChartMonthSelect}>
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              getPopupContainer={() => document.getElementById('userChartMonthSelect')}
              placeholder={"请选择年份"}
              dataSource={yearOptions}
              onSelect={onSelectYear}
            >
              <Input.Search />
            </AutoComplete>
          </div>
        </div>
        <div className={indexStyles.rightDiv}>
          <Line {...userStatisticLineConfig} />
        </div>
      </div>
    );
  };
}

export default UserStatisticsChart;
