import React from 'react';
import { connect } from 'dva';
import RoleSearch from "../../components/user/role/RoleSearch";
import RoleToolsBar from "../../components/user/role/RoleToolbar";
import RoleModal from "../../components/user/role/RoleModal";
import RoleList from "../../components/user/role/RoleList";
import MenuLimitDrawer from "../../components/user/role/MenuLimitDrawer";
import ViewRoleModal from "../../components/user/role/ViewRoleModal";
import UserAllotTransfer from "../../components/user/role/UserAllotTransfer";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";

const RolePage = (props) => {

  let { location, history, dispatch, roleModel } = props;
  const { roleList, total, roleLoading, operateType, roleModalVisible, currentPage, pageSize,
    selectedRowKeys, selectedRows, roleInfoData, searchParams, menuLimitDrawerVisible, viewRoleModalVisible,
    userAllotTransferVisible, menuLimitLoading, menuList, userList } = roleModel;

  const roleSearchProps = {
    onSearch: (searchParams) => {
      dispatch({ type: "roleModel/updateState", payload: { searchParams }});
      dispatch({ type: 'roleModel/getListDatas', payload: { currentPage, pageSize, ...searchParams }});
    },
    onReset: () => {
      dispatch({ type: "roleModel/updateState", payload: { searchParams: null }});
    },
  };

  const roleModalProps = {
    operateType,
    roleModalVisible,
    roleInfoData,
    onSave: (values) => {
      dispatch({ type: "roleModel/addRole", payload: values });
    },
    updateRole: (values) => {
      dispatch({ type: "roleModel/updateRole", payload: values});
    },
    onCancel: () => {

      debugger

      dispatch({ type: "roleModel/updateState", payload: { roleModalVisible: false, roleInfoData: null }});
    },
  };

  const roleToolbarProps = {
    addSave: () => {
      dispatch({ type: "roleModel/updateState", payload: { roleModalVisible: true }});
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
          dispatch({ type: "roleModel/batchDeleteRole", payload: { ids }});
        },
        onCancel() {
        }
      });
    }
  };

  const roleListProps = {
    currentPage,
    pageSize,
    roleList,
    roleLoading,
    onEdit: (record) => {
      dispatch({ type: "roleModel/updateState", payload: { roleModalVisible: true, operateType: "edit", roleInfoData: record }});
    },
    onMenuLimit: (record) => {
      dispatch({type: "roleModel/getMenuList", payload: {currentPage: 1, pageSize: 999999}}).then(() => {
        dispatch({type: "roleModel/getRoleById", payload: {id: record.id}});
        dispatch({type: "roleModel/updateState", payload: {menuLimitDrawerVisible: true}});
      });
    },
    onDataLimit: (record) => {
      dispatch({type: "roleModel/getRoleById", payload: {id: record.id}});
      dispatch({type: "roleModel/updateState", payload: {menuLimitDrawerVisible: true}});
    },
    onAllotUser: (record) => {
      dispatch({type: "roleModel/getUserList", payload: {currentPage: 1, pageSize: 999999}}).then(() => {
          dispatch({type: "roleModel/getRoleById", payload: {id: record.id}});
        dispatch({type: "roleModel/updateState", payload: {userAllotTransferVisible: true}});
      });
    },
    onView: (record) => {
      Promise.all([dispatch({type: "roleModel/getMenuList", payload: {currentPage: 1, pageSize: 999999}}),
        dispatch({type: "roleModel/getUserList", payload: {currentPage: 1, pageSize: 999999}})]).then(() => {
        dispatch({type: "roleModel/getRoleById", payload: {id: record.id}});
        const allotedUsers = userList.filter(item => roleInfoData && roleInfoData.userIds ? roleInfoData.userIds.indexOf(item.id) > -1 : false);
        dispatch({type: "roleModel/updateState", payload: {viewRoleModalVisible: true, allotedUsers}});
      });
    },
    onDelete: (record) => {
      dispatch({ type: "roleModel/batchDeleteRole", payload: { ids: record.id }});
    },
    rowSelection: {
      selectedRowKeys,
      selectedRows,
      onChange: (keys, selectedRows) => {
        dispatch({
          type: 'roleModel/updateState',
          payload: {
            selectedRows: selectedRows,
            selectedRowKeys: keys,
          },
        })
      },
    }
  };

  const menuLimitDrawerProps = {
    menuLimitDrawerVisible,
    roleInfoData,
    menuLimitLoading,
    menuList,
    onClose: () => {
      dispatch({type: "roleModel/updateState", payload: {menuLimitDrawerVisible: false, roleInfoData: null}});
    },
    onSelectTreeNode: (selectedMenuKeys) => {
      dispatch({type: "roleModel/onMenuLimit", payload: selectedMenuKeys});
    }
  };

  const viewRoleModalProps = {
    viewRoleModalVisible,
    roleInfoData,
    operateType,
    menuList,
    userList,
    onCancel: () => {
      dispatch({type: "roleModel/updateState", payload: {viewRoleModalVisible: false, roleInfoData: null}});
    },
  };

  const userAllotTransferProps = {
    userAllotTransferVisible,
    roleInfoData,
    userList,
    onAllotUser: (allotUsers) => {
      dispatch({type: "roleModel/onAllotUser", payload: allotUsers});
      dispatch({type: "roleModel/updateState", payload: {userAllotTransferVisible: false}});
    },
    onCancel: () => {
      dispatch({type: "roleModel/updateState", payload: {userAllotTransferVisible: false}});
    },
  };

  const tablePaginationProps = {
    total,
    currentPage,
    pageSize,
    onPageChange: (currentPage, pageSize) => {
      dispatch({ type: 'roleModel/getListDatas', payload: { currentPage, pageSize, ...searchParams }});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({ type: 'roleModel/getListDatas', payload: { currentPage, pageSize, ...searchParams }});
    },
  };

  return (
    <div>
      <RoleSearch {...roleSearchProps} />
      <RoleToolsBar {...roleToolbarProps} />
      <RoleModal {...roleModalProps} />
      <RoleList {...roleListProps} />
      <MenuLimitDrawer {...menuLimitDrawerProps}/>
      <ViewRoleModal {...viewRoleModalProps}/>
      <UserAllotTransfer {...userAllotTransferProps}/>
      <TablePagination {...tablePaginationProps} />
    </div>
  );
};

function mapStateToProps({ globalModel, roleModel }){
  return { globalModel, roleModel };
}

export default connect(mapStateToProps)(RolePage);
