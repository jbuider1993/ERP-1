import React from 'react';
import styles from './CorrelateAuthorize.less';
import {Table, Tag, Tooltip, Popconfirm, Tree} from 'antd';
import 'remixicon/fonts/remixicon.css';

const { TreeNode } = Tree;

const CorrelateAuthorizeList = (props) => {

  const { departmentList, departmentLoading, rowSelection, onEdit, onDelete, currentPage, pageSize, correlateList, fieldName } = props;

  const generateTreeNodes = (list) => list.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item[fieldName]} key={item.id} dataRef={item}>
          {generateTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item[fieldName]} key={item.id} dataRef={item}/>;
  });

  return (
    <div className={ styles.listTable }>
      <Tree
        treeDefaultExpandAll
      >
        {generateTreeNodes(correlateList)}
      </Tree>
    </div>
  );
}

export default CorrelateAuthorizeList;
