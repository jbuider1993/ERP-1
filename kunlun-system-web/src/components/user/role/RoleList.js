import React from 'react';
import styles from './Role.less';
import {Table, Icon, Tag, Popconfirm, Switch, Tooltip} from 'antd';
import 'remixicon/fonts/remixicon.css';

const RoleList = (props) => {

  const { roleList, roleLoading, rowSelection, onView, onEdit, onMenuLimit, onDataLimit, onAllotUser, onDelete, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '10%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '角色名称', dataIndex: 'roleName', key: 'roleName', width: '20%' },
    { title: '权限字符', dataIndex: 'roleWord', key: 'roleWord', width: '20%' },
    { title: '是否启用', dataIndex: 'status', key: 'status', width: '10%',
      render: (text, record, index) => record && record.status ? <Tag color={"#63e52c"} style={{padding: "0px 10px 0px 10px"}}>是</Tag> : <Tag color={"#8abdf1"} style={{padding: "0px 10px 0px 10px"}}>否</Tag>
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%', sorter: (x, y) => x.createTime - y.createTime,
      render: (text, record, index) => <span>{text.substr(0, text.indexOf("T"))}</span> },
    { title: '操作', key: 'operate', width: '20%',
      render: (text, record) => (
      <span>
        <Tooltip title={"编辑"}>
          <a onClick={() => onEdit(record)}>
            <i className="ri-edit-box-fill" style={{color: '#64abf3', fontSize: "17px"}}></i>
          </a>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Tooltip title={"菜单权限"}>
          <a onClick={() => onMenuLimit(record)}>
            <i className="ri-windows-line" style={{color: '#F95E5A', fontSize: "17px"}}></i>
          </a>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Tooltip title={"数据权限"}>
          <a onClick={() => onDataLimit(record)}>
            <i className="ri-database-fill" style={{color: '#4BD863', fontSize: "17px"}}></i>
          </a>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Tooltip title={"分配用户"}>
          <a onClick={() => onAllotUser(record)}>
            <i className="ri-team-fill" style={{color: '#FE9400', fontSize: "17px"}}></i>
          </a>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Tooltip title={"查看详情"}>
          <a onClick={() => onView(record)}>
            <i className="ri-file-text-fill" style={{color: '#13C2C2', fontSize: "17px"}}></i>
          </a>
        </Tooltip>
      </span>)
  }];

  return (
    <div className={ styles.listTable }>
      <Table
        bordered
        size={"small"}
        tableLayout={"auto"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={roleList}
        pagination={false}
        loading={roleLoading}
        rowKey={record => record.id}
        scroll={{y: (window.innerHeight - 230)}}
      />
    </div>
  );
};

export default RoleList;
