import React from 'react';
import { connect } from 'dva';
import IconList from "../../components/option/icon/IconList";
import IconModal from '../../components/option/icon/IconModal';
import IconToolBar from '../../components/option/icon/IconToolBar';
import IconSearch from '../../components/option/icon/IconSearch';
import TablePagination from '../../components/common/TablePagination';
import { Modal, Spin } from 'antd';

const IconPage = (props) => {

  const { dispatch, iconModel } = props;
  const { iconLoading, iconList, iconModalVisible, iconInfoData, total, currentPage, pageSize, searchParams } = iconModel;

  const iconSearchProps = {
    onSearch: (searchParams) => {
      dispatch({type: "iconModel/updateState", payload: {searchParams}});
      dispatch({type: 'iconModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onReset: () => {
      dispatch({type: "iconModel/updateState", payload: {searchParams: null}});
    },
  };

  const iconToolBarProps = {
    fetchIcons: () => {
      Modal.confirm({
        title: "抓取图标",
        content: <div><i className="ri-error-warning-line" style={{fontSize: "18px", marginRight: "10px", verticalAlign: "sub"}}/>是否确定从<a href='https://remixicon.com/' target='_blank'> Remix Icon </a>官网抓取图标数据？注意：抓取图标过程中请耐心等待！</div>,
        onOk() {
          dispatch({ type: "iconModel/fetchIcons", payload: {}});
        },
        onCancel() {
        }
      });
    },
    onExport: () => {
      dispatch({ type: "iconModel/onExportIcons", payload: {}});
    },
  };

  const iconListProps = {
    iconList,
    currentPage,
    pageSize,
    onEditMenu: (menuInfoData) => {
      dispatch({ type: "iconModel/updateState", payload: { menuInfoData, menuModalVisible: true }});
    },
    onDelete: (record) => {
      dispatch({ type: "iconModel/onDelete", payload: record });
    },
    onViewIcon: (record) => {
      dispatch({ type: "iconModel/updateState", payload: { iconInfoData: record, iconModalVisible: true }});
    }
  };

  const iconModalProps = {
    iconModalVisible,
    iconInfoData,
    onCancel: () => {
      dispatch({ type: "iconModel/updateState", payload: { iconModalVisible: false }});
    }
  };

  const tablePaginationProps = {
    total,
    currentPage,
    pageSize,
    onPageChange: (currentPage, pageSize) => {
      dispatch({type: 'iconModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({type: 'iconModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
  };

  return (
    <div>
      <Spin spinning={iconLoading}>
        <IconSearch {...iconSearchProps} />
        <IconToolBar {...iconToolBarProps} />
        <IconList {...iconListProps} />
        <IconModal {...iconModalProps} />
        <TablePagination {...tablePaginationProps} />
      </Spin>
    </div>
  );
};

function mapStateToProps({ globalModel, iconModel }) {
  return { globalModel, iconModel };
}

export default connect(mapStateToProps)(IconPage);
