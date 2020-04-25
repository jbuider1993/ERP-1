import React from 'react';
import { connect } from 'dva';
import ProcessSearch from "../../components/synergy/process/ProcessSearch";
import ProcessToolsBar from "../../components/synergy/process/ProcessToolbar";
import ProcessModal from "../../components/synergy/process/ProcessModal";
import ProcessList from "../../components/synergy/process/ProcessList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message, Spin } from "antd";
import config from '../../config/config';
import * as commonUtil from '../../utils/commonUtil';
import 'remixicon/fonts/remixicon.css';

const ProcessPage = (props) => {

  const { dispatch, processModel } = props;
  const { processList, total, processLoading, operateType, processModalVisible, currentPage, pageSize, selectedRowKeys,
    selectedRows, processInfoData, searchParams, processRecord, modelNodeList, currentNode } = processModel;

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
    currentNode,
    onCancel: () => {
      dispatch({type: "processModel/updateState", payload: {processModalVisible: false}});
    }
  };

  const iconStyle = {
    fontSize: "18px",
    verticalAlign: "sub",
    marginRight: "5px",
  };

  const processToolbarProps = {
    onSubmit: () => {
      if (selectedRows.length == 0 || selectedRows.length > 1) {
        message.error("请选择要提交的流程记录！");
      } else if (selectedRowKeys.length == 1) {
        const status = selectedRows[0].processStatus;
        const flag = status != config.PROCESS_STATUS[0].key && status != config.PROCESS_STATUS[4].key;
        Modal.confirm({
          title: "提交流程",
          content: <div><i className="ri-error-warning-line" style={iconStyle}/>{flag ? "选择的流程已新建了一个实例，再次提交将重新新建一个实例！" : "确定提交选中的流程模型？"}</div>,
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({ type: "processModel/submitProcess", payload: { keyName: selectedRows[0].key }});
          },
          onCancel() {}
        });
      }
    },
    onAudit: () => {
      if (selectedRows.length == 0 || selectedRows.length > 1) {
        message.error("请选择要审核的流程记录！");
      } else if (selectedRowKeys.length == 1) {
        if (selectedRows[0].processStatus == config.PROCESS_STATUS[4].key) {
          message.warning("流程已审核完成！");
          return;
        }
        Modal.confirm({
          title: "审核流程",
          content: <div><i className="ri-error-warning-line" style={iconStyle}/>"确定审核选中的流程模型？"</div>,
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
      dispatch({ type: 'processModel/getModelNodeList', payload: record});
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
      <Spin spinning={processLoading}>
        <ProcessSearch {...processSearchProps} />
        <ProcessToolsBar {...processToolbarProps} />
        <ProcessModal {...processModalProps} />
        <ProcessList {...processListProps} />
        <TablePagination {...tablePaginationProps} />
      </Spin>
    </div>
  );
};

function mapStateToProps({ processModel }){
  return { processModel };
}

export default connect(mapStateToProps)(ProcessPage);
