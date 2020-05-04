import React from 'react';
import {Input, Spin, Drawer, Button, Table} from 'antd';
import styles from './Dictionary.less';
import 'remixicon/fonts/remixicon.css';

class DictionaryDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editedRowIndex: null,
      editedRecord: null
    };
  }

  formRef = React.createRef();

  render() {

    // 从传递过来的props中获取参数
    const {
      dictSubDrawerVisible, onClose, selectMenuLoading, rowDictSubSelection,
      dictionarySubLoading, dictionarySubList, dictSubCurrentPage, dictSubPageSize,
      dictSubTotal, showDictRow, onAdd,
    } = this.props;
    const {editedRowIndex, editedRecord} = this.state;
    const { getFieldsValue, validateFields, setFieldsValue, resetFields } = this.formRef;

    const onEdit = (record, index) => {
      this.setState({editedRowIndex: index, editedRecord: record});
    };

    const onCancelEdit = (record, index) => {
      this.setState({editedRowIndex: null, editedRecord: null});
    };

    const columns = [
      { title: '序号', width: '10%', render: (text, record, index) => <span>{(index + 1) + (dictSubCurrentPage - 1) * dictSubPageSize}</span> },
      { title: '编码', dataIndex: 'dictSubCode', key: 'dictSubCode', width: '20%',
        render: (text, record, index) => editedRowIndex == index ?
          <Input value={editedRecord && editedRecord.dictSubCode ? editedRecord.dictSubCode : null} style={{height: "30px"}}/> : <span>{text}</span> },
      { title: '字典值', dataIndex: 'dictValue', key: 'dictValue', width: '20%',
        render: (text, record, index) => editedRowIndex == index ?
          <Input value={editedRecord && editedRecord.dictValue ? editedRecord.dictValue : null} style={{height: "30px"}}/> : <span>{text}</span> },
      { title: '备注', dataIndex: 'description', key: 'description', width: '30%',
        render: (text, record, index) => editedRowIndex == index ?
          <Input value={editedRecord && editedRecord.description ? editedRecord.description : null} style={{height: "30px"}}/> : <span>{text}</span> },
      { title: '操作', key: 'operate', width: '15%',
        render: (text, record, index) => (
          <span>
            {
              editedRowIndex == index ?
                <span>
                  <a onClick={() => onEdit(record, index)}><i className={"ri-save-3-line"} style={{color: '#08c', fontSize: "18px"}}/></a>
                  <a onClick={() => onCancelEdit(record, index)}><i className={"ri-close-circle-line"} style={{color: '#08c', fontSize: "18px", marginLeft: "10px"}}/></a>
                </span> :
                <a onClick={() => onEdit(record, index)}><i className={"ri-edit-line"} style={{color: '#08c', fontSize: "18px"}}/></a>
            }
          </span>)
      }
    ];

    const onOk = () => {
      this.setState({ checkedTreeNodeKeys: [], expandedTreeNodeKeys: [] });
    };

    const iconStyle = {
      verticalAlign: "bottom",
      marginRight: "5px",
    };

    return (
      <div className={styles.drawerDiv}>
        <Spin spinning={dictionarySubLoading}>
          <Drawer
            title={(showDictRow ? showDictRow.dictName + "_" : "") + "字典字段值"}
            width={"55%"}
            placement="right"
            onClose={onClose}
            closable={true}
            destroyOnClose={true}
            visible={dictSubDrawerVisible}
            className={styles.menuDrawer}
          >
            <div style={{margin: "-5px 0px 15px 0px"}}>
              <Button type={"primary"} icon={<i className="ri-add-line" style={iconStyle}/>} onClick={onAdd}>新增</Button>
              <Button style={{marginLeft: "15px"}} icon={<i className="ri-delete-bin-line" style={iconStyle}/>}>刪除</Button>
            </div>
            <div className={ editedRecord ? styles.subTable_edit : styles.subTable }>
              <Table
                bordered
                rowSelection={rowDictSubSelection}
                columns={columns}
                dataSource={dictionarySubList}
                pagination={false}
                rowKey={record => record.id}
              />
            </div>
          </Drawer>
        </Spin>
      </div>
    );
  };
}

export default DictionaryDrawer;
