import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import {AutoComplete, Input, Icon} from 'antd';
import { Line } from '@antv/g2plot';

const { Option } = AutoComplete;

class UserStatisticsChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showLineChart();
  }

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

    const linePlot = new Line(document.getElementById('userVisitChart'), {
      title: { visible: false, text: '配置折线数据点样式'},
      description: { visible: false, text: '自定义配置趋势线上数据点的样式'},
      padding: [20, 15, 25, 30],
      forceFit: true,
      data,
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
    linePlot.render();
  }

  render() {

    let yearDateSource = [{key: "2016", value: "2016年"},
      {key: "2017", value: "2017年"},
      {key: "2018", value: "2018年"},
      {key: "2019", value: "2019年"},
      {key: "2020", value: "2020年"}];
    const yearOptions = yearDateSource.map(item => <Option key={item.key} value={item.value}>{item.value}</Option>);

    return (
      <div className={indexStyles.userChartMonthDiv}>
        <div className={indexStyles.userChartMonthInfoDiv}>
          <div className={indexStyles.userChartMonthfont}>用户访问量统计</div>
          <div id="userChartMonthSelect" className={indexStyles.userChartMonthSelect}>
            <AutoComplete
              getPopupContainer={() => document.getElementById('userChartMonthSelect')}
              placeholder={"请选择年份"}
              dataSource={yearOptions}
            >
              <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
          </div>
        </div>
        <div className={indexStyles.rightDiv}>
          <div id={"userVisitChart"} className={styles.userNumCanvas}></div>
        </div>
      </div>
    );
  };
}

export default UserStatisticsChart;
