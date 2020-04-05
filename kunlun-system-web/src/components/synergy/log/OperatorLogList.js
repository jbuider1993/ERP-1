import React from 'react';
import styles from './OperatorLog.less';
import {Table, Icon, Tooltip, Tag } from 'antd';
import moment from 'moment';

const OperatorLogList = (props) => {

  const { logList, logLoading, rowSelection, onView, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '登录IP', dataIndex: 'ip', key: 'ip', width: '10%' },
    { title: '登录用户', dataIndex: 'userName', key: 'userName', width: '10%' },
    { title: '操作描述', dataIndex: 'operateDescription', key: 'operateDescription', width: '10%' },
    { title: '访问服务', dataIndex: 'serviceName', key: 'serviceName', width: '10%' },
    { title: '调用方法', dataIndex: 'methodName', key: 'methodName', width: '10%' },
    { title: '运行线程', dataIndex: 'threadName', key: 'threadName', width: '15%' },
    { title: '操作时间', dataIndex: 'operateTime', key: 'operateTime', width: '10%', sorter: (x, y) => x.operateTime - y.operateTime,
      render: (text, record, index) => <span>{text ? moment(text).format("YYYY-MM-DD") : ""}</span> },
    { title: '访问状态', dataIndex: 'status', key: 'status', width: '10%', render: (text, record, index) => text == "正常" ?
        <Tag color="blue"><span>&nbsp;</span>{text}<span>&nbsp;</span></Tag> :
        <Tag color="red"><span>&nbsp;</span>{text}<span>&nbsp;</span></Tag> },
    { title: '操作', key: 'operate',
      render: (text, record) => (
      <span style={{cursor: "pointer"}}>
        <Tooltip title={"查看日志详情"}>
          <span onClick={() => onView(record)}><Icon type="snippets" /></span>
        </Tooltip>
      </span>)
  }];

  return (
    <div className={ styles.listTable }>
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={logList}
        pagination={false}
        loading={logLoading}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default OperatorLogList;
