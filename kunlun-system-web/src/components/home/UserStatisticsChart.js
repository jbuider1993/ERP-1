import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import {AutoComplete, Input} from 'antd';
import moment from 'moment';
import { Line } from '@ant-design/charts';

const { Option } = AutoComplete;

class UserStatisticsChart extends React.Component {

  render() {

    const {userStatistics, onSelectYear, selectedYear} = this.props;

    const userStatisticLineConfig = {
      title: { visible: false, text: '配置折线数据点样式'},
      description: { visible: false, text: '自定义配置趋势线上数据点的样式'},
      padding: [30, 20, 35, 35],
      forceFit: true,
      data: userStatistics && userStatistics.length > 0 ? userStatistics : null,
      xField: 'month',
      yField: 'value',
      label: { visible: true, type: 'point'},
      tooltip: {
        custom: {
          customContent: (title, items) => {
            const dateTitle = (selectedYear ? selectedYear : moment(new Date()).format("YYYY")) + "年" + title + "月";
            return (
              <div style={{ padding: '15px 0px 0px 0px' }}>
                <h5>{dateTitle}</h5>
                <p style={{ padding: '10px 15px 0px 0px' }}>用户访问数 (个)：{items && items[0] && items[0].value}</p>
              </div>
            );
          },
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
          <div className={indexStyles.userChartMonthfont}>用户访问</div>
          <div id="userChartMonthSelect" className={indexStyles.userChartMonthSelect}>
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              getPopupContainer={() => document.getElementById('userChartMonthSelect')}
              placeholder={"请选择年份"}
              dataSource={yearOptions}
              onSelect={onSelectYear}
              defaultValue={startYear}
            >
              <Input.Search />
            </AutoComplete>
          </div>
        </div>
        <div className={indexStyles.userStatisticsRightDiv}>
          <Line {...userStatisticLineConfig} />
        </div>
      </div>
    );
  };
}

export default UserStatisticsChart;
