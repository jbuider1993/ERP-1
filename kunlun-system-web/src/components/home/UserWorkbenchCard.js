import React from 'react';
import {Avatar, Card, Col, Row, Statistic, Tooltip} from 'antd';
import indexStyles from "../../pages/home/homeIndex.less";
import userLogo from '../../assets/userLogo.png';
import styles from './Home.less';
import 'remixicon/fonts/remixicon.css';

class UserWorkbenchCard extends React.Component {

  render() {

    const {userCounts, onShowDetail} = this.props;

    const loginUserInfo = window._USERINFO_ ? window._USERINFO_ : null;

    return (
      <div className={indexStyles.headerDiv}>
        <div className={indexStyles.headerBDiv}>
          <div className={indexStyles.workFontDiv}>
            <div className={indexStyles.workFont}>工作台</div>
            <div className={indexStyles.allUserInfo}>
              <div onClick={() => onShowDetail("list")} className={indexStyles.fontWeightHover}>
                <Tooltip title={"查看全部用户"}>
                  <i className="ri-group-line" style={{fontSize: "18px", marginLeft: "70px", marginTop: "5px"}}></i>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className={indexStyles.userInfoDiv}>
            <div className={indexStyles.userPhotoDiv}>
              <Avatar size={80} icon={<i className="ri-user-line"></i>} src={userLogo} />
            </div>
            <div className={indexStyles.userFontDiv}>
              <div><span style={{fontWeight: "bold"}}>{loginUserInfo ? loginUserInfo.userName : "admin"}</span>&nbsp;&nbsp;&nbsp;&nbsp;欢迎使用本系统！</div>
              <div>祝你开心每一天！</div>
              <div className={indexStyles.userPhoneAndEmailDiv}>
                <div>{loginUserInfo ? loginUserInfo.phoneNumber : "15555555555"}</div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div>{loginUserInfo ? loginUserInfo.email : "test@test.com"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={indexStyles.headerADiv}>
          <div className={indexStyles.userCountBlock}>
            <div style={{float: "right"}} onClick={() => onShowDetail("online")} className={indexStyles.fontWeightHover}>
              <Tooltip title={"查看登录用户"}>
                <i className="ri-user-line" style={{fontSize: "18px", marginRight: "20px"}}></i>
              </Tooltip>
            </div>
          </div>
          <div style={{padding: '0px 20px 20px 0px'}}>
            <Row gutter={20}>
              <Col span={8}>
                <Card style={{textAlign: "center"}} className={styles.userVisitTotalDiv}>
                  <Statistic title="总访问量"
                             value={userCounts ? userCounts.userCount : 110}
                             precision={0}
                             valueStyle={{color: 'green', fontSize: "25px"}}
                             prefix={<i className="ri-global-line" style={{marginRight: "10px", verticalAlign: "bottom"}}></i>}
                             suffix="人"/>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{textAlign: "center"}} className={styles.userOnlineDiv}>
                  <Statistic title="在线人数"
                             value={userCounts ? userCounts.onlineCount : 5}
                             precision={0}
                             valueStyle={{color: 'red', fontSize: "25px"}}
                             prefix={<i className="ri-macbook-line" style={{marginRight: "10px", verticalAlign: "bottom"}}></i>}
                             suffix="人"/>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{textAlign: "center"}} className={styles.userVisitLastDiv}>
                  <Statistic title="最近一个月内访问量"
                             value={userCounts ? userCounts.leastCount : 28}
                             precision={0}
                             valueStyle={{color: 'blue', fontSize: "25px"}}
                             prefix={<i className="ri-computer-line" style={{marginRight: "10px", verticalAlign: "bottom"}}></i>}
                             suffix="人"/>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  };
}

export default UserWorkbenchCard;
