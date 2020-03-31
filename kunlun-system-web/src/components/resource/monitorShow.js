import React from 'react';
import { Card, Col, Row } from 'antd';

const CardShowDatas = (props) => {

  return (
    <div style={{ background: '#ECECEC', padding: '15px' }}>
      <Row gutter={15}>
        <Col span={12}>
          <Card title="CPU" bordered={false}>Card content</Card>
        </Col>
        <Col span={12}>
          <Card title="Memory" bordered={false}>Card content</Card>
        </Col>
      </Row>
      <Row gutter={15} style={{ marginTop: "15px" }}>
        <Col span={24}>
          <Card title="服务器信息" bordered={false}>Card content</Card>
        </Col>
      </Row>
      <Row gutter={15} style={{ marginTop: "15px" }}>
        <Col span={24}>
          <Card title="Java虚拟机信息" bordered={false}>Card content</Card>
        </Col>
      </Row>
      <Row gutter={15} style={{ marginTop: "15px", marginBottom: "40px" }}>
        <Col span={24}>
          <Card title="磁盘状态" bordered={false}>Card content</Card>
        </Col>
      </Row>
    </div>
  );
};

export default CardShowDatas;
