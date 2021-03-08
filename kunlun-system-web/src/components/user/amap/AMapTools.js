import React from 'react';
import { Button, Tooltip } from 'antd';
import config from '../../../config/config';
import 'remixicon/fonts/remixicon.css';

const AMapTools = (props) => {

  const {backCenter} = props;

  const map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }

  const wrapperStyle = {
    position: 'absolute',
    top: '13px',
    left: '13px',
    width: "24px",
  }

  return (
    <div style={wrapperStyle} id="zoom-ctrl">
      <Tooltip title={"返回"}>
        <Button onClick={() => backCenter()}>
          <i className="ri-arrow-go-back-line" style={{fontSize: "16px"}} />
        </Button>
      </Tooltip>
    </div>
  );
}

export default AMapTools;
