import React from 'react';
import { Table, Popconfirm, Icon, Tag } from 'antd';
import config from '../../../config/config';
import styles from './Machine.less';

const MachineList = (props) => {

  const { machineLoading, machineList, onEditMenu, onDelete } = props;

  const columns = [
    { title: '序号', key: '', width: '5%',
      render: (text, record, index) => (index + 1) * config.LIMIT_SIZE, align: "center" },
    { title: '虚拟机名', dataIndex: 'machineName', key: 'machineName', width: '10%', align: "center" },
    { title: '主机IP', dataIndex: 'machineIp', key: 'machineIp', width: '10%', align: "center" },
    { title: 'CPU', dataIndex: 'totalCPU', key: 'totalCPU', width: '10%', align: "center", sorter: (x, y) => x.totalCPU - y.totalCPU },
    { title: '内存', dataIndex: 'totalMomery', key: 'totalMomery', width: '10%', align: "center", sorter: (x, y) => x.totalMomery - y.totalMomery },
    { title: '磁盘', dataIndex: 'totalMomery', key: 'totalMomery', width: '10%', align: "center", sorter: (x, y) => x.totalMomery - y.totalMomery },
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
