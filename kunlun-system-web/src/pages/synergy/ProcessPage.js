import React from 'react';
import { connect } from 'dva';
import ProcessSearch from "../../components/synergy/process/ProcessSearch";
import ProcessToolsBar from "../../components/synergy/process/ProcessToolbar";
import ProcessModal from "../../components/synergy/process/ProcessModal";
import ProcessList from "../../components/synergy/process/ProcessList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";
import config from '../../config/config';
import * as commonUtil from '../../utils/commonUtil';

const ProcessPage = (props) => {

  const { dispatch, processModel } = props;
  const { processList, total, processLoading, operateType, processModalVisible, currentPage, pageSize, selectedRowKeys,
    selectedRows, processInfoData, searchParams, processRecord, modelNodeList } = processModel;

  const processSearchProps = {
    onSearch: (searchParams) => {
      dispatch({type: "processModel/updateState", payload: {searchParams}});
      dispatch({type: 'processModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onReset: () => {
      dispatch({type: "processModel/updateState", payload: {searchParams: null}});
    },
  };

  const processModalProps = {
    processRecord,
    processModalVisible,
    modelNodeList,
    onCancel: () => {
      dispatch({type: "processModel/updateState", payload: {processModalVisible: false}});
    }
  };

  const processToolbarProps = {
    onSubmit: () => {
      if (selectedRowKeys.length == 0 || selectedRowKeys.length > 1) {
        message.error("请选择要提交的流程记录！");
      } else if (selectedRowKeys.length == 1) {
        Modal.confirm({
          title: "提交流程",
          content: "确定提交选中的流程模型？",
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({ type: "processModel/submitProcess", payload: { keyName: "未定义" }});
          },
          onCancel() {}
        });
      }
    },
    onAudit: () => {
      if (selectedRowKeys.length == 0 || selectedRowKeys.length > 1) {
        message.error("请选择要审核的流程记录！");
      } else if (selectedRowKeys.length == 1) {
        Modal.confirm({
          title: "审核流程",
          content: "确定审核选中的流程模型？",
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({ type: "processModel/auditProcess", payload: { processInstanceId: selectedRows[0].processInstanceId }});
          },
          onCancel() {}
        });
      }
    },
    onAbolish: () => {
      if (selectedRowKeys.length == 0) {
        message.error("请选择要删除的记录！");
        return;
      }
      Modal.confirm({
        title: "删除",
        content: "确定删除选中的记录？",
        onOk() {
          const ids = selectedRowKeys.join(",");
          dispatch({ type: "processModel/batchDeleteProcess", payload: { ids }});
        },
        onCancel() {
        }
      });
    }
  };

  const processListProps = {
    currentPage,
    pageSize,
    processList,
    processLoading,
    onView: (record) => {
      dispatch({ type: 'processModel/getModelNodeList', payload: { modelId: record.modelId }});
      dispatch({ type: 'processModel/updateState', payload: { processModalVisible: true, processRecord: record }});
    },
    rowSelection: {
      selectedRowKeys,
      selectedRows,
      onChange: (keys, selectedRows) => {
        dispatch({
          type: 'processModel/updateState',
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
      dispatch({type: 'processModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({type: 'processModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
  };

  return (
    <div>
      <ProcessSearch {...processSearchProps} />
      <ProcessToolsBar {...processToolbarProps} />
      <ProcessModal {...processModalProps} />
      <ProcessList {...processListProps} />
      <TablePagination {...tablePaginationProps} />
    </div>
  );
};

function mapStateToProps({ processModel }){
  return { processModel };
}

export default connect(mapStateToProps)(ProcessPage);
