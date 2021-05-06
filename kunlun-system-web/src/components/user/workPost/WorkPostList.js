import React from 'react';
import styles from './WorkPost.less';
import {Table, Tag, Tooltip} from 'antd';
import 'remixicon/fonts/remixicon.css';
import config from "@/config/config";
import moment from 'moment';

const WorkPostList = (props) => {

  const { workPostList, workPostLoading, rowSelection, onEdit, onDelete, currentPage, pageSize } = props;

  const columns = [
    { title: '序号', width: '6.5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '岗位名称', dataIndex: 'postName', key: 'postName', width: '20%' },
    { title: '岗位编号', dataIndex: 'postCode', key: 'postCode', width: '10%' },
    { title: '状态', dataIndex: 'status', key: 'status', width: '6.5%', render: (text, record, index) => config.DEPARTMENT_STATUS.find(item => item.key == text).name },
    { title: '职责描述', dataIndex: 'dutyDesc', key: 'dutyDesc', width: '30%' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%',
      render: (text, record, index) => {
        const createTime = text ? text.replace("T", " ") : "";
        const result = moment(createTime).format("YYYY-MM-DD");
        return <span>{result}</span>;
      }
    },
    { title: '操作', key: 'operate',
      render: (text, record) => (
      <span style={{padding: "0px 5px 0px 5px"}}>
        <Tooltip title={"编辑用户"}>
          <a onClick={() => onEdit(record)}>
            <i className="ri-edit-box-fill" style={{color: '#08c', fontSize: "16px"}}></i>
          </a>
        </Tooltip>
      </span>)
  }]

  return (
    <div className={ styles.listTable }>
      <Table
        bordered
        tableLayout={"auto"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={workPostList}
        pagination={false}
        loading={workPostLoading}
        rowKey={record => record.id}
        scroll={{y: (window.innerHeight - 230)}}
      />
    </div>
  );
}

export default WorkPostList;
