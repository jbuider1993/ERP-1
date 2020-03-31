import React from 'react';
import styles from './Home.less';
import indexStyles from "../../pages/home/homeIndex.less";
import { StackArea } from '@antv/g2plot';

class RedisInfoChart extends React.Component {

  componentDidMount() {
    // 显示线图
    this.showLineChartA();
  }

  showLineChartA() {
    const data = [
      { "country": "键值对数", "date": 1965, "value": 1058.1 },
      { "country": "键值对数", "date": 1966, "value": 1089.7 },
      { "country": "键值对数", "date": 1967, "value": 1121.7 },
      { "country": "键值对数", "date": 1968, "value": 1196.6 },
      { "country": "键值对数", "date": 1969, "value": 1285.5 },
      { "country": "键值对数", "date": 1970, "value": 1369 },
      { "country": "键值对数", "date": 1971, "value": 1406.2 },
      { "country": "键值对数", "date": 1972, "value": 1472.7 },
      { "country": "键值对数", "date": 1973, "value": 1558 },
      { "country": "键值对数", "date": 1974, "value": 1535.5 },
      { "country": "键值对数", "date": 1975, "value": 1519.3 },
      { "country": "键值对数", "date": 1976, "value": 1606.9 },
      { "country": "键值对数", "date": 1977, "value": 1632.4 },
      { "country": "键值对数", "date": 1978, "value": 1687.5 },
      { "country": "键值对数", "date": 1979, "value": 1749.6 },
      { "country": "键值对数", "date": 1980, "value": 1706.4 },
      { "country": "键值对数", "date": 1981, "value": 1661.4 },
      { "country": "键值对数", "date": 1982, "value": 1630.2 },
      { "country": "键值对数", "date": 1983, "value": 1645.2 },
      { "country": "键值对数", "date": 1984, "value": 1686.9 },
      { "country": "键值对数", "date": 1985, "value": 1779.4 },
      { "country": "键值对数", "date": 1986, "value": 1811.3 },
      { "country": "键值对数", "date": 1987, "value": 1849.7 },
      { "country": "键值对数", "date": 1988, "value": 1870 },
      { "country": "键值对数", "date": 1989, "value": 1875 },
      { "country": "键值对数", "date": 1990, "value": 1853.3 },
      { "country": "键值对数", "date": 1991, "value": 1844.6 },
      { "country": "键值对数", "date": 1992, "value": 1814.1 },
      { "country": "键值对数", "date": 1993, "value": 1805.3 },
      { "country": "键值对数", "date": 1994, "value": 1791.3 },
      { "country": "键值对数", "date": 1995, "value": 1836.2 },
      { "country": "键值对数", "date": 1996, "value": 1896.1 },
      { "country": "键值对数", "date": 1997, "value": 1896.4 },
      { "country": "键值对数", "date": 1998, "value": 1918.8 },
      { "country": "键值对数", "date": 1999, "value": 1907.7 },
      { "country": "键值对数", "date": 2000, "value": 1932.1 },
      { "country": "键值对数", "date": 2001, "value": 1959.2 },
      { "country": "键值对数", "date": 2002, "value": 1954.8 },
      { "country": "键值对数", "date": 2003, "value": 1991.6 },
      { "country": "键值对数", "date": 2004, "value": 2025.4 },
      { "country": "键值对数", "date": 2005, "value": 2037.4 },
      { "country": "键值对数", "date": 2006, "value": 2056.4 },
      { "country": "键值对数", "date": 2007, "value": 2041.7 },
      { "country": "键值对数", "date": 2008, "value": 2038.5 },
      { "country": "键值对数", "date": 2009, "value": 1932.1 },
      { "country": "键值对数", "date": 2010, "value": 2001.1 },
      { "country": "键值对数", "date": 2011, "value": 1949.1 },
      { "country": "键值对数", "date": 2012, "value": 1944.3 },
      { "country": "键值对数", "date": 2013, "value": 1934 },
      { "country": "键值对数", "date": 2014, "value": 1871.2 },
      { "country": "键值对数", "date": 2015, "value": 1908.7 },
      { "country": "键值对数", "date": 2016, "value": 1934.6 },
      { "country": "键值对数", "date": 2017, "value": 1969.5 },
      { "country": "内存使用率", "date": 1965, "value": 441.6 },
      { "country": "内存使用率", "date": 1966, "value": 482.9 },
      { "country": "内存使用率", "date": 1967, "value": 506.1 },
      { "country": "内存使用率", "date": 1968, "value": 544.1 },
      { "country": "内存使用率", "date": 1969, "value": 619.8 },
      { "country": "内存使用率", "date": 1970, "value": 704.9 },
      { "country": "内存使用率", "date": 1971, "value": 771.4 },
      { "country": "内存使用率", "date": 1972, "value": 817.9 },
      { "country": "内存使用率", "date": 1973, "value": 885.1 },
      { "country": "内存使用率", "date": 1974, "value": 902.2 },
      { "country": "内存使用率", "date": 1975, "value": 936.1 },
      { "country": "内存使用率", "date": 1976, "value": 983.2 },
      { "country": "内存使用率", "date": 1977, "value": 1037.3 },
      { "country": "内存使用率", "date": 1978, "value": 1106.2 },
      { "country": "内存使用率", "date": 1979, "value": 1157.6 },
      { "country": "内存使用率", "date": 1980, "value": 1168 },
      { "country": "内存使用率", "date": 1981, "value": 1175 },
      { "country": "内存使用率", "date": 1982, "value": 1186.8 },
      { "country": "内存使用率", "date": 1983, "value": 1240.7 },
      { "country": "内存使用率", "date": 1984, "value": 1326.7 },
      { "country": "内存使用率", "date": 1985, "value": 1395.9 },
      { "country": "内存使用率", "date": 1986, "value": 1456.5 },
      { "country": "内存使用率", "date": 1987, "value": 1538 },
      { "country": "内存使用率", "date": 1988, "value": 1650.5 },
      { "country": "内存使用率", "date": 1989, "value": 1740.4 },
      { "country": "内存使用率", "date": 1990, "value": 1812.8 },
      { "country": "内存使用率", "date": 1991, "value": 1896.9 },
      { "country": "内存使用率", "date": 1992, "value": 1984.5 },
      { "country": "内存使用率", "date": 1993, "value": 2088.9 },
      { "country": "内存使用率", "date": 1994, "value": 2204.3 },
      { "country": "内存使用率", "date": 1995, "value": 2306.8 },
      { "country": "内存使用率", "date": 1996, "value": 2413.2 },
      { "country": "内存使用率", "date": 1997, "value": 2487 },
      { "country": "内存使用率", "date": 1998, "value": 2481 },
      { "country": "内存使用率", "date": 1999, "value": 2577.9 },
      { "country": "内存使用率", "date": 2000, "value": 2671.9 },
      { "country": "内存使用率", "date": 2001, "value": 2759.7 },
      { "country": "内存使用率", "date": 2002, "value": 2901.2 },
      { "country": "内存使用率", "date": 2003, "value": 3145.5 },
      { "country": "内存使用率", "date": 2004, "value": 3445.8 },
      { "country": "内存使用率", "date": 2005, "value": 3724.3 },
      { "country": "内存使用率", "date": 2006, "value": 3944 },
      { "country": "内存使用率", "date": 2007, "value": 4195.2 },
      { "country": "内存使用率", "date": 2008, "value": 4310.8 },
      { "country": "内存使用率", "date": 2009, "value": 4411.1 },
      { "country": "内存使用率", "date": 2010, "value": 4696.1 },
      { "country": "内存使用率", "date": 2011, "value": 4951.1 },
      { "country": "内存使用率", "date": 2012, "value": 5118.2 },
      { "country": "内存使用率", "date": 2013, "value": 5269.9 },
      { "country": "内存使用率", "date": 2014, "value": 5382.9 },
      { "country": "内存使用率", "date": 2015, "value": 5472.4 },
      { "country": "内存使用率", "date": 2016, "value": 5585.5 },
      { "country": "内存使用率", "date": 2017, "value": 5743.6 }];
    const areaPlot = new StackArea(document.getElementById('redisMemory'), {
      title: { visible: false, text: '堆叠面积图' },
      data,
      padding: [30, 10, 40, 45],
      xField: 'date',
      yField: 'value',
      stackField: 'country',
      xAxis: { type: 'dateTime', tickCount: 5 },
      legend: { visible: true, position: 'top' },
      responsive: true,
    });
    areaPlot.render();
  }

  render() {

    return (
      <div className={indexStyles.redisDiv}>
        <div className={indexStyles.redisTitleDiv}>Redis键值对及内存使用统计</div>
        <div id={"redisMemory"} className={styles.redisCanvas}></div>
      </div>
    );
  };
}

export default RedisInfoChart;
