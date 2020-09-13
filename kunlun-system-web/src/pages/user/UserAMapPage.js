import React from 'react';
import { connect } from 'dva';
import { Map, Marker } from 'react-amap';
import {notification} from 'antd';
import config from '../../config/config';
import AMapTools from '../../components/user/amap/AMapTools';

class UserAMapPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {dispatch, location, amapModel} = this.props;
    const {zoom, center} = amapModel;

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

    const mapEvents = {
      created: (ins) => {},
      click: (e) => {
        const {lng, lat} = e.lnglat;
        const msg = "经度：" + lng + "，维度：" + lat;
        notification.open({
          message: '信息提示',
          description: msg,
          onClick: () => {},
        });
        dispatch({type: "amapModel/updateState", payload: {center: {longitude: lng, latitude: lat}}});
      }
    }

    const markerEvents = {
      created: (markerInstance) => {
        console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        console.log(markerInstance.getPosition());
      },
      click: (e) => {
        const {lng, lat} = e.target.w.position;
        const msg = "经度：" + lng + "，维度：" + lat;
        notification.open({
          message: '信息提示',
          description: msg,
          onClick: () => {},
        });
        dispatch({type: "amapModel/updateState", payload: {zoom: 8, center: {longitude: lng, latitude: lat}}});
      }
    }

    const amapToolsProps = {
      backCenter: () => {
        const {longitude, latitude} = config.amap_info.center;
        dispatch({type: "amapModel/updateState", payload: {zoom: 4, center: {longitude, latitude}}});
      }
    }

    return (
      <div id={"appMap"} style={{width: '100%', height: '100%'}}>
        <Map zoom={zoom} amapkey={config.amap_info.amapkey} plugins={plugins} center={center} events={mapEvents}>
          <Marker position={center} title={"fdlgjklsdjgoaewgio"} visible={true} events={markerEvents}/>
          <AMapTools {...amapToolsProps} />
        </Map>
      </div>
    );
  };
}

function mapStateToProps({ globalModel, amapModel }) {
  return { globalModel, amapModel };
}

export default connect(mapStateToProps)(UserAMapPage);
