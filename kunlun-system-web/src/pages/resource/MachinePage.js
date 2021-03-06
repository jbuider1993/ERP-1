import React from 'react';
import { connect } from 'dva';
import {Spin} from 'antd';
import MachineList from "../../components/resource/machine/MachineList";
import MachineToolBar from '../../components/resource/machine/MachineToolBar';
import MachineModal from '../../components/resource/machine/MachineModal';
import MachineSearch from '../../components/resource/machine/MachineSearch';
import TablePagination from "@/components/common/TablePagination";

const MachinePage = (props) => {

  const { dispatch, machineModel } = props;
  const { machineLoading, machineList, machineModalVisible, operateType, machineInfoData, saveLoading,
    isExpandSearch, total, currentPage, pageSize, searchParams } = machineModel;

  const machineSearchProps = {
    isExpandSearch,
    onSearch: (values) => {
      dispatch({ type: "machineModel/getMachineList", payload: values });
    },
    toggleExpand: () => {
      dispatch({ type: "machineModel/updateState", payload: {isExpandSearch: !isExpandSearch}});
    },

  };

  const machineToolBarProps = {
    addMachine: () => {
      dispatch({ type: "machineModel/updateState", payload: { menuModalVisible: true }});
    },
    downloadTemplate: () => {
      dispatch({type: "machineModel/downloadTemplate", payload: {}});
    },
    onImport: () => {
      dispatch({type: "machineModel/updateState", payload: {unfoldCollapseKeys: []}});
    },
  };

  const machineModalProps = {
    machineLoading,
    machineModalVisible,
    operateType,
    machineInfoData,
    saveLoading,
    onCancel: () => {
      dispatch({ type: "menuModel/updateState", payload: { menuInfoData: null, selectedTreeNode: [], selectedIconRows: [], menuModalVisible: false }});
    },
    onSave: (params) => {
      Promise.all([dispatch({ type: "menuModel/onSave", payload: params })]).then(() =>
        dispatch({ type: "menuModel/updateState", payload: { menuInfoData: null, selectedTreeNode: [], selectedIconRows: [], menuModalVisible: false }}));
    },
    onSelectParentMenu: () => {
      dispatch({ type: "menuModel/updateState", payload: { selectMenuModalVisible: true }});
    },
    onShowIconModal: () => {
      dispatch({ type: "menuModel/updateState", payload: { menuIconModalVisible: true }});
    },
  };

  const machineListProps = {
    machineLoading,
    machineList,
    onEditMenu: (menuInfoData) => {
      dispatch({ type: "menuModel/updateState", payload: { menuInfoData, menuModalVisible: true, menuModalType: "edit" }});
    },
    onDelete: (record) => {
      dispatch({ type: "menuModel/onDelete", payload: { id: record.id }});
    },
    onExpandMenuList: (expanded, record) => {
      dispatch({ type: "menuModel/updateState", payload: {}});
    },
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
  }

  return (
    <div>
      <Spin spinning={machineLoading}>
        <MachineSearch {...machineSearchProps} />
        <MachineToolBar {...machineToolBarProps} />
        <MachineModal {...machineModalProps} />
        <MachineList {...machineListProps} />
        <TablePagination {...tablePaginationProps} />
      </Spin>
    </div>
  );
};

function mapStateToProps({ globalModel, machineModel }) {
  return { globalModel, machineModel };
}

export default connect(mapStateToProps)(MachinePage);
