import React from 'react';
import { Modal, Form, Row, Col, Transfer } from 'antd';
import styles from './Role.less';


class UserAllotTransfer extends React.Component {

  state = {
    targetDatas: [],
    targetKeys: [],
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.generateDatas(nextProps);
  }

  generateDatas = (nextProps) => {
    const {roleInfoData, userList} = nextProps;
    const targetKeys = [];
    const targetDatas = [];
    for (let i = 0; i < userList.length; i++) {
      const item = userList[i];
      const data = {
        key: item.id,
        title: item.userName,
        description: item.userName,
        chosen: roleInfoData && roleInfoData.userIds ? roleInfoData.userIds.indexOf(item.id) > -1 : false,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      targetDatas.push(data);
    }
    this.setState({ targetDatas, targetKeys });
  };

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    this.setState({targetKeys});
  };

  render() {

    const {userAllotTransferVisible, roleInfoData, onCancel, onAllotUser} = this.props;
    const { targetDatas, targetKeys } = this.state;

    return (
      <div>
        <Modal
          centered={true}
          visible={userAllotTransferVisible}
          title={(roleInfoData && roleInfoData.roleName ? roleInfoData.roleName + "_" : "") + "分配用户"}
          onCancel={onCancel}
          onOk={() => onAllotUser(targetKeys)}
          width={550}
          destroyOnClose={false}
          bodyStyle={{height: "430px"}}
        >
          <Transfer
            listStyle={{height: "385px", width: "280px"}}
            titles={["全部用户", "权限用户"]}
            dataSource={targetDatas}
            showSearch
            filterOption={this.filterOption}
            targetKeys={targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </Modal>
      </div>
    );
  };
}

export default UserAllotTransfer;
