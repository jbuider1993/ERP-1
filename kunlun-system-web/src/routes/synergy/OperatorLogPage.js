import React from 'react';
import { connect } from 'dva';
import OperatorLogSearch from "../../components/synergy/log/OperatorLogSearch";
import OperatorLogToolbar from "../../components/synergy/log/OperatorLogToolbar";
import OperatorLogModal from "../../components/synergy/log/OperatorLogModal";
import OperatorLogList from "../../components/synergy/log/OperatorLogList";
import OperatorLogPagination from "../../components/synergy/log/OperatorLogPagination";
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
    onExport: () => {}
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

  const operatorLogPaginationProps = {
    total,
    currentPage,
    pageSize,
    onPageChange: (currentPage, pageSize) => {
      dispatch({type: 'operatorLogModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({type: 'operatorLogModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    showTotal: (total, range) => {
      return `从 ${range[0]}-${range[1]} 条，共 ${total} 条`;
    }
  };

  return (
    <div>
      <OperatorLogSearch {...operatorLogSearchProps} />
      <OperatorLogToolbar {...operatorLogToolBarProps} />
      <OperatorLogModal {...operatorLogModalProps} />
      <OperatorLogList {...operatorLogListProps} />
      <OperatorLogPagination {...operatorLogPaginationProps} />
    </div>
  );
};

function mapStateToProps({ operatorLogModel }){
  return { operatorLogModel };
}

export default connect(mapStateToProps)(OperatorLogPage);
