import React from 'react';
import { Button } from 'antd';
import config from '../../../config/config';

const AMapTools = (props) => {

  const map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }

  const wrapperStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '5px',
    border: '1px solid #333'
  };
  const spanStyle = {
    display: 'inline-block',
    height: '30px',
    lineHeight: '30px',
    width: '30px',
    textAlign: 'center',
    borderRadius: '50%',
    margin: '0 5px',
    cursor: 'pointer',
    background: '#333',
    color: '#fff',
    fontSize: '16px',
    border: '1px solid #333'
  };
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  const backCenter = () => {
    map.B.center.lng = config.center.longitude;
    map.B.center.lat = config.center.latitude;
  };

  return (
    <div style={wrapperStyle} id="zoom-ctrl">
      <span style={spanStyle} onClick={zoomIn}>+</span>
      <span style={spanStyle} onClick={zoomOut}>-</span>
      <Button type={"primary"} onClick={() => backCenter()}>返回中心</Button>
      <Button type={"primary"}>显示3D</Button>
    </div>
  );
};

export default AMapTools;
