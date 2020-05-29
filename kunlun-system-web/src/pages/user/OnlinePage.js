import React from 'react';
import { connect } from 'dva';
import OnlineSearch from "../../components/user/online/OnlineSearch";
import OnlineToolbar from "../../components/user/online/OnlineToolbar";
import OnlineList from "../../components/user/online/OnlineList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";

const OnlinePage = (props) => {

  let { dispatch, onlineModel } = props;
  const { onlineList, total, onlineLoading, currentPage, pageSize, searchParams } = onlineModel;

  const onlineSearchProps = {
    onSearch: (searchParams) => {
      dispatch({ type: "onlineModel/updateState", payload: { searchParams }});
      dispatch({ type: 'onlineModel/getListDatas', payload: { currentPage, pageSize, ...searchParams }});
    },
    onReset: () => {
      dispatch({ type: "onlineModel/updateState", payload: { searchParams: null }});
    },
  };

  const onlineToolBarProps = {
    onExport: () => {}
  };

  const onlineListProps = {
    currentPage,
    pageSize,
    onlineList,
    onlineLoading,
    onEdit: (record) => {
      dispatch({ type: "onlineModel/updateState", payload: { onlineModalVisible: true }});
    },
    onView: (record) => {
    },
    onDelete: (record) => {
      dispatch({ type: "onlineModel/batchDeleteOnlineUser", payload: { ids: record.id }});
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
