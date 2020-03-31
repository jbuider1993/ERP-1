import React from 'react';
import {Table, Icon, Modal} from 'antd';
import config from '../../../config/config';
import styles from './Icon.less';

const IconList = (props) => {

  const { iconListLoading, iconList, onViewIcon, currentPage, pageSize } = props;

  const columns = [
    {title: '序号', key: 'name', width: '15%', render: (text, record, index) => (index + 1) + (currentPage - 1) * pageSize, align: "center" },
    {title: '图标名称', dataIndex: 'name', key: 'name', width: '25%', align: "center" },
    {title: '图标key', dataIndex: 'key', key: 'key', width: '25%', align: "center" },
    {title: '图标', key: 'key', align: "center", render: (text, record, index) => <Icon type={record.key} className="certain-category-icon"/> },
    {title: '操作', key: 'key', align: "center",
      render: (text, record, index) => <div onClick={() => onViewIcon(record)}><Icon type={"form"} style={{ fontSize: "15px", color: "blue" }} className="certain-category-icon" /></div>
    }];

  return (
    <div className={styles.menuTable}>
      <Table
        size={"small"}
        columns={columns}
        dataSource={iconList}
        bordered
        loading={iconListLoading}
        rowKey={record => record.id}
        pagination={false}
      />
    </div>
  );
};

export default IconList;
