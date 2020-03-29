import React from 'react';
import { connect } from 'dva';
import RoleSearch from "../../components/user/role/RoleSearch";
import RoleToolsBar from "../../components/user/role/RoleToolbar";
import RoleModal from "../../components/user/role/RoleModal";
import RoleList from "../../components/user/role/RoleList";
import RolePagination from "../../components/user/role/RolePagination";
import { Modal, message } from "antd";

const RolePage = (props) => {

  let { location, history, dispatch, roleModel } = props;
  const { roleList, total, roleLoading, operateType, roleModalVisible, currentPage, pageSize,
    selectedRowKeys, selectedRows, roleInfoData, searchParams } = roleModel;

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
      dispatch({ type: "roleModel/updateState", payload: { roleModalVisible: false }});
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
    onView: (record) => {
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

  const rolePaginationProps = {
    total,
    currentPage,
    pageSize,
    onPageChange: (currentPage, pageSize) => {
      dispatch({ type: 'roleModel/getListDatas', payload: { currentPage, pageSize, ...searchParams }});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({ type: 'roleModel/getListDatas', payload: { currentPage, pageSize, ...searchParams }});
    },
    showTotal: (total, range) => {
      return `从 ${range[0]}-${range[1]} 条，共 ${total} 条`;
    }
  };

  return (
    <div>
      <RoleSearch {...roleSearchProps} />
      <RoleToolsBar {...roleToolbarProps} />
      <RoleModal {...roleModalProps} />
      <RoleList {...roleListProps} />
      <RolePagination {...rolePaginationProps} />
    </div>
  );
};

function mapStateToProps({ roleModel }){
  return { roleModel };
}

export default connect(mapStateToProps)(RolePage);
