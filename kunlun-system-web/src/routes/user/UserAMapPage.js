import React from 'react';
import { connect } from 'dva';
import { Map, Marker } from 'react-amap';
import {notification} from 'antd';
import config from '../../config/config';
import AMapTools from '../../components/user/amap/AMapTools';

class UserAMapPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // 默认中心位置：西安鼓楼经纬度
      center: {longitude: config.amap_info.center.longitude, latitude: config.amap_info.center.latitude}
    };
  }

  render() {

    const {dispatch, location, userModel} = this.props;

    const plugins = [
      'MapType',
      'Scale',
      'OverView',
      // 'ControlBar', // v1.1.0 新增
      {
        name: 'ToolBar',
        options: {
          visible: true,  // 不设置该属性默认就是 true
          onCreated(ins) {
          },
        },
      }
    ];

    const events = {
      created: (ins) => {
      },
      click: (e) => {
        const msg = "经度：" + e.lnglat.lng + "，维度：" + e.lnglat.lat;
        notification.open({
          message: '信息提示',
          description: msg,
          onClick: () => {
          },
        });
        this.setState({center: {longitude: e.lnglat.lng, latitude: e.lnglat.lat}});
      }
    };

    return (
      <div id={"app"} style={{width: '100%', height: '100%', paddingBottom: "15px"}}>
        <Map amapkey={config.amap_info.amapkey} plugins={plugins} center={this.state.center} events={events}>
          <Marker position={this.state.center} title={"fdlgjklsdjgoaewgio"} visible={true}/>
          <AMapTools />
        </Map>
      </div>
    );
  };
}

function mapStateToProps({ userModel }) {
  return { userModel };
}

export default connect(mapStateToProps)(UserAMapPage);
