window.onload = function() {

  window.addEventListener('message', function (e) {

    // 消息来源只能是父级iframe并被auth
    if (e.source != window.parent && !e.data.isAuth) {
      return;
    }

    // 首次加载传递Token及登录用户信息
    if (e.data.isAuth) {
      window._TOKEN_ = !!e.data && e.data.token || '';
      window._USERINFO_ = !!e.data && e.data.userInfo || '';
    }
  });
};
