window.onload = function () {
  window.addEventListener("message", function (args) {
    // 拦截非法监听
    if (args != window.parent && !args.data.isAuth) return;

    // 缓存父IFrame传递的参数
    const token = args.data.token;
    const userInfo = args.data.userInfo;
    const themeColor = args.data.themeColor;
    const isThemeChange = args.data.isThemeChange;
    window._TOKEN_ = token;
    window._USERINFO_ = userInfo ? JSON.parse(userInfo) : userInfo;
    window._THEMECOLOR_ = themeColor;
    window.g_app._store.dispatch({type: "globalModel/setTokenModel", payload: {token, userInfo, themeColor}});

    // 第一次渲染IFrame时TOKEN未取到，等TOKEN带过来后再次访问页面
    const pathname = window.location.pathname;
    console.log("===== System app onLoad pathname " + pathname + " =====");
    window.g_app._history.push({pathname: window.location.pathname});
  });
}
