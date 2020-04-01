import React from 'react';
import {Avatar, Card, Col, Icon, Row, Statistic, Tooltip} from 'antd';
import indexStyles from "../../pages/home/homeIndex.less";
import userLogo from '../../assets/userLogo.png';
import styles from './Home.less';

class UserWorkbenchCard extends React.Component {

  render() {

    const {userCounts, onShowDetail} = this.props;

    const tokenModel = window._USERINFO_ ? window._USERINFO_ : null;

    return (
      <div className={indexStyles.headerDiv}>
        <div className={indexStyles.headerBDiv}>
          <div className={indexStyles.workFontDiv}>
            <div className={indexStyles.workFont}>工作台</div>
            <div className={indexStyles.allUserInfo}>
              <div onClick={() => onShowDetail("list")} className={indexStyles.fontWeightHover}>
                <Tooltip title={"查看全部用户"}>
                  <Icon type="team" style={{fontSize: "18px", marginLeft: "70px", marginTop: "5px"}} />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className={indexStyles.userInfoDiv}>
            <div className={indexStyles.userPhotoDiv}>
              <Avatar size={80} icon="user" src={userLogo} />
            </div>
            <div className={indexStyles.userFontDiv}>
              <div><span style={{fontWeight: "bold"}}>{tokenModel ? tokenModel.userName : "admin"}</span>&nbsp;&nbsp;&nbsp;&nbsp;{tokenModel ? tokenModel.userInfo.userName : "管理员"}</div>
              <div>你好！祝你开心每一天！</div>
              <div className={indexStyles.userPhoneAndEmailDiv}>
                <div>{tokenModel ? tokenModel.userInfo.phoneNumber : "15555555555"}</div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div>{tokenModel ? tokenModel.userInfo.email : "test@test.com"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={indexStyles.headerADiv}>
          <div className={indexStyles.userCountBlock}>
            <div style={{float: "right"}} onClick={() => onShowDetail("online")} className={indexStyles.fontWeightHover}>
              <Tooltip title={"查看登录用户"}>
                <Icon type="user" style={{fontSize: "16px", marginRight: "20px"}} />
              </Tooltip>
            </div>
          </div>
          <div style={{padding: '0px 20px 20px 0px'}}>
            <Row gutter={20}>
              <Col span={8}>
                <Card style={{textAlign: "center"}} className={styles.userVisitTotalDiv}>
                  <Statistic title="总访问量"
                             value={userCounts ? userCounts.userCount : 11.28}
                             precision={2}
                             valueStyle={{color: '#3f8600'}}
                             prefix={<Icon type="global" style={{marginRight: "10px"}} />}
                             suffix="人"/>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{textAlign: "center"}} className={styles.userOnlineDiv}>
                  <Statistic title="在线人数"
                             value={userCounts ? userCounts.onlineCount : 9.3}
                             precision={2}
                             valueStyle={{color: '#cf1322'}}
                             prefix={<Icon type="laptop" style={{marginRight: "10px"}} />}
                             suffix="人"/>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{textAlign: "center"}} className={styles.userVisitLastDiv}>
                  <Statistic title="最近一个月内访问量"
                             value={userCounts ? userCounts.userCount : 11.28}
                             precision={2}
                             valueStyle={{color: '#3f8600'}}
                             prefix={<Icon type="robot" style={{marginRight: "10px"}} />}
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