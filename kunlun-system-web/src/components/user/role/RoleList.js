import React from 'react';
import styles from './Role.less';
import {Table, Icon, Tag, Popconfirm, Switch } from 'antd';

const RoleList = (props) => {

  const { roleList, roleLoading, rowSelection, onView, onEdit, onDelete, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '10%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '角色名称', dataIndex: 'roleName', key: 'roleName', width: '20%' },
    { title: '权限字符', dataIndex: 'roleWord', key: 'roleWord', width: '20%' },
    { title: '是否启用', dataIndex: 'status', key: 'status', width: '15%',
      render: () => (
        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
      )
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%', sorter: (x, y) => x.createTime - y.createTime,
      render: (text, record, index) => <span>{text.substr(0, text.indexOf("T"))}</span> },
    { title: '操作', key: 'operate', width: '15%',
      render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record)}><Icon type="edit" style={{color: '#08c'}}/></a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a onClick={() => onEdit(record)}><Icon type="windows" style={{color: '#08c'}}/></a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a onClick={() => onEdit(record)}><Icon type="team" style={{color: '#08c'}}/></a>
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
        dataSource={roleList}
        pagination={false}
        loading={roleLoading}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default RoleList;
