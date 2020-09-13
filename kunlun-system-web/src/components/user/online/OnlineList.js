import React from 'react';
import styles from './Online.less';
import {Table, Tooltip, Tag, Popconfirm} from 'antd';
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';

const OnlineList = (props) => {

  const { onlineList, onlineLoading, onDelete, currentPage, pageSize, rowSelection, isExpandSearch } = props;

  const columns = [
    { title: '序号', width: '6%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '登录账号', dataIndex: 'loginName', key: 'loginName', width: '12%' },
    { title: '登录主机', dataIndex: 'loginIp', key: 'loginIp', width: '10%' },
    { title: '登录地点', dataIndex: 'loginAddress', key: 'loginAddress', width: '10%' },
    { title: '浏览器', dataIndex: 'usedBrowser', key: 'usedBrowser', width: '10%' },
    { title: '操作系统', dataIndex: 'usedWindow', key: 'usedWindow', width: '10%' },
    { title: '登录状态', dataIndex: 'online', key: 'online', width: '8%',
      render: (text, record, index) => text == true ?
        <Tag color={"#63e52c"}><span>&nbsp;</span>{"在线"}<span>&nbsp;</span></Tag> :
        <Tag color={"#8abdf1"}><span>&nbsp;</span>{"下线"}<span>&nbsp;</span></Tag> },
    { title: '登录时间', dataIndex: 'loginTime', key: 'loginTime', width: '14%',
      render: (text, record, index) => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span> },
    { title: '最后访问时间', dataIndex: 'lastTime', key: 'lastTime', width: '14%',
      render: (text, record, index) => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span> },
    { title: '操作', key: 'operate', width: '10%',
      render: (text, record) => (
        <Popconfirm title="确定强制下线当前用户？" onConfirm={onDelete.bind(null, record)}>
          <Tooltip title={"强制下线"}>
            <a><i className="ri-cloud-off-fill" style={{color: 'red', fontSize: "16px"}}></i></a>
          </Tooltip>
        </Popconfirm>)
  }];

  return (
    <div className={ styles.listTable }>
      <Table
        bordered
        size={"small"}
        tableLayout={"auto"}
        columns={columns}
        dataSource={onlineList}
        pagination={false}
        loading={onlineLoading}
        rowKey={record => record.id}
        rowSelection={rowSelection}
        scroll={{y: (window.innerHeight - (isExpandSearch ? 225 : 272))}}
      />
    </div>
  );
};

export default OnlineList;
