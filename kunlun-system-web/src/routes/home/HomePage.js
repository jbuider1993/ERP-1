import React from 'react';
import { connect } from 'dva';
import {Button, Spin} from 'antd';
import FunctionNavigation from '../../components/home/FunctionNavigation';
import UserStatisticsChart from '../../components/home/UserStatisticsChart';
import RedisInfoChart from '../../components/home/RedisInfoChart';
import MQInfoChart from '../../components/home/MQInfoChart';
import UserInfoCard from '../../components/home/UserInfoCard';
import TodaySchedule from '../../components/home/TodaySchedule';
import ServerMemoryChart from '../../components/home/ServerMemoryChart';
import ServerDiskChart from '../../components/home/ServerDiskChart';
import ServiceInvokeList from '../../components/home/ServiceInvokeList';
import config from "../../config/config";
import indexStyles from './homeIndex.less';
import * as commonUtil from '../../utils/commonUtil';

function HomePage(props) {

  const { dispatch, homeModel } = props;

  const { userCounts, mqQueues, mqExchanges, loading, scheduleList } = homeModel;

  const statisticsCountProps = {
    userCounts
  };

  const serviceInvokeListProps = {
    onShowDetail: (key) => {
      commonUtil.sendRequestToHome(true, key, null);
    }
  };

  const userInfoCardProps = {
    userCounts,
    onShowDetail: (key) => {
      commonUtil.sendRequestToHome(true, key, null);
    }
  };

  const functionNavigationProps = {
    onShowDetail: (key) => {
      commonUtil.sendRequestToHome(true, key, null);
    }
  };

  const mqExchangeChartProps = {
    mqExchanges
  };

  const mqQueueChartProps = {
    mqQueues
  };

  const todayScheduleProps = {
    scheduleList
  };

  return (
    <div className={indexStyles.showDiv}>
      <Spin spinning={loading}>
        <UserInfoCard {...userInfoCardProps} />
        <div className={indexStyles.contentDiv}>
          <div className={indexStyles.rightContentDiv}>
            <FunctionNavigation {...functionNavigationProps} />
            <UserStatisticsChart />
            <div className={indexStyles.redisMQShowDiv}>
              <RedisInfoChart />
              <MQInfoChart {...mqExchangeChartProps}/>
            </div>
          </div>
          <div className={indexStyles.leftContentDiv}>
            <TodaySchedule {...todayScheduleProps} />
            <ServerMemoryChart />
            <ServerDiskChart />
            <ServiceInvokeList {...serviceInvokeListProps} />
          </div>
        </div>
        <div className={indexStyles.footDiv}>
          <div className={indexStyles.footFontDiv}>{config.footerText}</div>
        </div>
      </Spin>
    </div>
  );
}

function mapStateToProps({ homeModel }) {
  return { homeModel };
}

export default connect(mapStateToProps)(HomePage);
