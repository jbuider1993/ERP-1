import React from 'react';
import styles from './Model.less';
import {Table, Icon, Tag, Popconfirm, Switch, Tooltip } from 'antd';
import moment from 'moment';
import config from '../../../config/config';
import 'remixicon/fonts/remixicon.css';

const ModelList = (props) => {

  const { modelList, rowSelection, onEdit, onView, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '模型名称', dataIndex: 'modelName', key: 'modelName', width: '15%' },
    { title: '模型Key', dataIndex: 'modelKey', key: 'modelKey', width: '10%' },
    { title: '模型描述', dataIndex: 'metaInfo', key: 'metaInfo', width: '20%',
      render: (text, record, index) => JSON.parse(text).description },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%', sorter: (x, y) => x.createTime - y.createTime,
      render: (text, record, index) => <span>{text ? moment(text).format("YYYY-MM-DD") : null}</span> },
    { title: '部署时间', dataIndex: 'deployTime', key: 'deployTime', width: '15%', sorter: (x, y) => x.createTime - y.createTime,
      render: (text, record, index) => <span>{text ? moment(text).format("YYYY-MM-DD") : null}</span> },
    { title: '是否部署', dataIndex: 'deployStatus', key: 'deployStatus', width: '10%',
      render: (text, record, index) => <Tag color={text ? "#87d068" : "#f50"}>{text ? config.STATUS_FLAG[0].name : config.STATUS_FLAG[1].name}</Tag>},
    { title: '操作', key: 'operate', width: '10%',
      render: (text, record) => (
      <span style={{cursor: "pointer"}}>
        <Tooltip title={"编辑流程模型"}>
          <span onClick={() => onEdit(record)}>
            <i className="ri-edit-2-line" style={{color: '#08c', fontSize: "18px"}}></i>
          </span>
        </Tooltip>
        <Tooltip title={"查看流程详情"}>
          <span style={{marginLeft: "15px"}} onClick={() => onView(record)}>
            <i className="ri-file-text-line" style={{fontSize: "18px"}}></i>
          </span>
        </Tooltip>
      </span>)
  }];

  return (
    <div>
      <Table
        bordered
        className={ styles.listTable }
        rowSelection={rowSelection}
        columns={columns}
        dataSource={modelList}
        pagination={false}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default ModelList;
