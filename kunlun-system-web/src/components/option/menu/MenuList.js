import React from 'react';
import { Table, Popconfirm, Tag } from 'antd';
import config from '../../../config/config';
import styles from './Menu.less';
import 'remixicon/fonts/remixicon.css';

const MenuList = (props) => {

  const { menuList, onDelete, unfoldCollapseKeys, onExpandMenuList, onEditMenu, currentPage, pageSize } = props;

  const columns = [
    { title: '', key: '', width: '3%', align: "center" },
    { title: '菜单名称', dataIndex: 'name', key: 'name', width: '15%',
      render: (text, record, index) => {
        const longCodes = record.longCode.split("_");
        let sum = 0;
        for (let i = 0; i < longCodes.length - 1; i++) {
          sum += 15 + i;
        }
        return <span style={{ marginLeft: sum + "%" }}>{text}</span>;
      }
    },
    { title: '菜单key', dataIndex: 'key', key: 'key', width: '15%' },
    { title: '访问路径', dataIndex: 'url', key: 'url', width: '25%' },
    { title: '级别', dataIndex: 'level', key: 'level', width: '8%',
      render: (text, record, index) => <span>{
        <Tag style={{ borderRadius: "20px" }} color={record.children ? "blue" : "purple"}>{record.children ? "菜单" : "目录"}</Tag>}</span> },
    { title: '是否显示', dataIndex: 'show', key: 'show', width: '8%',
      render: (text, record, index) => text == true ? <Tag color="#f50">{"显示"}</Tag> : <Tag color="#87d068">{"隐藏"}</Tag> },
    { title: '图标', dataIndex: 'icon', key: 'icon', width: '8%',
      render: (text, record, index) => <i className={record.icon} style={{fontSize: "19px"}}/> },
    { title: '操作', key: 'operate', width: '8%', render: (text, record, index) => (
      <span>
        <a onClick={() => onEditMenu(record)}>
          <i className="ri-edit-2-line" style={{color: '#08c', fontSize: "18px"}}></i>
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Popconfirm title="确定删除当前记录？" onConfirm={onDelete.bind(null, record)}>
          <i className="ri-delete-bin-7-line" style={{color: 'red', fontSize: "18px"}}></i>
        </Popconfirm>
      </span>)
    }];

  return (
    <div className={styles.listTable}>
      <Table
        columns={columns}
        dataSource={menuList}
        bordered={true}
        rowKey={record => record.id}
        onExpand={onExpandMenuList}
        pagination={false}
        expandedRowKeys={unfoldCollapseKeys}
        scroll={{ y: 550 }}
      />
    </div>
  );
};

export default MenuList;
