import React from 'react';
import { Modal, Transfer } from 'antd';
import styles from './CorrelateAuthorize.less';

class UserAllotTransfer extends React.Component {

  state = {
    targetDatas: [],
    targetKeys: [],
  }

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    this.setState({targetKeys});
  }

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
          bodyStyle={{height: "420px"}}
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
