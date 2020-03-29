import React from 'react';
import { Pagination } from 'antd';
import config from "../../../config/config";

const OnlinePagination = (props) => {

  const { total, currentPage, pageSize, onPageChange, onShowSizeChange, showTotal } = props;

  return (
    <div>
      <Pagination
        style={{ marginRight: "0.5%", marginTop: "0.8%" }}
        className="ant-table-pagination"
        showQuickJumper
        size={"small"}
        showSizeChanger={true}
        onShowSizeChange={onShowSizeChange}
        pageSizeOptions={config.PAGE_SIZE_LIST}
        total={total}
        current={currentPage}
        pageSize={pageSize}
        onChange={onPageChange}
        showTotal={showTotal}
      />
    </div>
  );
};

export default OnlinePagination;
