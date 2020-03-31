import React from 'react';
import { connect } from 'dva';
import UserSearch from "../../components/user/manage/UserSearch";
import UserToolsBar from "../../components/user/manage/UserToolbar";
import UserModal from "../../components/user/manage/UserModal";
import UserList from "../../components/user/manage/UserList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";

class UserPage extends React.Component {

  render() {

    let {dispatch, location, userModel} = this.props;
    const { userList, total, userLoading, operateType, userModalVisible, currentPage, pageSize,
            selectedRowKeys, selectedRows, userInfoData, searchParams } = userModel;

    const userSearchProps = {
      onSearch: (searchParams) => {
        dispatch({type: "userModel/updateState", payload: {searchParams}});
        dispatch({type: 'userModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      onReset: () => {
        dispatch({type: "userModel/updateState", payload: {searchParams: null}});
      },
    };

    const userModalProps = {
      operateType,
      userModalVisible,
      userInfoData,
      onSave: (values) => {
        dispatch({type: "userModel/addUser", payload: values});
      },
      updateUser: (values) => {
        dispatch({type: "userModel/updateUser", payload: values});
      },
      onCancel: () => {
        dispatch({type: "userModel/updateState", payload: {userModalVisible: false}});
      },
    };

    const userToolbarProps = {
      addSave: () => {
        dispatch({type: "userModel/updateState", payload: {userModalVisible: true}});
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
            dispatch({type: "userModel/batchDeleteUser", payload: {ids}});
          },
          onCancel() {}
        });
      },
      onExport: () => {}
    };

    const userListProps = {
      currentPage,
      pageSize,
      userList,
      userLoading,
      onEdit: (record) => {
        dispatch({
          type: "userModel/updateState",
          payload: {userModalVisible: true, operateType: "edit", userInfoData: record}
        });
      },
      onView: (record) => {
      },
      onDelete: (record) => {
        dispatch({type: "userModel/batchDeleteUser", payload: {ids: record.id}});
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
        dispatch({type: 'userModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      onShowSizeChange: (currentPage, pageSize) => {
        dispatch({type: 'userModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
    };

    return (
      <div>
        <UserSearch {...userSearchProps} />
        <UserToolsBar {...userToolbarProps} />
        <UserModal {...userModalProps} />
        <UserList {...userListProps} />
        <TablePagination {...tablePaginationProps} />
      </div>
    );
  };
}

function mapStateToProps({userModel}){
  return {userModel};
}

export default connect(mapStateToProps)(UserPage);
