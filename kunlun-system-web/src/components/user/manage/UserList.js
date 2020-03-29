import React from 'react';
import styles from './User.less';
import {Table, Icon, Tag, Popconfirm} from 'antd';

const UserList = (props) => {

  const { userList, userLoading, rowSelection, onView, onEdit, onDelete, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '姓名', dataIndex: 'userName', key: 'userName', width: '15%' },
    { title: '密码', dataIndex: 'password', key: 'password', width: '15%' },
    { title: '电话号码', dataIndex: 'phoneNumber', key: 'phoneNumber', width: '15%', sorter: (x, y) => x.phoneNumber - y.phoneNumber },
    { title: '邮箱', dataIndex: 'email', key: 'email', width: '20%', filters: [
      { text: '126', value: '126' },{ text: '163', value: '163' },{ text: 'qq', value: 'qq' },{ text: 'gmail', value: 'gmail' }],
      onFilter: (value, record) => record.email.indexOf(value) === 0 },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%',
      render: (text, record, index) => <span>{text.substr(0, text.indexOf("T"))}</span> },
    { title: '操作', key: 'operate', width: '10%',
      render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record)}><Icon type="edit" style={{color: '#08c'}}/></a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Popconfirm title="确定删除当前记录？" onConfirm={onDelete.bind(null, record)}>
          <Icon type="delete" style={{color: 'red'}}/>
        </Popconfirm>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a onClick={() => onView(record)}><Icon type="snippets" /></a>
      </span>)
  }];

  return (
    <div className={ styles.listTable }>
      <Table
        bordered
        size={"small"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={userList}
        pagination={false}
        loading={userLoading}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default UserList;
