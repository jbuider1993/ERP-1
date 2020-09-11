import React from 'react';
import styles from './Online.less';
import {Table, Icon, Tag, Popconfirm} from 'antd';
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';

const OnlineList = (props) => {

  const { onlineList, onlineLoading, onView, onEdit, onDelete, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '登录账号', dataIndex: 'loginName', key: 'loginName', width: '12%' },
    { title: '登录主机', dataIndex: 'loginIp', key: 'loginIp', width: '10%' },
    { title: '登录地点', dataIndex: 'loginAddress', key: 'loginAddress', width: '10%' },
    { title: '浏览器', dataIndex: 'usedBrowser', key: 'usedBrowser', width: '10%' },
    { title: '操作系统', dataIndex: 'usedWindow', key: 'usedWindow', width: '10%' },
    { title: '登录状态', dataIndex: 'online', key: 'online', width: '8%',
      render: (text, record, index) => text == true ?
        <Tag color="blue"><span>&nbsp;</span>{"在线"}<span>&nbsp;</span></Tag> :
        <Tag color="red"><span>&nbsp;</span>{"下线"}<span>&nbsp;</span></Tag> },
    { title: '登录时间', dataIndex: 'loginTime', key: 'loginTime', width: '14%',
      render: (text, record, index) => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span> },
    { title: '最后访问时间', dataIndex: 'lastTime', key: 'lastTime', width: '14%',
      render: (text, record, index) => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span> },
    { title: '操作', key: 'operate', width: '10%',
      render: (text, record) => (
      <span>
        <Popconfirm title="确定删除当前记录？" onConfirm={onDelete.bind(null, record)}>
          <i className="ri-delete-bin-7-line" style={{color: 'red'}}></i>
        </Popconfirm>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a onClick={() => onView(record)}><i className="ri-file-text-line"></i></a>
      </span>)
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
        scroll={{y: (window.innerHeight - 215)}}
      />
    </div>
  );
};

export default OnlineList;
