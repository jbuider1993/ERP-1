import React from 'react';
import { Table, Popconfirm, Icon, Tag } from 'antd';
import config from '../../../config/config';
import styles from './Machine.less';

const MachineList = (props) => {

  const { machineLoading, machineList, onEditMenu, onDelete } = props;

  const columns = [
    { title: '', key: '', width: '1.5%', align: "center" },
    { title: '序号', key: '', width: '5%',
      render: (text, record, index) => (index + 1) * config.PAGE_SIZE, align: "center" },
    { title: '菜单名称', dataIndex: 'name', key: 'name', width: '20%', align: "center",
      render: (text, record, index) => {
        const longCodes = record.longCode.split("_");
        let sum = 0;
        for (let i = 0; i < longCodes.length - 1; i++) {
          sum += 15 + i;
        }
        return <span style={{ marginLeft: sum + "%" }}>{text}</span>;
      }
    },
    { title: '菜单key', dataIndex: 'key', key: 'key', width: '15%', align: "center" },
    { title: '访问路径', dataIndex: 'url', key: 'url', width: '15%',
      sorter: (x, y) => x.age - y.age, align: "center" },
    { title: '级别', dataIndex: 'level', key: 'level', width: '8%', align: "center",
      render: (text, record, index) => <span>{text == "1" ?
        <Tag style={{ borderRadius: "20px" }} color="blue">{"菜单"}</Tag> :
        <Tag style={{ borderRadius: "20px" }} color="purple">{"目录"}</Tag>}</span> },
    { title: '是否禁用', dataIndex: 'forbid', key: 'forbid', width: '8%', align: "center",
      render: (text, record, index) => text == true ? <Tag color="#f50">{"禁用"}</Tag> : <Tag color="#87d068">{"显示"}</Tag> },
    { title: '图标', dataIndex: 'icon', key: 'icon', width: '8%', align: "center",
      render: (text, record, index) => <Icon type={text} className="certain-category-icon" /> },
    { title: '操作', key: 'operate', width: '8%', render: (text, record, index) => (
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
