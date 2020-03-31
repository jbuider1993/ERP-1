import React from 'react';
import {Form, Row, Col, Card, Statistic, Icon} from 'antd';
import moment from 'moment';
import styles from "./Schedule.less";

const ScheduleStatistics = (props) => {

  const { scheduleList } = props;

  // 未处理日程数
  const outProcessCount = scheduleList.filter(item => moment(item.endTime) < new Date()).length;

  // 待处理日程数
  const notProcessCount = scheduleList.length - outProcessCount;

  return (
    <div className={styles.scheduleFlexStatisticsDiv}>
      <div className={styles.scheduleStatisticsFirstDiv}>
        <div className={styles.scheduleStatisticsTotalTitleDiv}><Icon type="clock-circle" style={{color: "green", fontSize: "20px"}} />&nbsp;&nbsp;&nbsp;&nbsp;全部日程</div>
        <div className={styles.scheduleStatisticsTotalContentDiv}>
          <Row className={styles.sheduleStatisticsRow}>
            <Col span={24}>
              <Card className={styles.scheduleStatisticsCard}>
                <Statistic
                  title=""
                  value={scheduleList.length}
                  precision={0}
                  valueStyle={{ color: 'green' }}
                  prefix={<Icon type="global" />}
                  suffix="个"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.scheduleStatisticsSecondDiv}>
        <div className={styles.scheduleStatisticsTotalTitleDiv}><Icon type="play-circle" style={{color: "red", fontSize: "20px"}} />&nbsp;&nbsp;&nbsp;&nbsp;待处理日程</div>
        <div className={styles.scheduleStatisticsNotContentDiv}>
          <Row className={styles.sheduleStatisticsRow}>
            <Col span={24}>
              <Card className={styles.scheduleStatisticsCard}>
                <Statistic
                  title=""
                  value={notProcessCount}
                  precision={0}
                  valueStyle={{ color: 'red' }}
                  prefix={<Icon type="laptop" />}
                  suffix="个"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.scheduleStatisticsFourDiv}>
        <div className={styles.scheduleStatisticsTotalTitleDiv}><Icon type="stop" style={{color: "blue", fontSize: "20px"}} />&nbsp;&nbsp;&nbsp;&nbsp;已过期日程</div>
        <div className={styles.scheduleStatisticsTimeOutContentDiv}>
          <Row className={styles.sheduleStatisticsRow}>
            <Col span={24}>
              <Card className={styles.scheduleStatisticsCard}>
                <Statistic
                  title=""
                  value={outProcessCount}
                  precision={0}
                  valueStyle={{ color: 'blue' }}
                  prefix={<Icon type="robot" />}
                  suffix="个"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(ScheduleStatistics);
