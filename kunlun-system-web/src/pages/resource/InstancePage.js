import React from 'react';
import { connect } from 'dva';
import {Spin} from 'antd';
import InstanceList from "../../components/resource/instance/InstanceList";
import InstanceToolBar from '../../components/resource/instance/InstanceToolBar';
import InstanceModal from '../../components/resource/instance/InstanceModal';
import InstanceSearch from '../../components/resource/instance/InstanceSearch';
import TablePagination from "@/components/common/TablePagination";

const InstancePage = (props) => {

  const { dispatch, instanceModel } = props;
  const { instanceLoading, instanceList, instanceModalVisible, operateType, instanceInfoData, saveLoading,
    isExpandSearch, total, currentPage, pageSize, searchParams } = instanceModel;

  const instanceSearchProps = {
    isExpandSearch,
    onSearch: (values) => {
      dispatch({ type: "instanceModel/getMachineList", payload: values });
    },
    toggleExpand: () => {
      dispatch({ type: "instanceModel/updateState", payload: {isExpandSearch: !isExpandSearch}});
    },

  };

  const instanceToolBarProps = {
    addMachine: () => {
      dispatch({ type: "instanceModel/updateState", payload: { menuModalVisible: true }});
    },
    downloadTemplate: () => {
      dispatch({type: "instanceModel/downloadTemplate", payload: {}});
    },
    onImport: () => {
      dispatch({type: "instanceModel/updateState", payload: {unfoldCollapseKeys: []}});
    },
  };

  const instanceModalProps = {
    instanceLoading,
    instanceModalVisible,
    operateType,
    instanceInfoData,
    saveLoading,
    onCancel: () => {
      dispatch({ type: "instanceModel/updateState", payload: { menuInfoData: null, selectedTreeNode: [], selectedIconRows: [], menuModalVisible: false }});
    },
    onSave: (params) => {
      Promise.all([dispatch({ type: "instanceModel/onSave", payload: params })]).then(() =>
        dispatch({ type: "instanceModel/updateState", payload: { menuInfoData: null, selectedTreeNode: [], selectedIconRows: [], menuModalVisible: false }}));
    },
    onSelectParentMenu: () => {
      dispatch({ type: "instanceModel/updateState", payload: { selectMenuModalVisible: true }});
    },
    onShowIconModal: () => {
      dispatch({ type: "instanceModel/updateState", payload: { menuIconModalVisible: true }});
    },
  };

  const instanceListProps = {
    instanceLoading,
    instanceList,
    onEditMenu: (menuInfoData) => {
      dispatch({ type: "instanceModel/updateState", payload: { menuInfoData, menuModalVisible: true, menuModalType: "edit" }});
    },
    onDelete: (record) => {
      dispatch({ type: "instanceModel/onDelete", payload: { id: record.id }});
    },
    onExpandMenuList: (expanded, record) => {
      dispatch({ type: "instanceModel/updateState", payload: {}});
    },
  };

  const tablePaginationProps = {
    total,
    currentPage,
    pageSize,
    onPageChange: (currentPage, pageSize) => {
      dispatch({type: 'instanceModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({type: 'instanceModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
  }

  return (
    <div>
      <Spin spinning={instanceLoading}>
        <InstanceSearch {...instanceSearchProps} />
        <InstanceToolBar {...instanceToolBarProps} />
        <InstanceModal {...instanceModalProps} />
        <InstanceList {...instanceListProps} />
        <TablePagination {...tablePaginationProps} />
      </Spin>
    </div>
  );
};

function mapStateToProps({ globalModel, instanceModel }) {
  return { globalModel, instanceModel };
}

export default connect(mapStateToProps)(InstancePage);
