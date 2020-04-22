import React from 'react';
import { connect } from 'dva';
import ModelSearch from "../../components/synergy/model/ModelSearch";
import ModelToolsBar from "../../components/synergy/model/ModelToolbar";
import ModelModal from "../../components/synergy/model/ModelModal";
import ModelList from "../../components/synergy/model/ModelList";
import TablePagination from '../../components/common/TablePagination';
import { Modal, message } from "antd";
import config from '../../config/config';
import * as commonUtil from '../../utils/commonUtil';

const ModelPage = (props) => {

  const { dispatch, modelModel } = props;
  const { modelList, total, modelLoading, operateType, modelModalVisible, currentPage, pageSize,
          selectedRowKeys, selectedRows, modelInfoData, searchParams, modelRecord, modelNodeList } = modelModel;

  const modelSearchProps = {
    onSearch: (searchParams) => {
      dispatch({type: "modelModel/updateState", payload: {searchParams}});
      dispatch({type: 'modelModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onReset: () => {
      dispatch({type: "modelModel/updateState", payload: {searchParams: null}});
    },
  };

  const modelModalProps = {
    modelRecord,
    modelModalVisible,
    modelNodeList,
    onCancel: () => {
      dispatch({type: "modelModel/updateState", payload: {modelModalVisible: false}});
    }
  };

  const modelToolbarProps = {
    addSave: () => {
      commonUtil.sendRequestToHome(true, "create", null);
    },
    onDeploy: () => {
      if (selectedRowKeys.length == 0 || selectedRowKeys.length > 1) {
        message.error("请选择要部署流程的记录！");
      } else if (selectedRowKeys.length == 1) {
        if (selectedRows[0].deployStatus) {
          message.warning("此模型已部署！");
          return;
        }

        Modal.confirm({
          title: "部署流程",
          content: "确定部署选中的流程模型？",
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({ type: "modelModel/deployModel", payload: { modelId: selectedRowKeys[0] }});
          },
          onCancel() {}
        });
      }
    },
    onDelete: () => {
      if (selectedRowKeys.length == 0) {
        message.error("请选择要删除的记录！");
        return;
      }

      if (selectedRows[0].deployStatus) {
        message.warning("此模型已部署，不能删除！");
        return;
      }

      Modal.confirm({
        title: "删除",
        content: "确定删除选中的记录？",
        onOk() {
          const ids = selectedRowKeys.join(",");
          dispatch({ type: "modelModel/batchDeleteModel", payload: { ids }});
        },
        onCancel() {
        }
      });
    },
    onExport: () => {},
    onImport: () => {},
  };

  const modelListProps = {
    currentPage,
    pageSize,
    modelList,
    modelLoading,
    onEdit: (record) => {
      if (record.deployStatus) {
        message.warning("此模型已部署，不能编辑！");
        return;
      }

      commonUtil.sendRequestToHome(true, "update", {id: record.id});
    },
    onView: (record) => {
      dispatch({ type: 'modelModel/getModelNodeList', payload: { modelId: record.id }});
      dispatch({ type: 'modelModel/updateState', payload: { modelModalVisible: true, modelRecord: record }});
    },
    rowSelection: {
      selectedRowKeys,
      selectedRows,
      onChange: (keys, selectedRows) => {
        dispatch({
          type: 'modelModel/updateState',
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
      dispatch({type: 'modelModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({type: 'modelModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
  };

  return (
    <div>
      <ModelSearch {...modelSearchProps} />
      <ModelToolsBar {...modelToolbarProps} />
      <ModelModal {...modelModalProps} />
      <ModelList {...modelListProps} />
      <TablePagination {...tablePaginationProps} />
    </div>
  );
};

function mapStateToProps({ modelModel }){
  return { modelModel };
}

export default connect(mapStateToProps)(ModelPage);
