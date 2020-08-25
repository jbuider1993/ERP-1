import React, {Component} from 'react';
import { connect } from 'dva';
import {Spin} from 'antd';
import FunctionNavigation from '../../components/home/FunctionNavigation';
import UserStatisticsChart from '../../components/home/UserStatisticsChart';
import RedisInfoChart from '../../components/home/RedisInfoChart';
import MQBrokerChart from '../../components/home/MQBrokerChart';
import UserWorkbenchCard from '../../components/home/UserWorkbenchCard';
import TodaySchedule from '../../components/home/TodaySchedule';
import ServerMemoryDiskChart from '../../components/home/ServerMemoryDiskChart';
import ServerClusterChart from '../../components/home/ServerClusterChart';
import ServiceInvokeList from '../../components/home/ServiceInvokeList';
import config from "../../config/config";
import indexStyles from './homeIndex.less';
import * as commonUtil from '../../utils/commonUtil';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { dispatch, homeModel } = this.props;

    const { userCounts, mqQueues, mqExchanges, loading, scheduleData, scheduleIndex, scheduleTotal,
      serviceInvokes, userStatistics } = homeModel;

    const statisticsCountProps = {
      userCounts
    }

    const serviceInvokeListProps = {
      serviceInvokes,
      onShowDetail: (key) => {
        commonUtil.sendRequestToHome(true, key, null);
      }
    }

    const userInfoCardProps = {
      userCounts,
      onShowDetail: (key) => {
        commonUtil.sendRequestToHome(true, key, null);
      }
    }

    const functionNavigationProps = {
      onShowDetail: (key) => {
        commonUtil.sendRequestToHome(true, key, null);
      }
    }

    const userStatisticsChartProps = {
      userStatistics,
      onSelectYear: (year) => {
        dispatch({type: "homeModel/onSelectYear", payload: {year}});
      }
    }

    const mqExchangeChartProps = {
      mqExchanges,
      onShowDetail: (key) => {
        commonUtil.sendRequestToHome(true, key, null);
      }
    }

    const mqQueueChartProps = {
      mqQueues
    }

    const todayScheduleProps = {
      scheduleData,
      scheduleIndex,
      scheduleTotal,
      onShowDetail: (key) => {
        commonUtil.sendRequestToHome(true, key, null);
      },
      onClickArrow: (arrowType) => {
        dispatch({type: "homeModel/onClickArrow", payload: {arrowType}});
      }
    }

    return (
      <div className={indexStyles.showDiv}>
        <Spin spinning={loading}>
          {/* 工作台（用户情况统计） */}
          <UserWorkbenchCard {...userInfoCardProps} />
          {/* 主题内容 */}
          <div className={indexStyles.contentDiv}>
            <div className={indexStyles.rightContentDiv}>
              {/* 便捷导航 */}
              <FunctionNavigation {...functionNavigationProps} />
              {/* 用户访问量统计 */}
              <UserStatisticsChart {...userStatisticsChartProps}/>
              {/* Redis键值对、内存使用及MQ队列Broker消息数量统计 */}
              <div className={indexStyles.redisMQShowDiv}>
                <RedisInfoChart />
                <MQBrokerChart {...mqExchangeChartProps}/>
              </div>
            </div>
            {/* 右侧栏 */}
            <div className={indexStyles.leftContentDiv}>
              {/* 事项日程 */}
              <TodaySchedule {...todayScheduleProps} />
              {/* 服务器CPU及磁盘使用统计 */}
              <ServerMemoryDiskChart />
              {/* 服务器集群资源统计 */}
              <ServerClusterChart />
              {/* 服务调用情况统计 */}
              <ServiceInvokeList {...serviceInvokeListProps} />
            </div>
          </div>
          {/* Footer脚标 */}
          <div className={indexStyles.footDiv}>
            <div className={indexStyles.footFontDiv}>{config.footerText}</div>
          </div>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps({ globalModel, homeModel }) {
  return { globalModel, homeModel };
}

export default connect(mapStateToProps)(HomePage);
