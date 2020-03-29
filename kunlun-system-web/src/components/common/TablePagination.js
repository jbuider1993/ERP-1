import React from 'react';
import { Pagination } from 'antd';
import config from '../../config/config';
import styles from './Pagination.less';

const TablePagination = (props) => {

  const { total, currentPage, pageSize, onPageChange, onShowSizeChange } = props;

  const showTotalElement = (total, range) => {
    return (
      <div style={{marginTop: "1px", marginRight: "8px"}}>
        <span className={styles.paginationTotalDiv} style={{marginRight: "8px"}}>从 {range[0]} - {range[1]} 条</span>
        <span className={styles.paginationTotalDiv}>共 {total} 条</span>
      </div>);
  };

  return (
    <div>
      <Pagination
        style={{ marginTop: "15px" }}
        className="ant-table-pagination"
        showQuickJumper
        showSizeChanger={true}
        onShowSizeChange={onShowSizeChange}
        pageSizeOptions={config.PAGE_SIZE_LIST}
        total={total}
        current={currentPage}
        pageSize={pageSize}
        onChange={onPageChange}
        showTotal={showTotalElement}
      />
    </div>
  );
};

export default TablePagination;
