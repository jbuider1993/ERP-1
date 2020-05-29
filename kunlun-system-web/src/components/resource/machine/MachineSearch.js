import React from 'react';
import { Form, Row, Col, Input, Button, AutoComplete, Icon } from 'antd';
import config from '../../../config/config';
import index from "../../../index.less";
import commonStyles from '../../../pages/index.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

const MachineSearch = (props) => {

  const { onSearch } = props;
  const [form] = Form.useForm();
  const { getFieldsValue, validateFields, setFieldsValue, resetFields } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const searchMachineList = () => {
    const params = getFieldsValue();
    onSearch(params);
  };

  const menuLevelOptions = config.MENU_LEVEL.map(item => <Option key={item.key} value={item.name}>{item.name}</Option>);

  return (
    <div style={{ marginLeft: "-25px", marginBottom: "-18.5px" }} className={commonStyles.singleRowSearch}>
      <Form>
        <Row className={index.formRowDiv}>
          <Col span={6}>
            <FormItem label={"菜单名称"} {...formItemLayout} name={"name"}>
              <Input placeholder={"请输入菜单名称"} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={"访问路径"} {...formItemLayout} name={"url"}>
              <Input placeholder={"请输入访问路径"} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={"菜单级别"} {...formItemLayout} name={"level"}>
              <AutoComplete
                placeholder={"请输入菜单级别"}
                dataSource={menuLevelOptions}
              >
                <Input suffix={<Icon type="down" className="certain-category-icon" />} />
              </AutoComplete>
            </FormItem>
          </Col>
          <Col span={6}>
            <div style={{ marginTop: "4px", marginLeft: "10px" }}>
              <Button onClick={searchMachineList} icon={"search"} style={{border: "0px", background: window._THEMECOLOR_}}>查询</Button>
              <Button onClick={() => resetFields()} style={{ marginLeft: "10px" }} icon={"rest"}>重置</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MachineSearch;
