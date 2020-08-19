import React from 'react';
import {Table, Tag, Tooltip, Button} from 'antd';
import indexStyles from "../../pages/home/homeIndex.less";
import 'remixicon/fonts/remixicon.css';

class ServiceInvokeList extends React.Component {

  render() {

    const {serviceInvokes, onShowDetail} = this.props;

    const columns = [
      { title: '微服务名', dataIndex: 'serviceName', key: 'serviceName', width: '30%' },
      { title: '请求方式', dataIndex: 'requestType', key: 'requestType', width: '25%' },
      { title: '访问次数', dataIndex: 'count', key: 'count', width: '15%' },
      { title: '访问耗时', dataIndex: 'duration', key: 'duration', width: '15%' },
      { title: '服务状态', dataIndex: 'available', key: 'available', render: (text, record, index) => text == "正常" ?
          <Tag color="blue"><span>&nbsp;</span>{text}<span>&nbsp;</span></Tag> :
          <Tag color="red"><span>&nbsp;</span>{text}<span>&nbsp;</span></Tag> }];

    return (
      <div className={indexStyles.tableCDiv}>
        <div className={indexStyles.tableCTitleDiv}>
          <div className={indexStyles.tableCTitleFont}>服务调用情况统计</div>
          <div className={indexStyles.tableCTitleTool}>
            <div onClick={() => onShowDetail("zipkin")} className={indexStyles.fontWeightHover}>
              <Tooltip title={"查看详情"}>
                <i className="ri-article-line" style={{fontSize: "19px", marginRight: "20px"}}></i>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className={indexStyles.tableCContentDiv}>
          <Table
            bordered
            size={"small"}
            columns={columns}
            dataSource={serviceInvokes}
            pagination={false}
            rowKey={record => record.id}
          />
        </div>
      </div>
    );
  };
}

export default ServiceInvokeList;
