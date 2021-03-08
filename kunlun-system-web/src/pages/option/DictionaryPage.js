import React from 'react';
import { connect } from 'dva';
import DictionarySearch from "../../components/option/dictionary/DictionarySearch";
import DictionaryToolsBar from "../../components/option/dictionary/DictionaryToolbar";
import DictionaryList from "../../components/option/dictionary/DictionaryList";
import DictionaryModal from "../../components/option/dictionary/DictionaryModal";
import DictionaryDrawer from "../../components/option/dictionary/DictionaryDrawer";
import { Modal, message } from "antd";
import config from "../../config/config";

class DictionaryPage extends React.Component {

  render() {

    let {dispatch, location, dictionaryModel} = this.props;
    const { dictionaryList, total, dictionaryLoading, operateType, modalType, dictionaryModalVisible, currentPage, pageSize,
      selectedItemRows, selectedItemRowKeys, dictionaryInfoData, searchParams, dictSubDrawerVisible, dictionarySubLoading,
          dictionarySubList, dictSubCurrentPage, dictSubPageSize, dictSubTotal, showDictRow, selectedValueRowKeys, selectedValueRows,
    } = dictionaryModel;

    const dictionarySearchProps = {
      onSearch: (searchParams) => {
        dispatch({type: "dictionaryModel/updateState", payload: {searchParams}});
        dispatch({type: 'dictionaryModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      onReset: () => {
        dispatch({type: "dictionaryModel/updateState", payload: {searchParams: null}});
      },
    };

    const dictionaryToolbarProps = {
      addSave: () => {
        dispatch({type: "dictionaryModel/updateState", payload: {modalType: "item", dictionaryModalVisible: true}});
      },
      batchDelete: () => {
        if (selectedItemRowKeys.length == 0) {
          message.error("请选择要删除的记录！");
          return;
        }
        Modal.confirm({
          title: "删除",
          content: "确定删除选中的记录？",
          onOk() {
            const ids = selectedItemRowKeys.join(",");
            dispatch({type: "dictionaryModel/deleteDictionaryItem", payload: {ids}});
          },
          onCancel() {}
        });
      },
      onExport: () => {}
    };

    const dictionaryListProps = {
      currentPage,
      pageSize,
      total,
      dictionaryList,
      dictionaryLoading,
      onEdit: (record) => {
        dispatch({
          type: "dictionaryModel/updateState",
          payload: {dictionaryModalVisible: true, modalType: "item", operateType: "edit", dictionaryInfoData: record}
        });
      },
      rowSelection: {
        selectedItemRowKeys,
        selectedItemRows,
        onChange: (keys, selectedRows) => {
          dispatch({
            type: 'dictionaryModel/updateState',
            payload: {
              selectedItemRows: selectedRows,
              selectedItemRowKeys: keys,
            },
          })
        },
      },
      onPageChange: (currentPage, pageSize) => {
        dispatch({type: 'dictionaryModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      onShowSizeChange: (currentPage, pageSize) => {
        dispatch({type: 'dictionaryModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      showTotal: (total, range) => {
        return `从 ${range[0]}-${range[1]} 条，共 ${total} 条`;
      },
      onShowDictionarySub:(record) => {
        const params = {dictId: record.id};
        dispatch({type: 'dictionaryModel/updateState', payload: {showDictRow: record, dictSubDrawerVisible: true}});
        dispatch({type: 'dictionaryModel/getListSubDatas', payload: {currentPage, pageSize, params}});
      },
    };

    const dictionaryModalProps = {
      dictionaryModalVisible,
      modalType,
      operateType,
      dictionaryInfoData,
      onCancel: () => {
        dispatch({type: "dictionaryModel/updateState", payload: {dictionaryModalVisible: false}});
      },
      onSave: (values) => {
        const type = modalType == "item" ? "dictionaryModel/saveDictionary" : "dictionaryModel/saveDictionaryValue";
        dispatch({type, payload: values});
      },
    };

    const dictionaryDrawerProps = {
      dictSubDrawerVisible,
      dictionarySubLoading,
      dictionarySubList,
      dictSubCurrentPage,
      dictSubPageSize,
      dictSubTotal,
      showDictRow,
      rowDictSubSelection: {
        selectedValueRowKeys,
        selectedValueRows,
        onChange: (keys, selectedRows) => {
          dispatch({
            type: 'dictionaryModel/updateState',
            payload: {
              selectedValueRows: selectedRows,
              selectedValueRowKeys: keys,
            },
          });
        }
      },
      onClose: () => {
        dispatch({type: 'dictionaryModel/updateState', payload: {dictSubDrawerVisible: false}});
      },
      onAdd: () => {
        dispatch({type: "dictionaryModel/updateState", payload: {modalType: "value", dictionaryModalVisible: true}});
      },
      onSave: (record, index) => {

        debugger

        record["createTime"] = null;
        record["modifiedTime"] = null;

        debugger

        dispatch({type: "dictionaryModel/updateDictionaryValue", payload: record});
      },
      onDelete: () => {
        if (selectedValueRowKeys.length == 0) {
          message.error("请选择要删除的记录！");
          return;
        }
        Modal.confirm({
          title: "删除",
          content: "确定删除选中的记录？",
          onOk() {
            const ids = selectedValueRowKeys.join(",");
            dispatch({type: "dictionaryModel/deleteDictionaryValue", payload: {ids}});
          },
          onCancel() {}
        });
      },
    };

    return (
      <div>
        <DictionarySearch {...dictionarySearchProps} />
        <DictionaryToolsBar {...dictionaryToolbarProps} />
        <DictionaryList {...dictionaryListProps} />
        <DictionaryModal {...dictionaryModalProps} />
        <DictionaryDrawer {...dictionaryDrawerProps} />
      </div>
    );
  };
}

function mapStateToProps({globalModel, dictionaryModel}){
  return {globalModel, dictionaryModel};
}

export default connect(mapStateToProps)(DictionaryPage);
