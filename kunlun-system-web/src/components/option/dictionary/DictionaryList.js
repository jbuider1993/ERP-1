import React from 'react';
import styles from './Dictionary.less';
import {Icon, Popconfirm, Table} from 'antd';
import TablePagination from "../../common/TablePagination";
import moment from 'moment';

class DictionaryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowSubTable: false
    }
  }

  render() {

    const { dictionaryList, dictionaryLoading, rowSelection, onView, onEdit, onDelete, currentPage, pageSize, total,
      onPageChange, onShowSizeChange, showTotal, onShowDictionarySub, dictionarySubLoading,
      dictionarySubList, dictSubCurrentPage, dictSubPageSize, dictSubTotal, } = this.props;
    const {isShowSubTable} = this.state;

    const columns = [
      { title: '序号', width: '6%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
      { title: '字典名称', dataIndex: 'dictName', key: 'dictName', width: '20%' },
      { title: '字典编码', dataIndex: 'dictCode', key: 'dictCode', width: '15%' },
      { title: '状态', dataIndex: 'status', key: 'status', width: '10%', filters: [
          { text: '126', value: '126' },{ text: '163', value: '163' },{ text: 'qq', value: 'qq' },{ text: 'gmail', value: 'gmail' }],
        onFilter: (value, record) => record.email.indexOf(value) === 0 },
      { title: '备注', dataIndex: 'description', key: 'description', width: '20%' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%',
        render: (text, record, index) => <span>{text ? moment(text).format("YYYY-MM-DD") : null}</span> },
      { title: '操作', key: 'operate', width: '10%',
        render: (text, record) => (
          <span>
          <a onClick={() => onEdit(record)}><Icon type="edit" style={{color: '#08c'}}/></a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm title="确定删除当前记录？" onConfirm={onDelete.bind(null, record)}>
            <Icon type="delete" style={{color: 'red'}}/>
          </Popconfirm>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a onClick={() => onView(record)}><Icon type="snippets" /></a>
        </span>)
      }
    ];

    const subCcolumns = [
      { title: '序号', width: '5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
      { title: '编码', dataIndex: 'dictSubCode', key: 'dictSubCode', width: '25%' },
      { title: '字典值', dataIndex: 'dictValue', key: 'dictValue', width: '25%' },
      { title: '备注', dataIndex: 'description', key: 'description', width: '30%' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%',
        render: (text, record, index) => <span>{text ? moment(text).format("YYYY-MM-DD") : null}</span> },
      { title: '操作', key: 'operate', width: '10%',
        render: (text, record) => (
          <span>
            <a onClick={() => onEdit(record)}><Icon type="edit" style={{color: '#08c'}}/></a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Popconfirm title="确定删除当前记录？" onConfirm={onDelete.bind(null, record)}>
              <Icon type="delete" style={{color: 'red'}}/>
            </Popconfirm>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a onClick={() => onView(record)}><Icon type="snippets" /></a>
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
        <div >
          <Table
            bordered
            className={ styles.listTable }
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dictionaryList}
            pagination={false}
            loading={dictionaryLoading}
            rowKey={record => record.id}
            onRow={(record, index) => onRow(record, index)}
          />
          <TablePagination {...tablePaginationProps} />
        </div>
        <div className={ styles.listTable } style={{marginTop: "15%", display: isShowSubTable ? "block" : "none"}}>
          <Table
            bordered
            rowSelection={rowSelection}
            columns={subCcolumns}
            dataSource={dictionarySubList}
            pagination={false}
            loading={dictionarySubLoading}
            rowKey={record => record.id}
          />
        </div>
      </div>)
  }
}

export default DictionaryList;
