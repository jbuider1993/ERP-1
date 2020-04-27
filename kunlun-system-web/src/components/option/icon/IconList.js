import React from 'react';
import {Table, Icon, Modal} from 'antd';
import config from '../../../config/config';
import styles from './Icon.less';
import 'remixicon/fonts/remixicon.css';

const IconList = (props) => {

  const { iconList, onViewIcon, currentPage, pageSize } = props;

  const columns = [
    {title: '序号', key: 'name', width: '15%', render: (text, record, index) => (index + 1) + (currentPage - 1) * pageSize, align: "center" },
    {title: '图标名称', dataIndex: 'name', key: 'name', width: '25%', align: "center" },
    {title: '图标key', dataIndex: 'key', key: 'key', width: '25%', align: "center" },
    {title: '图标', key: 'key', align: "center", render: (text, record, index) => <i className={record.key} style={{fontSize: "25px"}}/> },
    {title: '操作', key: 'key', align: "center",
      render: (text, record, index) => <div onClick={() => onViewIcon(record)}>
        <i className="ri-file-text-line" style={{ fontSize: "18px", color: "blue" }}></i>
    </div>
    }];

  return (
    <div className={styles.menuTable}>
      <Table
        columns={columns}
        dataSource={iconList}
        bordered
        rowKey={record => record.id}
        pagination={false}
        scroll={{ y: 550 }}
      />
    </div>
  );
};

export default IconList;
