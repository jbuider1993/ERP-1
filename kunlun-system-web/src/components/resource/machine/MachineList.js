import React from 'react';
import { Table, Popconfirm, Icon, Tag } from 'antd';
import config from '../../../config/config';
import styles from './Machine.less';

const MachineList = (props) => {

  const { machineLoading, machineList, onEditMenu, onDelete } = props;

  const columns = [
    { title: '序号', key: '', width: '5%',
      render: (text, record, index) => (index + 1) * config.PAGE_SIZE, align: "center" },
    { title: '虚拟机名称', dataIndex: 'machineName', key: 'machineName', width: '10%', align: "center" },
    { title: '主机IP', dataIndex: 'machineIp', key: 'machineIp', width: '10%', align: "center" },
    { title: '虚拟IP', dataIndex: 'virtualIp', key: 'virtualIp', width: '10%', align: "center" },
    { title: '总CPU', dataIndex: 'totalCPU', key: 'totalCPU', width: '10%', align: "center", sorter: (x, y) => x.totalCPU - y.totalCPU },
    { title: '总内存', dataIndex: 'totalMomery', key: 'totalMomery', width: '10%', align: "center", sorter: (x, y) => x.totalMomery - y.totalMomery },
    { title: '已使用CPU', dataIndex: 'usedCPU', key: 'usedCPU', width: '10%', align: "center", sorter: (x, y) => x.usedCPU - y.usedCPU },
    { title: '已使用内存', dataIndex: 'usedMomery', key: 'usedMomery', width: '10%', align: "center", sorter: (x, y) => x.usedMomery - y.usedMomery },
    { title: '是否停机', dataIndex: 'stopFlag', key: 'stopFlag', width: '10%', align: "center",
      render: (text, record, index) => text == true ? <Tag color="#f50">{"禁用"}</Tag> : <Tag color="#87d068">{"显示"}</Tag> },
    { title: '操作', key: 'operate', width: '10%', render: (text, record, index) => (
      <span>
        <a onClick={() => onEditMenu(record)}><Icon type="edit" style={{color: '#08c'}}/></a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Popconfirm title="确定删除当前记录？" onConfirm={onDelete.bind(null, record)}>
          <Icon type="delete" style={{color: 'red'}}/>
        </Popconfirm>
      </span>), align: "center"
    }];

  return (
    <div className={ styles.menuTable }>
      <Table
        size={"small"}
        columns={columns}
        dataSource={machineList}
        bordered={true}
        loading={machineLoading}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default MachineList;
