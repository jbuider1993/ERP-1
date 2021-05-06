import React from 'react';
import { connect } from 'dva';
import WorkPostSearch from "../../components/user/workPost/WorkPostSearch";
import WorkPostToolsBar from "../../components/user/workPost/WorkPostToolbar";
import WorkPostModal from "../../components/user/workPost/WorkPostModal";
import WorkPostList from "../../components/user/workPost/WorkPostList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";

class WorkPostPage extends React.Component {

  render() {

    let {dispatch, workPostModel} = this.props;
    const { workPostList, total, workPostLoading, operateType, workPostModalVisible, currentPage, pageSize,
            selectedRowKeys, selectedRows, workPostInfoData, searchParams } = workPostModel;

    const workPostSearchProps = {
      onSearch: (searchParams) => {
        dispatch({type: "workPostModel/updateState", payload: {searchParams}});
        dispatch({type: 'workPostModel/getListDatas', payload: {currentPage, pageSize, params: searchParams}});
      },
      onReset: () => {
        dispatch({type: "workPostModel/updateState", payload: {searchParams: null}});
      },
    };

    const workPostModalProps = {
      operateType,
      workPostModalVisible,
      workPostInfoData,
      onSave: (values) => {
        dispatch({type: "workPostModel/addWorkPost", payload: values});
      },
      updateWorkPost: (values) => {
        dispatch({type: "workPostModel/updateWorkPost", payload: values});
      },
      onCancel: () => {
        dispatch({type: "workPostModel/updateState", payload: {workPostModalVisible: false}});
      },
    };

    const workPostToolbarProps = {
      addSave: () => {
        dispatch({type: "workPostModel/updateState", payload: {workPostModalVisible: true}});
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
            dispatch({type: "workPostModel/batchDeleteWorkPost", payload: {ids}});
          },
          onCancel() {}
        });
      },
    }

    const workPostListProps = {
      currentPage,
      pageSize,
      workPostList,
      workPostLoading,
      onEdit: (record) => {
        dispatch({
          type: "workPostModel/updateState",
          payload: {workPostModalVisible: true, operateType: "edit", workPostInfoData: record}
        });
      },
      rowSelection: {
        selectedRowKeys,
        selectedRows,
        onChange: (keys, selectedRows) => {
          dispatch({
            type: 'workPostModel/updateState',
            payload: {
              selectedRows: selectedRows,
              selectedRowKeys: keys,
            },
          })
        },
      }
    }

    const tablePaginationProps = {
      total,
      currentPage,
      pageSize,
      onPageChange: (currentPage, pageSize) => {
        dispatch({type: 'workPostModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      onShowSizeChange: (currentPage, pageSize) => {
        dispatch({type: 'workPostModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
    };

    return (
      <div>
        <WorkPostSearch {...workPostSearchProps} />
        <WorkPostToolsBar {...workPostToolbarProps} />
        <WorkPostModal {...workPostModalProps} />
        <WorkPostList {...workPostListProps} />
        <TablePagination {...tablePaginationProps} />
      </div>
    );
  };
}

function mapStateToProps({globalModel, workPostModel}){
  return {globalModel, workPostModel};
}

export default connect(mapStateToProps)(WorkPostPage);
