import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Radio, Transfer } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

class UserAllotTransfer extends React.Component {

  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  render() {

    const {userAllotTransferVisible, operateType, onOk, onCancel} = this.props;

    return (
      <div>
        <Modal
          visible={userAllotTransferVisible}
          title={"分配用户"}
          onCancel={onCancel}
          onOk={onOk}
          width={500}
          destroyOnClose={false}
          bodyStyle={{height: "300px"}}
        >
          <Transfer
            titles={["全部用户", "权限用户"]}
            dataSource={this.state.mockData}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            render={item => item.title}
          />
        </Modal>
      </div>
    );
  };
}

export default UserAllotTransfer;
