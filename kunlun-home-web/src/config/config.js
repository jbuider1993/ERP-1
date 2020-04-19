const GATE_WAY_API = 'http://localhost:8015/kunlun-gateway-service';
const CACHE_TRACE_API = 'http://localhost:8015/kunlun-basedata-service';
const LOCAL_API = 'http://localhost:8005';
const EUREKA_MANAGE_API = 'http://localhost:8010/';
const ZIPKIN_MANAGE_API = 'http://localhost:8020/zipkin/';
const DRUID_MANGE_API = 'http://localhost:8025/druid/index.html';
const RABBITMQ_MANGE_API = 'http://localhost:15672/';
const SWAGGER_API = 'http://localhost:8015/swagger-ui.html';
const SYSTEM_SERVICE_API = 'http://localhost:8015/kunlun-system-service';
const PROCESS_API = "http://localhost:8025";
const config = {
  name: '昆仑管理系统',
  footerText: '昆仑管理系统 © 2018-2028 KunLun Copyright | Version 2.0',
  logo: '/logo.png',
  LIMIT_SIZE: 5,
  PAGE_SIZE: 10,
  LOCAL_API,
  GATE_WAY_API,
  CACHE_TRACE_API,
  EUREKA_MANAGE_API,
  ZIPKIN_MANAGE_API,
  DRUID_MANGE_API,
  RABBITMQ_MANGE_API,
  SWAGGER_API,
  SYSTEM_SERVICE_API,
  PROCESS_API,
  base_cache_api: {
    // 验证码
    getAuthCode: `${CACHE_TRACE_API}/code/getAuthCode`,

    // 系统菜单
    getAppMenu: `${CACHE_TRACE_API}/menu/getAppMenu`,

    // 消息管理
    getAllMessages: `${CACHE_TRACE_API}/message/getAllMessages`,
  },
  gate_way_api: {
    // 登录
    login: `${GATE_WAY_API}/shiro/login`,
    logout: `${GATE_WAY_API}/shiro/logout`,
  },
  system_api: {
    // 待办
    getTodoList: `${SYSTEM_SERVICE_API}/processList`,
  },
  frame_menu: {
    main: [
      { key: "home", url: LOCAL_API + "/home", icon: "ri-home-4-line", name: "首页", isHeaderToken: true,isShow: true },
      { key: "user", url: "", icon: "ri-user-line", name: "用户管理", isHeaderToken: true, isShow: true },
      { key: "synergy", url: "", icon: "ri-codepen-line", name: "协同管理", isHeaderToken: true, isShow: true },
      { key: "resource", url: "", icon: "ri-file-cloud-line", name: "资源管理", isHeaderToken: true, isShow: true },
      { key: "option", url: "", icon: "ri-settings-3-line", name: "系统管理", isHeaderToken: true, isShow: true },
    ],
    sider: {
      user: [
        { key: "list", url: LOCAL_API + "/user/list", icon: "ri-team-line", name: "人员用户", isHeaderToken: true, isShow: true },
        { key: "role", url: LOCAL_API + "/user/role", icon: "ri-file-user-line", name: "角色权限", isHeaderToken: true, isShow: true },
        { key: "online", url: LOCAL_API + "/user/online", icon: "ri-global-line", name: "在线用户", isHeaderToken: true, isShow: true },
        { key: "amap", url: LOCAL_API + "/user/amap", icon: "ri-map-pin-user-line", name: "用户地图", isHeaderToken: true, isShow: true },
      ],
      synergy: [
        { key: "model", url: LOCAL_API + "/synergy/model", icon: "ri-government-line", name: "模型管理", isHeaderToken: true, isShow: true },
        { key: "create", url: PROCESS_API + "/create", icon: "ri-community-line", name: "模型创建", isHeaderToken: false, isShow: false },
        { key: "update", url: PROCESS_API + "/static/modeler.html?modelId=", icon: "ri-hotel-line", isHeaderToken: false, name: "模型编辑", isShow: false },
        { key: "process", url: LOCAL_API + "/synergy/process", icon: "ri-qr-scan-line", name: "流程管理", isHeaderToken: true, isShow: true },
        { key: "todo", url: LOCAL_API + "/synergy/todo", icon: "ri-todo-line", name: "待办任务", isHeaderToken: true, isShow: false },
        { key: "log", url: LOCAL_API + "/synergy/log", icon: "ri-article-line", name: "操作日志", isHeaderToken: true, isShow: true },
        { key: "schedule", url: LOCAL_API + "/synergy/schedule", icon: "ri-calendar-todo-line", isHeaderToken: true, name: "事项日程", isShow: true },
      ],
      resource: [
        { key: "druid", url: DRUID_MANGE_API, icon: "ri-database-2-line", name: "Druid数据库", isHeaderToken: false, isShow: true },
        { key: "eureka", url: EUREKA_MANAGE_API, icon: "ri-cloud-line", name: "Eureka中心", isHeaderToken: false, isShow: true },
        { key: "zipkin", url: ZIPKIN_MANAGE_API, icon: "ri-file-search-line", name: "调用链追踪", isHeaderToken: false, isShow: true },
        { key: "rabbitmq", url: RABBITMQ_MANGE_API, icon: "ri-message-2-line", name: "RabbitMQ管理", isHeaderToken: false, isShow: true },
        { key: "virtual", url: LOCAL_API + "/resource/virtual", icon: "ri-eye-line", name: "环境监控", isHeaderToken: true, isShow: true },
        { key: "service", url: LOCAL_API + "/resource/service", icon: "ri-customer-service-line", name: "服务监控", isHeaderToken: true, isShow: true },
      ],
      option: [
        { key: "menu", url: LOCAL_API + "/option/menu", icon: "ri-windows-line", name: "菜单管理", isHeaderToken: true, isShow: true },
        { key: "icon", url: LOCAL_API + "/option/icon", icon: "ri-remixicon-line", name: "图标管理", isHeaderToken: true, isShow: true },
        { key: "dictionary", url: LOCAL_API + "/option/dictionary", icon: "ri-book-read-line", name: "数据字典", isHeaderToken: true, isShow: true },
        { key: "notice", url: LOCAL_API + "/option/notice", icon: "ri-notification-line", name: "通知公告", isHeaderToken: true, isShow: true },
        { key: "interface", url: SWAGGER_API, icon: "ri-file-text-line", name: "接口文档", isShow: true, isHeaderToken: false, children: null},
        { key: "info", url: LOCAL_API + "/option/info", icon: "ri-information-line", name: "关于我们", isHeaderToken: true, isShow: true },
      ]
    }
  },
  theme_color: [
    {key: "1", value: "#5adf96", name: "叶兰绿"},
    {key: "1", value: "#f5515f", name: "赤诚红"},
    {key: "1", value: "#9958dc", name: "玉烟紫"},
    {key: "1", value: "#f7889c", name: "芙蕖粉"},
    {key: "1", value: "#304269", name: "露莓黑"},
    {key: "1", value: "#1890ff", name: "经典蓝"},
  ]
};

export default config;
