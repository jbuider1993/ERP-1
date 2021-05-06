import React from 'react';
import { connect } from 'dva';
import {Spin} from 'antd';
import MenuList from "../../components/option/menu/MenuList";
import MenuToolBar from '../../components/option/menu/MenuToolBar';
import MenuModal from '../../components/option/menu/MenuModal';
import MenuSearch from '../../components/option/menu/MenuSearch';
import SelectMenuDrawer from '../../components/option/menu/SelectMenuDrawer';
import MenuIconModal from '../../components/option/menu/MenuIconModal';
import TablePagination from '../../components/common/TablePagination';
import * as commonUtil from '../../utils/commonUtil';

const MenuPage = (props) => {

  const { dispatch, menuModel } = props;
  const { menuLoading, menuList, menuModalVisible, saveLoading, selectMenuModalVisible, selectMenuLoading, iconCurrentPage, iconTotal,
    checkedTreeNodeKeys, expandedTreeNodeKeys, unfoldCollapseKeys, menuIconModalVisible, menuIconLoading, total, currentPage, pageSize,
    menuIconList, selectedIconRows, selectedIconRowKeys, selectedTreeNode, menuInfoData, menuModalType, searchParams } = menuModel;

  const menuSearchProps = {
    onSearch: (searchParams) => {
      dispatch({type: "menuModel/updateState", payload: {searchParams}});
      dispatch({type: 'menuModel/getMenuTreeList', payload: {currentPage, pageSize, ...searchParams}});
    },
    onReset: () => {
      dispatch({type: "menuModel/updateState", payload: {searchParams: null}});
    },
  }

  const menuToolBarProps = {
    isCollapse: unfoldCollapseKeys.length == 0 ? false : true,
    addMenu: () => {
      dispatch({ type: "menuModel/updateState", payload: { menuModalVisible: true }});
    },
    unfoldCollapse: () => {
      if (unfoldCollapseKeys.length == 0) {
        const unfoldCollapseKeys = new Array();
        commonUtil.unfoldAllNode(menuList, unfoldCollapseKeys);
        dispatch({type: "menuModel/updateState", payload: {unfoldCollapseKeys}});
      } else {
        dispatch({type: "menuModel/updateState", payload: {unfoldCollapseKeys: []}});
      }
    },
  }

  const menuModalProps = {
    menuModalVisible,
    saveLoading,
    selectMenuModalVisible,
    selectedTreeNode,
    selectedIconRows,
    menuInfoData,
    menuModalType,
    onCancel: () => {
      dispatch({ type: "menuModel/updateState", payload: { menuInfoData: null, selectedTreeNode: [], selectedIconRows: [], menuModalVisible: false }});
    },
    onSave: (params) => {
      Promise.all([dispatch({ type: "menuModel/onSave", payload: params })]).then(() =>
        dispatch({ type: "menuModel/updateState", payload: { menuInfoData: null, selectedTreeNode: null, selectedIconRows: [], menuModalVisible: false }}));
    },
    onSelectParentMenu: () => {
      dispatch({ type: "menuModel/updateState", payload: { selectMenuModalVisible: true }});
    },
    onShowIconModal: () => {
      dispatch({ type: "menuModel/updateState", payload: { menuIconModalVisible: true }});
    },
  }

  const selectMenuDrawerProps = {
    menuList,
    selectMenuModalVisible,
    selectMenuLoading,
    checkedTreeNodeKeys,
    expandedTreeNodeKeys,
    onClose: () => {
      dispatch({ type: "menuModel/updateState", payload: { selectMenuModalVisible: false }});
    },
    onSelectTreeNode: (selectedTreeNode) => {
      dispatch({ type: "menuModel/updateState", payload: { selectedTreeNode, selectMenuModalVisible: false }});
    },
  }

  const menuIconModalProps = {
    menuIconModalVisible,
    menuIconLoading,
    menuIconList,
    iconCurrentPage,
    iconTotal,
    onselectMenuIcon: (selectedIconRowKeys, selectedIconRows) => {
      dispatch({ type: 'menuModel/updateState', payload: { selectedIconRowKeys, selectedIconRows, menuIconModalVisible: false },
      })
    },
    onCancel: () => {
      dispatch({ type: "menuModel/updateState", payload: { menuIconModalVisible: false }});
    },
    onIconPageChange: (currentPage, pageSize) => {
      dispatch({ type: "menuModel/getMenuIconList", payload: { currentPage, pageSize }});
    },
  }

  const menuListProps = {
    menuList,
    unfoldCollapseKeys,
    currentPage,
    pageSize,
    onEditMenu: (menuInfoData) => {
      dispatch({ type: "menuModel/updateState", payload: { menuInfoData, menuModalVisible: true, menuModalType: "edit" }});
    },
    onDelete: (record) => {
      dispatch({ type: "menuModel/onDelete", payload: { id: record.id }});
    },
    onExpandMenuList: (expanded, record) => {
      if (expanded) {
        unfoldCollapseKeys.push(record.id);
      } else {
        const index = unfoldCollapseKeys.indexOf(record.id);
        if (index > -1) unfoldCollapseKeys.splice(index, 1);
      }
      dispatch({ type: "menuModel/updateState", payload: { unfoldCollapseKeys }});
    },
  }

  const tablePaginationProps = {
    total,
    currentPage,
    pageSize,
    onPageChange: (currentPage, pageSize) => {
      dispatch({type: 'menuModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
    onShowSizeChange: (currentPage, pageSize) => {
      dispatch({type: 'menuModel/getListDatas', payload: {currentPage, pageSize, ...searchParams}});
    },
  }

  return (
    <div>
      <Spin spinning={menuLoading}>
        <MenuSearch {...menuSearchProps} />
        <MenuToolBar {...menuToolBarProps} />
        <MenuModal {...menuModalProps} />
        <SelectMenuDrawer {...selectMenuDrawerProps} />
        <MenuIconModal {...menuIconModalProps} />
        <MenuList {...menuListProps} />
        <TablePagination {...tablePaginationProps} />
      </Spin>
    </div>
  );
};

function mapStateToProps({ globalModel, menuModel }) {
  return { globalModel, menuModel };
}

export default connect(mapStateToProps)(MenuPage);
