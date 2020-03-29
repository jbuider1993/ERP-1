import dva from 'dva';
import './index.less';
import 'antd/dist/antd.css';
import createLoading from 'dva-loading';

// window.onload = function() {
//
//   window.addEventListener('message', function (e) {
//
//     if (e.source != window.parent || !e.data.isAuth) {
//       return;
//     }
//
//     window._TOKEN_ = !!e.data && e.data.token || '';
//     window._USERINFO_ = !!e.data && e.data.userInfo || '';
//
//     console.log("========== Message SUCCESS ==========");
//     console.log("token ===>>> " + window._TOKEN_);
//
//     // 1. Initialize
//     window.app = dva();
//
//     // 2. Plugins
//     window.app.use(createLoading());
//
//     // 3. Model
//     window.app.model(require('./models/globalModel').default);
//
//     // 4. Router
//     window.app.router(require('./router').default);
//
//     // 5. Start
//     window.app.start('#root');
//   });
// };

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/globalModel').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
