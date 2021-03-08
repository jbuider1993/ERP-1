import React from 'react';
import styles from './User.less';
import {Table, Tag, Tooltip, Popconfirm} from 'antd';
import 'remixicon/fonts/remixicon.css';

const UserList = (props) => {

  const { userList, userLoading, rowSelection, onEdit, onDelete, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '6.5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '用户名', dataIndex: 'userName', key: 'userName', width: '15%' },
    { title: '密码', dataIndex: 'password', key: 'password', width: '15%' },
    { title: '性别', dataIndex: 'sex', key: 'sex', width: '10%' },
    { title: '电话号码', dataIndex: 'phoneNumber', key: 'phoneNumber', width: '15%', sorter: (x, y) => x.phoneNumber - y.phoneNumber },
    { title: '邮箱', dataIndex: 'email', key: 'email', width: '20%', filters: [
      { text: '126', value: '126' },{ text: '163', value: '163' },{ text: 'qq', value: 'qq' },{ text: 'gmail', value: 'gmail' }],
      onFilter: (value, record) => record.email.indexOf(value) === 0 },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%',
      render: (text, record, index) => <span>{text}</span> },
    { title: '操作', key: 'operate', width: '10%',
      render: (text, record) => (
      <span style={{padding: "0px 5px 0px 5px"}}>
        <Tooltip title={"编辑用户"}>
          <a onClick={() => onEdit(record)}>
            <i className="ri-edit-box-fill" style={{color: '#08c', fontSize: "16px"}}></i>
          </a>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;
        <Popconfirm title="确定删除当前记录？" onConfirm={onDelete.bind(null, record)}>
          <Tooltip title={"删除用户"}>
            <a><i className="ri-delete-bin-2-fill" style={{color: 'red', fontSize: "16px"}}></i></a>
          </Tooltip>
        </Popconfirm>
      </span>)
  }];

  return (
    <div className={ styles.listTable }>
      <Table
        bordered
        tableLayout={"auto"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={userList}
        pagination={false}
        loading={userLoading}
        rowKey={record => record.id}
        scroll={{y: (window.innerHeight - 230)}}
      />
    </div>
  );
};

export default UserList;
