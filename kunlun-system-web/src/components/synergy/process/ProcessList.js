import React from 'react';
import styles from './Process.less';
import {Table, Icon, Tag, Popconfirm, Switch, Tooltip } from 'antd';
import moment from 'moment';
import config from '../../../config/config';

const ProcessList = (props) => {

  const { processList, processLoading, rowSelection, onView, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '模型名称', dataIndex: 'modelName', key: 'modelName', width: '15%' },
    { title: '启动节点', dataIndex: 'currentExecuteName', key: 'currentExecuteName', width: '15%' },
    { title: '审核节点', dataIndex: 'nextExecuteName', key: 'nextExecuteName', width: '15%' },
    { title: '流程状态', dataIndex: 'processStatus', key: 'processStatus', width: '10%',
      render: (text, record, index) => {
        const status = config.PROCESS_STATUS.filter(item => item.key == text);
        return (<Tag color={text ? "#87d068" : "#f50"}>{status[0].name}</Tag>);
    }
    },
    { title: '启动时间', dataIndex: 'startTime', key: 'startTime', width: '15%', sorter: (x, y) => x.startTime - y.startTime,
      render: (text, record, index) => <span>{text ? moment(text).format("YYYY-MM-DD") : ""}</span> },
    { title: '完成时间', dataIndex: 'endTime', key: 'endTime', width: '15%', sorter: (x, y) => x.endTime - y.endTime,
      render: (text, record, index) => <span>{text ? moment(text).format("YYYY-MM-DD") : ""}</span> },
    { title: '操作', key: 'operate', width: '10%',
      render: (text, record) => (
      <span style={{cursor: "pointer"}}>
        <Tooltip title={"查看流程详情"}>
          <span onClick={() => onView(record)}><Icon type="snippets" /></span>
        </Tooltip>
      </span>)
  }];

  return (
    <div className={ styles.listTable }>
      <Table
        bordered
        size={"small"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={processList}
        pagination={false}
        loading={processLoading}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default ProcessList;
