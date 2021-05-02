import React from 'react';
import { connect } from 'dva';
import DepartmentSearch from "../../components/user/department/DepartmentSearch";
import DepartmentToolsBar from "../../components/user/department/DepartmentToolbar";
import DepartmentModal from "../../components/user/department/DepartmentModal";
import DepartmentList from "../../components/user/department/DepartmentList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";

class DepartmentPage extends React.Component {

  render() {

    let {dispatch, departmentModel} = this.props;
    const { departmentList, total, departmentLoading, operateType, departmentModalVisible, currentPage, pageSize,
            selectedRowKeys, selectedRows, departmentInfoData, searchParams } = departmentModel;

    const departmentSearchProps = {
      onSearch: (searchParams) => {
        dispatch({type: "departmentModel/updateState", payload: {searchParams}});
        dispatch({type: 'departmentModel/getListDatas', payload: {currentPage, pageSize, params: searchParams}});
      },
      onReset: () => {
        dispatch({type: "departmentModel/updateState", payload: {searchParams: null}});
      },
    }

    const departmentModalProps = {
      operateType,
      departmentModalVisible,
      departmentInfoData,
      onSave: (values) => {
        values.parentId = values.parentId ? values.parentId : "";
        values.longCode = values.longCode ? values.longCode : "";
        if (values.type == "2" || values.type == "3") {
          const value = selectedRows[0];
          values.parentId = value.id;
          values.longCode = value.longCode;
        }
        dispatch({type: "departmentModel/addDepartment", payload: values});
      },
      updateDepartment: (values) => {
        dispatch({type: "departmentModel/updateDepartment", payload: values});
      },
      onCancel: () => {
        dispatch({type: "departmentModel/updateState", payload: {departmentModalVisible: false}});
      },
    }

    const departmentToolbarProps = {
      addSave: () => {
        dispatch({type: "departmentModel/updateState", payload: {departmentModalVisible: true}});
      },
      unfoldCollapse: () => {
        dispatch({type: "departmentModel/downloadUsers", payload: {id: "12345"}});
      }
    }

    const departmentListProps = {
      currentPage,
      pageSize,
      departmentList,
      departmentLoading,
      onEdit: (record) => {
        dispatch({
          type: "departmentModel/updateState",
          payload: {departmentModalVisible: true, operateType: "edit", departmentInfoData: record}
        });
      },
      onDelete: (record) => {
        dispatch({type: "departmentModel/deleteDepartment", payload: {ids: record.id}});
      },
      rowSelection: {
        selectedRowKeys,
        selectedRows,
        onChange: (keys, selectedRows) => {
          dispatch({
            type: 'departmentModel/updateState',
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
        dispatch({type: 'departmentModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      onShowSizeChange: (currentPage, pageSize) => {
        dispatch({type: 'departmentModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
    };

    return (
      <div>
        <DepartmentSearch {...departmentSearchProps} />
        <DepartmentToolsBar {...departmentToolbarProps} />
        <DepartmentModal {...departmentModalProps} />
        <DepartmentList {...departmentListProps} />
        <TablePagination {...tablePaginationProps} />
      </div>
    );
  };
}

function mapStateToProps({globalModel, departmentModel}){
  return {globalModel, departmentModel};
}

export default connect(mapStateToProps)(DepartmentPage);
