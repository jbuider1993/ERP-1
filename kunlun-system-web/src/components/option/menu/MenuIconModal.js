import React from 'react';
import {Table, Modal, Form, Row, Col, Input, Button, Spin} from 'antd';
import config from '../../../config/config';
import styles from './Menu.less';
import 'remixicon/fonts/remixicon.css';

const FormItem = Form.Item;

class MenuIconModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIconRows: [],
      selectedIconRowKeys: [],
    }
  }

  render() {

    const {menuIconModalVisible, menuIconLoading, onCancel, menuIconList, onselectMenuIcon, iconCurrentPage, iconTotal, onIconPageChange} = this.props;
    const {selectedIconRows, selectedIconRowKeys} = this.state;

    const rowSelection = {
      type: "radio",
      selectedIconRows,
      selectedIconRowKeys,
      onChange: (selectedIconRowKeys, selectedIconRows) => {
        this.setState({ selectedIconRowKeys, selectedIconRows });
      }
    };

    const onOk = () => {
      onselectMenuIcon(selectedIconRowKeys, selectedIconRows);
    };

    const columns = [
      {title: '序号', key: 'name', width: '15%', render: (text, record, index) => (index + 1) + (iconCurrentPage - 1) * config.LIMIT_SIZE, align: "center" },
      {title: '图标名称', dataIndex: 'name', key: 'name', width: '25%'},
      {title: '图标key', dataIndex: 'key', key: 'key', width: '25%'},
      {title: '图标', key: 'key', align: "center", render: (text, record, index) => <i className={record.key} style={{fontSize: "19px"}}/> }];

    const pagination = {
      total: iconTotal,
      current: iconCurrentPage,
      pageSize: config.LIMIT_SIZE,
      onChange: onIconPageChange,
      showSizeChanger: false
    };

    return (
      <div>
        <Modal
          visible={menuIconModalVisible}
          title={"选择图标"}
          onCancel={onCancel}
          onOk={onOk}
          width={650}
          destroyOnClose={true}
        >
          <Spin spinning={menuIconLoading}>
          <Form>
            <Row>
              <Col span={12}>
                <FormItem>
                  <Input placeholder={"请输入图标名称"} />
                </FormItem>
              </Col>
              <Col span={12}>
                <Button type={"primary"} style={{marginLeft: "10px"}}>查询</Button>
                <Button style={{marginLeft: "10px"}}>重置</Button>
              </Col>
            </Row>
          </Form>
          <Table
            className={styles.menuTable}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={menuIconList}
            bordered
            rowKey={record => record.id}
            pagination={pagination}
          />
          </Spin>
        </Modal>
      </div>
    );
  };
}

export default MenuIconModal;
