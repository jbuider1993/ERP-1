import React from 'react';
import styles from './Dictionary.less';
import {Popconfirm, Table} from 'antd';
import TablePagination from "../../common/TablePagination";
import moment from 'moment';
import 'remixicon/fonts/remixicon.css';

class DictionaryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowSubTable: false
    }
  }

  render() {

    const { dictionaryList, dictionaryLoading, rowSelection, onView, onEdit, onDelete, currentPage, pageSize, total,
      onPageChange, onShowSizeChange, showTotal, onShowDictionarySub } = this.props;
    const {isShowSubTable} = this.state;

    const columns = [
      { title: '序号', width: '6%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
      { title: '字典名称', dataIndex: 'dictName', key: 'dictName', width: '20%' },
      { title: '字典编码', dataIndex: 'dictCode', key: 'dictCode', width: '20%' },
      { title: '状态', dataIndex: 'status', key: 'status', width: '10%', filters: [
          { text: '126', value: '126' },{ text: '163', value: '163' },{ text: 'qq', value: 'qq' },{ text: 'gmail', value: 'gmail' }],
        onFilter: (value, record) => record.email.indexOf(value) === 0 },
      { title: '备注', dataIndex: 'description', key: 'description', width: '25%' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%',
        render: (text, record, index) => <span>{text ? moment(text).format("YYYY-MM-DD") : null}</span> },
      { title: '操作', key: 'operate', width: '10%',
        render: (text, record) => (
          <span>
          <a onClick={() => onEdit(record)}><i className={"ri-edit-line"} style={{color: '#08c'}}/></a>
        </span>)
      }
    ];

    const onRow = (record, index) => {
      return {
        onClick: () => {
          onShowDictionarySub(record);
          this.setState({isShowSubTable: !isShowSubTable});
        }
      };
    };

    const tablePaginationProps = {
      total,
      currentPage,
      pageSize,
      onPageChange,
      onShowSizeChange,
      showTotal
    };

    return (
      <div style={{marginTop: "15px"}}>
        <Table
          bordered
          className={ styles.listTable }
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dictionaryList}
          pagination={false}
          scroll={{ y: 500 }}
          loading={dictionaryLoading}
          rowKey={record => record.id}
          onRow={(record, index) => onRow(record, index)}
        />
        <TablePagination {...tablePaginationProps} />
      </div>)
  }
}

export default DictionaryList;
