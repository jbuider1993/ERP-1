import React from 'react';
import { connect } from 'dva';
import {Radio, Input} from 'antd';
import CorrelateAuthorizeSearch from "../../components/user/correlateAuthorize/CorrelateAuthorizeSearch";
import CorrelateAuthorizeToolbar from "../../components/user/correlateAuthorize/CorrelateAuthorizeToolbar";
import CorrelateAuthorizeModal from "../../components/user/correlateAuthorize/CorrelateAuthorizeModal";
import CorrelateAuthorizeList from "../../components/user/correlateAuthorize/CorrelateAuthorizeList";
import TablePagination from '../../components/common/TablePagination';
import CorrelatedUserList from "../../components/user/correlateAuthorize/CorrelatedUserList";
import MenuLimitDrawer from "../../components/user/correlateAuthorize/MenuLimitDrawer";
import UserAllotTransfer from "../../components/user/correlateAuthorize/UserAllotTransfer";

const {Search} = Input;

class CorrelateAuthorizePage extends React.Component {

  render() {

    let {dispatch, correlateAuthorizeModel} = this.props;
    const { departmentList, total, departmentLoading, operateType, departmentModalVisible, currentPage,
            pageSize, selectedRowKeys, selectedRows, departmentInfoData, searchParams, radioValue,
            correlateList, menuLimitDrawerVisible, userAllotTransferVisible } = correlateAuthorizeModel;

    const correlateAuthorizeSearchProps = {
      onSearch: (searchParams) => {
        dispatch({type: "correlateAuthorizeModel/updateState", payload: {searchParams}});
        dispatch({type: 'correlateAuthorizeModel/getListDatas', payload: {currentPage, pageSize, params: searchParams}});
      },
      onReset: () => {
        dispatch({type: "correlateAuthorizeModel/updateState", payload: {searchParams: null}});
      },
    }

    const correlateAuthorizeModalProps = {
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
        dispatch({type: "correlateAuthorizeModel/addDepartment", payload: values});
      },
      updateDepartment: (values) => {
        dispatch({type: "correlateAuthorizeModel/updateDepartment", payload: values});
      },
      onCancel: () => {
        dispatch({type: "correlateAuthorizeModel/updateState", payload: {departmentModalVisible: false}});
      },
    }

    const correlateAuthorizeToolbarProps = {
      radioValue,
      onAuthorize: () => {
        const params = "role" == radioValue ? {menuLimitDrawerVisible: true}: {userAllotTransferVisible: true};
        dispatch({type: "correlateAuthorizeModel/updateState", payload: params});
      },
      onAllot: () => {
        dispatch({type: "correlateAuthorizeModel/updateState", payload: {userAllotTransferVisible: true}});
      }
    }

    const correlateAuthorizeListProps = {
      currentPage,
      pageSize,
      departmentList,
      departmentLoading,
      correlateList,
      radioValue,
      onEdit: (record) => {
        dispatch({
          type: "correlateAuthorizeModel/updateState",
          payload: {departmentModalVisible: true, operateType: "edit", departmentInfoData: record}
        });
      },
      onDelete: (record) => {
        dispatch({type: "correlateAuthorizeModel/deleteDepartment", payload: {ids: record.id}});
      },
      rowSelection: {
        selectedRowKeys,
        selectedRows,
        onChange: (keys, selectedRows) => {
          dispatch({
            type: 'correlateAuthorizeModel/updateState',
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
        dispatch({type: 'correlateAuthorizeModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
      onShowSizeChange: (currentPage, pageSize) => {
        dispatch({type: 'correlateAuthorizeModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
      },
    }

    const onRadioChange = (e) => {
      dispatch({type: "correlateAuthorizeModel/updateState", payload: {radioValue: e.target.value}});
      dispatch({type: "correlateAuthorizeModel/getListDatas", payload: {radioValue: e.target.value}});
    }

    const menuLimitDrawerProps = {
      menuLimitDrawerVisible,
      onClose:() => {
        dispatch({type: "correlateAuthorizeModel/updateState", payload: {menuLimitDrawerVisible: false}});
      }
    }

    const userAllotTransferProps = {
      userAllotTransferVisible,
      onCancel: () => {
        dispatch({type: "correlateAuthorizeModel/updateState", payload: {userAllotTransferVisible: false}});
      }
    }

    const nameOption = "department" == radioValue ? "部门" : "post" == radioValue ? "岗位" : "角色";

    return (
      <div style={{height: "100%", width: "100%", display: "flex", flexDirection: "row"}}>
        <div style={{display: "flex", width: "223px", borderRight: "1px #E1E1E1 solid", flexDirection: "column", paddingRight: "18px"}}>
          <div style={{marginBottom: "15px"}}>
            <Radio.Group onChange={onRadioChange} value={radioValue}>
              <Radio value="role">角色</Radio>
              <Radio value="post">岗位</Radio>
              <Radio value="department">部门</Radio>
            </Radio.Group>
          </div>
          <Search placeholder={"请输入" + nameOption + "名称"} onSearch={() => {}} enterButton />
          <CorrelateAuthorizeList {...correlateAuthorizeListProps} />
        </div>
        <div style={{display: "flex", flex: 3.5, flexDirection: "column", marginLeft: "20px"}}>
          <CorrelateAuthorizeSearch {...correlateAuthorizeSearchProps} />
          <CorrelateAuthorizeToolbar {...correlateAuthorizeToolbarProps} />
          <CorrelateAuthorizeModal {...correlateAuthorizeModalProps} />
          <CorrelatedUserList {...correlateAuthorizeListProps} />
          <TablePagination {...tablePaginationProps} />
          <MenuLimitDrawer {...menuLimitDrawerProps} />
          <UserAllotTransfer {...userAllotTransferProps} />
        </div>
      </div>
    );
  };
}

function mapStateToProps({globalModel, correlateAuthorizeModel}){
  return {globalModel, correlateAuthorizeModel};
}

export default connect(mapStateToProps)(CorrelateAuthorizePage);
