import React from 'react';
import { connect } from 'dva';
import DictionarySearch from "../../components/option/dictionary/DictionarySearch";
import DictionaryToolsBar from "../../components/option/dictionary/DictionaryToolbar";
import DictionaryList from "../../components/option/dictionary/DictionaryList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";

class DictionaryPage extends React.Component {

  render() {

    let {dispatch, location, dictionaryModel} = this.props;
    const { dictionaryList, total, dictionaryLoading, operateType, dictionaryModalVisible, currentPage, pageSize,
            selectedRowKeys, selectedRows, dictionaryInfoData, searchParams } = dictionaryModel;

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
        dispatch({type: "dictionaryModel/updateState", payload: {dictionaryModalVisible: true}});
      },
      batchDelete: () => {
        if (selectedRowKeys.length == 0) {
          message.error("请选择要删除的记录！");
          return;
        }
        Modal.confirm({
          title: "删除",
          content: "确定删除选中的记录？",
          onOk() {
            const ids = selectedRowKeys.join(",");
            dispatch({type: "dictionaryModel/batchDeleteDictionary", payload: {ids}});
          },
          onCancel() {}
        });
      },
      onExport: () => {}
    };

    const dictionaryListProps = {
      currentPage,
      pageSize,
      dictionaryList,
      dictionaryLoading,
      onEdit: (record) => {
        dispatch({
          type: "dictionaryModel/updateState",
          payload: {dictionaryModalVisible: true, operateType: "edit", dictionaryInfoData: record}
        });
      },
      onView: (record) => {
      },
      onDelete: (record) => {
        dispatch({type: "dictionaryModel/batchDeleteDictionary", payload: {ids: record.id}});
      },
      rowSelection: {
        selectedRowKeys,
        selectedRows,
        onChange: (keys, selectedRows) => {
          dispatch({
            type: 'dictionaryModel/updateState',
            payload: {
              selectedRows: selectedRows,
              selectedRowKeys: keys,
            },
          })
        },
      }
    };

    const tablePaginationProps = {
      total,
      currentPage,
      pageSize,
      onPageChange: (currentPage, pageSize) => {
        dispatch({type: 'dictionaryModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      onShowSizeChange: (currentPage, pageSize) => {
        dispatch({type: 'dictionaryModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      showTotal: (total, range) => {
        return `从 ${range[0]}-${range[1]} 条，共 ${total} 条`;
      }
    };

    return (
      <div>
        <DictionarySearch {...dictionarySearchProps} />
        <DictionaryToolsBar {...dictionaryToolbarProps} />
        <DictionaryList {...dictionaryListProps} />
        <TablePagination {...tablePaginationProps} />
      </div>
    );
  };
}

function mapStateToProps({dictionaryModel}){
  return {dictionaryModel};
}

export default connect(mapStateToProps)(DictionaryPage);
