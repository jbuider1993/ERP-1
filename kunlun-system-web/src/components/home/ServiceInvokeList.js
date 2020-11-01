import React from 'react';
import {Table, Tag, Tooltip} from 'antd';
import indexStyles from "../../pages/home/homeIndex.less";
import 'remixicon/fonts/remixicon.css';

class ServiceInvokeList extends React.Component {

  render() {

    const {serviceInvokes, onShowDetail, onQuerySchedule} = this.props;

    const columns = [
      { title: '微服务名', dataIndex: 'serviceName', key: 'serviceName', width: '26%', className: indexStyles.serviceNameDiv,
        render: (text, record, index) => <Tooltip title={text}><span>{text}</span></Tooltip>
      },
      { title: '请求方式', dataIndex: 'requestType', key: 'requestType', width: '18%', className: indexStyles.serviceNameDiv,
        render: (text, record, index) => <Tooltip title={text}><span>{text}</span></Tooltip>
      },
      { title: '调用次数', dataIndex: 'count', key: 'count', width: '18%', align: "center" },
      { title: '耗时(ms)', dataIndex: 'duration', key: 'duration', width: '18%', align: "center" },
      { title: '可用性(%)', dataIndex: 'available', key: 'available', width: '20%', align: "center",
        render: (text, record, index) => text == "100" ?
          <Tag style={{background: "green"}}>{text}</Tag> : <Tag style={{background: "red"}}>{text}</Tag>
      }
    ];

    return (
      <div className={indexStyles.tableCDiv}>
        <div className={indexStyles.tableCTitleDiv}>
          <div className={indexStyles.tableCTitleFont}>服务调用</div>
          <div className={indexStyles.tableCTitleTool}>
            <div onClick={() => onShowDetail("zipkin")} className={indexStyles.fontWeightHover}>
              <Tooltip title={"查看详情"}>
                <i className="ri-article-line" style={{fontSize: "19px", marginRight: "15px"}}></i>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className={indexStyles.tableCContentDiv}>
          <Table
            bordered
            tableLayout={"fixed"}
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
