import {LocaleProvider, message} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LoginPage from '../pages/LoginPage';
import AppPage from '../pages/AppPage';

function BasicLayout(props) {

  const showPageByPath = () => {
    let urlPath = props.location.pathname;
    if (props.location.hash != "") {
      urlPath = props.location.hash;
      if (props.location.hash.indexOf("?") > -1) {
        urlPath = props.location.hash.substr(0, props.location.hash.indexOf("?"));
      }
    }
    let childrenElements;
    switch (urlPath) {
      case "/": {
        childrenElements = <LoginPage />;
        break;
      }
      case "/scmp": {
        childrenElements = <AppPage />;
        break;
      }
      default: {
        message.warning("访问地址有误！");
        break;
      }
    }
    return childrenElements;
  };

  return (
    <LocaleProvider locale={zhCN} style={{ height: "100%", width: "100%"}}>
      { showPageByPath() }
    </LocaleProvider>
  );
}

export default BasicLayout;
