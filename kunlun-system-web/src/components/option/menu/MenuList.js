import React from 'react';
import { Table, Popconfirm, Tag } from 'antd';
import config from '../../../config/config';
import styles from './Menu.less';
import 'remixicon/fonts/remixicon.css';

const MenuList = (props) => {

  const { menuListLoading, menuList, onDelete, unfoldCollapseKeys, onExpandMenuList, onEditMenu, currentPage, pageSize } = props;

  const columns = [
    { title: '', key: '', width: '1.5%', align: "center" },
    { title: '序号', key: '', width: '5%',
      render: (text, record, index) => (index + 1) + (currentPage - 1) * pageSize, align: "center" },
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
      render: (text, record, index) => <span>{
        <Tag style={{ borderRadius: "20px" }} color={text == "1" ? "blue" : "purple"}>{text == "1" ? "菜单" : "目录"}</Tag>}</span> },
    { title: '是否禁用', dataIndex: 'forbid', key: 'forbid', width: '8%', align: "center",
      render: (text, record, index) => text == true ? <Tag color="#f50">{"禁用"}</Tag> : <Tag color="#87d068">{"显示"}</Tag> },
    { title: '图标', dataIndex: 'icon', key: 'icon', width: '8%', align: "center",
      render: (text, record, index) => <i className="certain-category-icon" /> },
    { title: '操作', key: 'operate', width: '8%', render: (text, record, index) => (
      <span>
        <a onClick={() => onEditMenu(record)}>
          <i className="ri-edit-2-line" style={{color: '#08c'}}></i>
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Popconfirm title="确定删除当前记录？" onConfirm={onDelete.bind(null, record)}>
          <i className="ri-delete-bin-7-line" style={{color: 'red'}}></i>
        </Popconfirm>
      </span>), align: "center"
    }];

  return (
    <div className={ styles.menuTable }>
      <Table
        columns={columns}
        dataSource={menuList}
        bordered={true}
        loading={false}
        rowKey={record => record.id}
        onExpand={onExpandMenuList}
        pagination={false}
        expandedRowKeys={unfoldCollapseKeys}
      />
    </div>
  );
};

export default MenuList;
