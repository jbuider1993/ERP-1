import React from 'react';
import {Table, Icon, Modal} from 'antd';
import config from '../../../config/config';
import styles from './Menu.less';

class MenuIconModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIconRows: [],
      selectedIconRowKeys: [],
    }
  }

  render() {

    const {menuIconModalVisible, menuIconLoading, onCancel, menuIconList, onselectMenuIcon} = this.props;
    const {selectedIconRows, selectedIconRowKeys} = this.state;

    const rowSelection = {
      type: "radio",
      selectedIconRows,
      selectedIconRowKeys,
      onChange: (selectedIconRowKeys, selectedIconRows) => {
        this.setState({ selectedIconRowKeys, selectedIconRows });
      }
    };

    const onOk = () => {
      onselectMenuIcon(selectedIconRowKeys, selectedIconRows);
    };

    const columns = [
      {title: '序号', key: 'name', width: '15%', render: (text, record, index) => (index + 1) * config.PAGE_SIZE, align: "center" },
      {title: '图标名称', dataIndex: 'name', key: 'name', width: '25%'},
      {title: '图标key', dataIndex: 'key', key: 'key', width: '25%'},
      {title: '图标', key: 'key', align: "center", render: (text, record, index) => <Icon type={record.key} className="certain-category-icon"/> }];

    return (
      <div>
        <Modal
          visible={menuIconModalVisible}
          title={"选择图标"}
          onCancel={onCancel}
          onOk={onOk}
          width={650}
          destroyOnClose={true}
        >
          <Table
            className={styles.menuTable}
            rowSelection={rowSelection}
            size={"small"}
            columns={columns}
            dataSource={menuIconList}
            bordered
            loading={menuIconLoading}
            rowKey={record => record.id}
          />
        </Modal>
      </div>
    );
  };
}

export default MenuIconModal;
