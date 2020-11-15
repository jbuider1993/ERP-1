import React from 'react';
import { connect } from 'dva';
import OnlineSearch from "../../components/user/online/OnlineSearch";
import OnlineToolbar from "../../components/user/online/OnlineToolbar";
import OnlineList from "../../components/user/online/OnlineList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";

const OnlinePage = (props) => {

  let { dispatch, onlineModel } = props;
  const { onlineList, total, onlineLoading, currentPage, pageSize, searchParams, selectedRowKeys, selectedRows, isExpandSearch } = onlineModel;

  const onlineSearchProps = {
    isExpandSearch,
    onSearch: (searchParams) => {
      dispatch({ type: "onlineModel/updateState", payload: { searchParams }});
      dispatch({ type: 'onlineModel/getListDatas', payload: { currentPage, pageSize, params: searchParams }});
    },
    onReset: () => {
      dispatch({ type: "onlineModel/updateState", payload: { searchParams: null }});
    },
    toggleExpand: () => {
      dispatch({ type: "onlineModel/updateState", payload: { isExpandSearch: !isExpandSearch }});
    },
  };

  const onlineToolBarProps = {
    onExport: () => {
      dispatch({ type: "onlineModel/downloadOnlineUsers", payload: { searchParams }});
    },
    forceExit: () => {
      dispatch({ type: "onlineModel/forceExit", payload: { selectedOnlineUsers: selectedRows }});
    },
  };

  const onlineListProps = {
    currentPage,
    pageSize,
    onlineList,
    onlineLoading,
    isExpandSearch,
    onForceExit: (record) => {
      const selectedOnlineUsers = new Array();
      selectedOnlineUsers.push(record);
      dispatch({ type: "onlineModel/forceExit", payload: { selectedOnlineUsers }});
    },
    rowSelection: {
      selectedRowKeys,
      selectedRows,
      onChange: (keys, selectedRows) => {
        dispatch({
          type: 'userModel/updateState',
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
      dispatch({ type: 'onlineModel/getListDatas', payload: { currentPage, pageSize, ...searchParams }});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({ type: 'onlineModel/getListDatas', payload: { currentPage, pageSize, ...searchParams }});
    },
  };

  return (
    <div>
      <OnlineSearch {...onlineSearchProps} />
      <OnlineToolbar {...onlineToolBarProps} />
      <OnlineList {...onlineListProps} />
      <TablePagination {...tablePaginationProps} />
    </div>
  );
};

function mapStateToProps({ globalModel, onlineModel }){
  return { globalModel, onlineModel };
}

export default connect(mapStateToProps)(OnlinePage);
