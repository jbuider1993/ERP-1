import React from 'react';
import { connect } from 'dva';
import OperatorLogSearch from "../../components/synergy/log/OperatorLogSearch";
import OperatorLogToolbar from "../../components/synergy/log/OperatorLogToolbar";
import OperatorLogModal from "../../components/synergy/log/OperatorLogModal";
import OperatorLogList from "../../components/synergy/log/OperatorLogList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";
import config from '../../config/config';
import * as commonUtil from '../../utils/commonUtil';

const OperatorLogPage = (props) => {

  const { dispatch, operatorLogModel } = props;
  const { logList, total, logLoading, operateType, logModalVisible, currentPage, pageSize, selectedRowKeys,
    selectedRows, logInfoData, searchParams, logRecord } = operatorLogModel;

  const operatorLogSearchProps = {
    onSearch: (searchParams) => {
      dispatch({type: "operatorLogModel/updateState", payload: {searchParams}});
      dispatch({type: 'operatorLogModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onReset: () => {
      dispatch({type: "operatorLogModel/updateState", payload: {searchParams: null}});
    },
  };

  const operatorLogToolBarProps = {
    onExport: () => {
      dispatch({type: "operatorLogModel/downloadOperateLog", payload: {id: "12345"}});
    }
  };

  const operatorLogModalProps = {
    logRecord,
    logModalVisible,
    onCancel: () => {
      dispatch({type: "operatorLogModel/updateState", payload: {logModalVisible: false}});
    }
  };

  const operatorLogListProps = {
    currentPage,
    pageSize,
    logList,
    logLoading,
    onView: (record) => {
      dispatch({ type: 'operatorLogModel/updateState', payload: { logModalVisible: true, logRecord: record }});
    },
  };

  const tablePaginationProps = {
    total,
    currentPage,
    pageSize,
    onPageChange: (currentPage, pageSize) => {
      dispatch({type: 'operatorLogModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({type: 'operatorLogModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
  };

  return (
    <div>
      <OperatorLogSearch {...operatorLogSearchProps} />
      <OperatorLogToolbar {...operatorLogToolBarProps} />
      <OperatorLogModal {...operatorLogModalProps} />
      <OperatorLogList {...operatorLogListProps} />
      <TablePagination {...tablePaginationProps} />
    </div>
  );
};

function mapStateToProps({ globalModel, operatorLogModel }){
  return { globalModel, operatorLogModel };
}

export default connect(mapStateToProps)(OperatorLogPage);
