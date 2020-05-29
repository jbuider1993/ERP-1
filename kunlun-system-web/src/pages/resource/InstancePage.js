import React from 'react';
import { connect } from 'dva';
import MachineList from "../../components/resource/machine/MachineList";
import MachineToolBar from '../../components/resource/machine/MachineToolBar';
import MachineModal from '../../components/resource/machine/MachineModal';
import MachineSearch from '../../components/resource/machine/MachineSearch';

const InstancePage = (props) => {

  const { dispatch, instanceModel } = props;
  const { instanceLoading, instanceList, instanceModalVisible, operateType, instanceInfoData, saveLoading } = instanceModel;

  const machineSearchProps = {
    onSearch: (values) => {
      dispatch({ type: "menuModel/getMenuTreeList", payload: values });
    },
  };

  const machineToolBarProps = {
    addMachine: () => {
      dispatch({ type: "menuModel/updateState", payload: { menuModalVisible: true }});
    },
    downloadTemplate: () => {
      dispatch({type: "menuModel/updateState", payload: {unfoldCollapseKeys: []}});
    },
    onImport: () => {
      dispatch({type: "menuModel/updateState", payload: {unfoldCollapseKeys: []}});
    },
  };

  const machineModalProps = {
    instanceLoading,
    instanceModalVisible,
    operateType,
    instanceInfoData,
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
    instanceLoading,
    instanceList,
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

  return (
    <div>
      <MachineSearch {...machineSearchProps} />
      <MachineToolBar {...machineToolBarProps} />
      <MachineModal {...machineModalProps} />
      <MachineList {...machineListProps} />
    </div>
  );
};

function mapStateToProps({ globalModel, instanceModel }) {
  return { globalModel, instanceModel };
}

export default connect(mapStateToProps)(InstancePage);
