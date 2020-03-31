import React from 'react';
import styles from './Dictionary.less';
import {Table, Icon, Tag, Popconfirm} from 'antd';

class DictionaryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowSubTable: false
    }
  }

  render() {

    const { dictionaryList, dictionaryLoading, rowSelection, onView, onEdit, onDelete, currentPage, pageSize } = this.props;
    const {isShowSubTable} = this.state;

    const columns = [
      { title: '序号', width: '5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
      { title: '字典名称', dataIndex: 'name', key: 'name', width: '20%' },
      { title: '字典编码', dataIndex: 'code', key: 'code', width: '20%' },
      { title: '状态', dataIndex: 'status', key: 'status', width: '10%', filters: [
          { text: '126', value: '126' },{ text: '163', value: '163' },{ text: 'qq', value: 'qq' },{ text: 'gmail', value: 'gmail' }],
        onFilter: (value, record) => record.email.indexOf(value) === 0 },
      { title: '备注', dataIndex: 'remark', key: 'remark', width: '20%' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%',
        render: (text, record, index) => <span>{text ? text.substr(0, text.indexOf("T")) : null}</span> },
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
      }];

    const subCcolumns = [
      { title: '序号', width: '5%', render: (text, record, index) => <span>{(index + 1) + (currentPage - 1) * pageSize}</span> },
      { title: '编码', dataIndex: 'code', key: 'code', width: '25%' },
      { title: '字典值', dataIndex: 'name', key: 'name', width: '25%' },
      { title: '备注', dataIndex: 'remark', key: 'remark', width: '30%' },
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
      }];

    const onRowClick = (record, index) => {
      this.setState({isShowSubTable: !isShowSubTable});
    };

    return (
      <div style={{marginTop: "15px"}}>
        <div className={ styles.listTable }>
          <Table
            bordered
            size={"small"}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dictionaryList}
            pagination={false}
            loading={dictionaryLoading}
            rowKey={record => record.id}
            onRowClick={onRowClick}
          />
        </div>
        <div className={ styles.listTable } style={{marginTop: "15%", display: isShowSubTable ? "block" : "none"}}>
          <Table
            bordered
            size={"small"}
            rowSelection={rowSelection}
            columns={subCcolumns}
            dataSource={dictionaryList}
            pagination={false}
            loading={dictionaryLoading}
            rowKey={record => record.id}
          />
        </div>
      </div>)
  }
}

export default DictionaryList;
