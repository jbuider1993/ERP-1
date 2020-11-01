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
          <div className={indexStyles.userInfoDiv}>
            <div className={indexStyles.userPhotoDiv}>
              <Avatar size={70} icon={<i className="ri-user-line"></i>} src={userLogo} />
            </div>
            <div className={indexStyles.userFontDiv}>
              <div><span style={{fontWeight: "bold"}}>{loginUserInfo ? loginUserInfo.userName : "admin"}</span>&nbsp;&nbsp;&nbsp;&nbsp;欢迎使用本系统！</div>
              <div>祝你开心每一天！</div>
              <div className={indexStyles.userPhoneAndEmailDiv}>
                <span>{loginUserInfo ? loginUserInfo.phoneNumber : "15555555555"}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{loginUserInfo ? loginUserInfo.email : "test@test.com"}</span>
              </div>
            </div>
            <div className={indexStyles.allUserInfo}>
              <div onClick={() => onShowDetail("list")} className={indexStyles.fontWeightHover}>
                <Tooltip title={"查看全部用户"}>
                  <i className="ri-group-line" style={{fontSize: "18px", marginLeft: "70px", marginTop: "5px"}}></i>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className={indexStyles.headerADiv}>
          <Row gutter={20}>
            <Col span={5} style={{padding: "0px 0px 0px 10px"}}>
              <Card style={{textAlign: "center"}} className={styles.userVisitTotalDiv}>
                <Statistic title="注册用户数"
                           value={userCounts ? userCounts.userCount : ""}
                           precision={0}
                           valueStyle={{color: '#faad14', fontSize: "25px"}}
                           prefix={<i className="ri-global-line" style={{marginRight: "10px", verticalAlign: "bottom"}}></i>}
                           suffix="人"/>
              </Card>
            </Col>
            <Col span={6} style={{padding: "0px 0px 0px 10px"}}>
              <Card style={{textAlign: "center"}} className={styles.userVisitTotalDiv}>
                <Statistic title="总访问量"
                           value={userCounts ? userCounts.visitCount : ""}
                           precision={0}
                           valueStyle={{color: 'green', fontSize: "25px"}}
                           prefix={<i className="ri-global-line" style={{marginRight: "10px", verticalAlign: "bottom"}}></i>}
                           suffix="人"/>
              </Card>
            </Col>
            <Col span={6} style={{padding: "0px 0px 0px 10px"}}>
              <Card style={{textAlign: "center"}} className={styles.userOnlineDiv}>
                <Statistic title="在线人数"
                           value={userCounts ? userCounts.onlineCount : ""}
                           precision={0}
                           valueStyle={{color: 'red', fontSize: "25px"}}
                           prefix={<i className="ri-macbook-line" style={{marginRight: "10px", verticalAlign: "bottom"}}></i>}
                           suffix="人"/>
              </Card>
            </Col>
            <Col span={5} style={{padding: "0px 0px 0px 10px"}}>
              <Card style={{textAlign: "center"}} className={styles.userVisitLastDiv}>
                <Statistic title="近一个月访问量"
                           value={userCounts ? userCounts.leastCount : ""}
                           precision={0}
                           valueStyle={{color: 'blue', fontSize: "25px"}}
                           prefix={<i className="ri-computer-line" style={{marginRight: "10px", verticalAlign: "bottom"}}></i>}
                           suffix="人"/>
              </Card>
            </Col>
            <Col span={2}>
              <div className={indexStyles.userCountBlock}>
                <div style={{float: "right"}} onClick={() => onShowDetail("online")} className={indexStyles.fontWeightHover}>
                  <Tooltip title={"查看登录用户"}>
                    <i className="ri-user-line" style={{fontSize: "18px", marginRight: "15px"}}></i>
                  </Tooltip>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
}

export default UserWorkbenchCard;
