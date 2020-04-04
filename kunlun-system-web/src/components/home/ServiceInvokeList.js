import React from 'react';
import {Table, Tag, Tooltip, Button} from 'antd';
import indexStyles from "../../pages/home/homeIndex.less";
import * as Icon from '@ant-design/icons';

class ServiceInvokeList extends React.Component {

  render() {

    const {serviceList, onShowDetail} = this.props;

    const columns = [
      { title: '微服务名', dataIndex: 'serviceName', key: 'serviceName', width: '20%' },
      { title: '请求方式', dataIndex: 'methodName', key: 'methodName', width: '20%' },
      { title: '访问次数', dataIndex: 'threadName', key: 'threadName', width: '20%' },
      { title: '访问耗时', dataIndex: 'threadName', key: 'threadName', width: '20%' },
      { title: '服务状态', dataIndex: 'status', key: 'status', render: (text, record, index) => text == "正常" ?
          <Tag color="blue"><span>&nbsp;</span>{text}<span>&nbsp;</span></Tag> :
          <Tag color="red"><span>&nbsp;</span>{text}<span>&nbsp;</span></Tag> }];

    return (
      <div className={indexStyles.tableCDiv}>
        <div className={indexStyles.tableCTitleDiv}>
          <div className={indexStyles.tableCTitleFont}>服务调用情况统计</div>
          <div className={indexStyles.tableCTitleTool}>
            <div onClick={() => onShowDetail("zipkin")} className={indexStyles.fontWeightHover}>
              <Tooltip title={"查看详情"}>
                <Icon.ProfileOutlined style={{fontSize: "16px", marginTop: "5px", marginRight: "20px"}} />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className={indexStyles.tableCContentDiv}>
          <Table
            bordered
            size={"small"}
            columns={columns}
            dataSource={serviceList}
            pagination={false}
            rowKey={record => record.id}
          />
        </div>
      </div>
    );
  };
}

export default ServiceInvokeList;
