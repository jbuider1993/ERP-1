import React from 'react';
import { connect } from 'dva';
import SystemInfo from "../../components/option/introduction/SystemInfo";

const SystemInfoPage = (props) => {

  const { dispatch, location, optionModel } = props;

  return (
    <SystemInfo />
  );
};

function mapStateToProps({ globalModel, optionModel }) {
  return { globalModel, optionModel };
}

export default connect(mapStateToProps)(SystemInfoPage);
