import React from 'react';
import { connect } from 'dva';
import MachineList from "../../components/resource/machine/MachineList";
import MachineToolBar from '../../components/resource/machine/MachineToolBar';
import MachineModal from '../../components/resource/machine/MachineModal';
import MachineSearch from '../../components/resource/machine/MachineSearch';

const MachinePage = (props) => {

  const { dispatch, machineModel } = props;
  const { machineLoading, machineList, machineModalVisible, operateType, machineInfoData, saveLoading } = machineModel;

  const machineSearchProps = {
    onSearch: (values) => {
      dispatch({ type: "machineModel/getMachineList", payload: values });
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

  return (
    <div>
      <MachineSearch {...machineSearchProps} />
      <MachineToolBar {...machineToolBarProps} />
      <MachineModal {...machineModalProps} />
      <MachineList {...machineListProps} />
    </div>
  );
};

function mapStateToProps({ globalModel, machineModel }) {
  return { globalModel, machineModel };
}

export default connect(mapStateToProps)(MachinePage);
