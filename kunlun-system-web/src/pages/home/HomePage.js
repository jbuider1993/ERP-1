import React, {Component} from 'react';
import { connect } from 'dva';
import {Spin} from 'antd';
import FunctionNavigation from '../../components/home/FunctionNavigation';
import UserStatisticsChart from '../../components/home/UserStatisticsChart';
import NewsMessageChart from '../../components/home/NewsMessageChart';
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
import moment from 'moment';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, homeModel } = this.props;
    setInterval(() => {
      const year = moment(new Date()).format("YYYY");
      dispatch({type: "homeModel/getUserCount", payload: {}});
      dispatch({type: "homeModel/onSelectYear", payload: {year}});
      dispatch({type: "homeModel/getRedisInfos", payload: {}});
      dispatch({type: "homeModel/getMessages", payload: {}});
      dispatch({type: "homeModel/queryServiceInvokes", payload: {}});
    }, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval();
  }

  render() {

    const { dispatch, homeModel } = this.props;

    const { userCounts, redisInfos, mqInfos, loading, scheduleData, scheduleIndex, scheduleTotal,
      serviceInvokes, userStatistics, selectedYear } = homeModel;

    const serviceInvokeListProps = {
      serviceInvokes,
      onShowDetail: (key) => {
        commonUtil.sendRequestToHome(true, key, null);
      },
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
      selectedYear,
      onSelectYear: (year) => {
        dispatch({type: "homeModel/updateState", payload: {selectedYear: year}});
        dispatch({type: "homeModel/onSelectYear", payload: {year}});
      }
    }

    const newsMessageChartProps = {
      onShowDetail: (key) => {
        commonUtil.sendRequestToHome(true, key, null);
      },
    }

    const redisInfoChartProps = {
      redisInfos,
    }

    const mqNumberProps = {
      mqInfos,
      onShowDetail: (key) => {
        commonUtil.sendRequestToHome(true, key, null);
      },
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
        <Spin spinning={loading} size={"large"} tip={"?????????????????????????????????"}>
          {/* ????????????????????????????????? */}
          <UserWorkbenchCard {...userInfoCardProps} />
          {/* ???????????? */}
          <div className={indexStyles.contentDiv}>
            <div className={indexStyles.rightContentDiv}>
              {/* ???????????? */}
              <FunctionNavigation {...functionNavigationProps} />
              <div className={indexStyles.userMessageDiv}>
                {/* ?????????????????? */}
                <UserStatisticsChart {...userStatisticsChartProps}/>
                {/* ???????????? */}
                <NewsMessageChart {...newsMessageChartProps} />
              </div>
              {/* Redis?????????MQ???????????? */}
              <div className={indexStyles.redisMQShowDiv}>
                <RedisInfoChart {...redisInfoChartProps}/>
                <MQBrokerChart {...mqNumberProps}/>
              </div>
            </div>
            {/* ????????? */}
            <div className={indexStyles.leftContentDiv}>
              {/* ???????????? */}
              <TodaySchedule {...todayScheduleProps} />
              {/* ?????????CPU????????????????????? */}
              <ServerMemoryDiskChart />
              {/* ?????????????????? */}
              <ServerClusterChart />
              {/* ?????????????????? */}
              <ServiceInvokeList {...serviceInvokeListProps} />
            </div>
          </div>
          {/* Footer?????? */}
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
