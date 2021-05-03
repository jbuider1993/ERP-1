import React from 'react';
import styles from './CorrelateAuthorize.less';
import {Table, Tag, Tooltip, Popconfirm} from 'antd';
import 'remixicon/fonts/remixicon.css';
import moment from 'moment';
import config from "@/config/config";

const CorrelateAuthorizeList = (props) => {

  const { departmentList, departmentLoading, rowSelection, onEdit, onDelete, currentPage, pageSize } = props;

  const columns = [
    { title: '部门名称', dataIndex: 'departmentName', key: 'departmentName', width: '20%',
      render: (text, record, index) => {
        const longCodes = record.longCode.split("_");
        let sum = 0;
        for (let i = 0; i < longCodes.length - 1; i++) {
          sum += 5 + i;
        }
        return <span style={{ marginLeft: sum + "%" }}>{text}</span>;
      }
    },
    { title: '序号', width: '6%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
    { title: '部门编号', dataIndex: 'departmentCode', key: 'departmentCode', width: '10%' },
    { title: '部门类型', dataIndex: 'type', key: 'type', width: '10%', render: (text, record, index) => config.DEPARTMENT_TYPE.find(item => item.key == text).name },
    { title: '状态', dataIndex: 'status', key: 'status', width: '6.5%', render: (text, record, index) => config.DEPARTMENT_STATUS.find(item => item.key == text).name },
    { title: '职责描述', dataIndex: 'dutyDesc', key: 'dutyDesc', width: '25%' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '10%',
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
        dataSource={departmentList}
        pagination={false}
        loading={departmentLoading}
        rowKey={record => record.id}
        scroll={{y: (window.innerHeight - 230)}}
      />
    </div>
  );
};

export default CorrelateAuthorizeList;
