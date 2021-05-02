import HomePage from '../pages/home/HomePage';
import UserPage from '../pages/user/UserPage';
import RolePage from '../pages/user/RolePage';
import OnlinePage from '../pages/user/OnlinePage';
import UserAMapPage from '../pages/user/UserAMapPage';
import ModelPage from '../pages/synergy/ModelPage';
import ProcessPage from '../pages/synergy/ProcessPage';
import OperatorLogPage from '../pages/synergy/OperatorLogPage';
import SchedulePage from '../pages/synergy/SchedulePage';
import MachinePage from '../pages/resource/MachinePage';
import InstancePage from '../pages/resource/InstancePage';
import MenuPage from '../pages/option/MenuPage';
import IconPage from '../pages/option/IconPage';
import DictionaryPage from '../pages/option/DictionaryPage';
import MessagePage from '../pages/option/MessagePage';
import SystemInfoPage from '../pages/option/SystemInfoPage';
import DepartmentPage from '../pages/user/DepartmentPage';
import WorkPostPage from '../pages/user/WorkPostPage';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import styles from './index.css';

function BasicLayout(props) {

  const showPageByPath = () => {
    let urlPath = props.location.pathname;
    if (props.location.hash != "") {
      urlPath = props.location.hash;
      if (props.location.hash.indexOf("?") > -1) {
        urlPath = props.location.hash.substr(0, props.location.hash.indexOf("?"));
      }
    }
    let childrenElements = <div></div>;
    switch (urlPath) {
      case "/home": {
        childrenElements = <HomePage />;
        break;
      }
      case "/user/list": {
        childrenElements = <UserPage />;
        break;
      }
      case "/user/role": {
        childrenElements = <RolePage />;
        break;
      }
      case "/user/online": {
        childrenElements = <OnlinePage />;
        break;
      }
      case "/user/amap": {
        childrenElements = <UserAMapPage />;
        break;
      }
      case "/user/department": {
        childrenElements = <DepartmentPage />;
        break;
      }
      case "/user/post": {
        childrenElements = <WorkPostPage />;
        break;
      }
      case "/synergy/model": {
        childrenElements = <ModelPage />;
        break;
      }
      case "/synergy/process":
      case "/synergy/todo": {
        childrenElements = <ProcessPage />;
        break;
      }
      case "/synergy/log": {
        childrenElements = <OperatorLogPage />;
        break;
      }
      case "/synergy/schedule": {
        childrenElements = <SchedulePage />;
        break;
      }
      case "/resource/virtual": {
        childrenElements = <MachinePage />;
        break;
      }
      case "/resource/service": {
        childrenElements = <InstancePage />;
        break;
      }
      case "/option/menu": {
        childrenElements = <MenuPage />;
        break;
      }
      case "/option/icon": {
        childrenElements = <IconPage />;
        break;
      }
      case "/option/dictionary": {
        childrenElements = <DictionaryPage />;
        break;
      }
      case "/option/notice": {
        childrenElements = <MessagePage />;
        break;
      }
      case "/option/info": {
        childrenElements = <SystemInfoPage />;
        break;
      }
      default: {
        childrenElements = <HomePage />;
        break;
      }
    }
    return childrenElements;
  };

  return (
    <div id="layout" className={styles.layout} style={{padding: props.location.pathname == "/home" ? "0px" : "20px"}}>
      <LocaleProvider locale={zhCN} style={{ height: "100%", width: "100%"}}>
        { showPageByPath() }
      </LocaleProvider>
    </div>
  );
}

export default BasicLayout;
