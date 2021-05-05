import React from 'react';
import styles from './CorrelateAuthorize.less';
import {Tree} from 'antd';
import 'remixicon/fonts/remixicon.css';

const { TreeNode } = Tree;

const CorrelateAuthorizeList = (props) => {

  const {radioValue, correlateList} = props;

  const fieldName = "department" == radioValue ? "departmentName" : "post" == radioValue ? "postName" : "roleName";
  const generateTreeNodes = (list) => list.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item[fieldName]} key={item.id} dataRef={item}>
          {generateTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item[fieldName]} key={item.id} dataRef={item}/>;
  })

  return (
    <div style={{marginLeft: "department" == radioValue ? "-7px" : "-24px", marginTop: "15px"}}>
      <Tree
        className="draggable-tree"
      >
        {generateTreeNodes(correlateList)}
      </Tree>
    </div>
  );
}

export default CorrelateAuthorizeList;
