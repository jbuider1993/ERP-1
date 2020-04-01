const GATE_WAY_API = 'http://localhost:8015/gate-way';
const CACHE_TRACE_API = 'http://localhost:8015/base-cache';
const LOCAL_API = 'http://localhost:8005';
const EUREKA_MANAGE_API = 'http://localhost:8010/';
const ZIPKIN_MANAGE_API = 'http://localhost:8020/zipkin/';
const DRUID_MANGE_API = 'http://localhost:8025/druid/index.html';
const RABBITMQ_MANGE_API = 'http://localhost:15672/';
const BASE_SWAGGER_API = 'http://localhost:8020/swagger-ui.html';
const SYSTEM_SWAGGER_API = 'http://localhost:8025/swagger-ui.html';
const SYSTEM_SERVICE_API = 'http://localhost:8015/system-service';
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
  BASE_SWAGGER_API,
  SYSTEM_SWAGGER_API,
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
      { key: "home", url: "/home", icon: "home", name: "首页", isShow: true },
      { key: "user", url: "", icon: "user", name: "用户管理", isShow: true },
      { key: "synergy", url: "", icon: "codepen", name: "协同管理", isShow: true },
      { key: "resource", url: "", icon: "solution", name: "资源管理", isShow: true },
      { key: "option", url: "", icon: "setting", name: "系统管理", isShow: true },
    ],
    sider: {
      user: [
        { key: "list", url: "/user/list", icon: "team", name: "人员用户", isShow: true },
        { key: "role", url: "/user/role", icon: "database", name: "角色权限", isShow: true },
        { key: "online", url: "/user/online", icon: "global", name: "在线用户", isShow: true },
        { key: "amap", url: "/user/amap", icon: "environment", name: "用户地图", isShow: true },
      ],
      synergy: [
        { key: "model", url: "/synergy/model", icon: "project", name: "模型管理", isShow: true },
        { key: "create", url: PROCESS_API + "/create", icon: "project", name: "模型创建", isShow: false },
        { key: "update", url: PROCESS_API + "/static/modeler.html?modelId=", icon: "project", name: "模型编辑", isShow: false },
        { key: "process", url: "/synergy/process", icon: "audit", name: "流程管理", isShow: true },
        { key: "todo", url: "/synergy/todo", icon: "schedule", name: "待办任务", isShow: false },
        { key: "log", url: "/synergy/log", icon: "file-protect", name: "操作日志", isShow: true },
        { key: "schedule", url: "/synergy/schedule", icon: "schedule", name: "事项日程", isShow: true },
      ],
      resource: [
        { key: "druid", url: DRUID_MANGE_API, icon: "database", name: "Druid数据库", isShow: true },
        { key: "eureka", url: EUREKA_MANAGE_API, icon: "pic-center", name: "Eureka中心", isShow: true },
        { key: "zipkin", url: ZIPKIN_MANAGE_API, icon: "file-search", name: "调用链追踪", isShow: true },
        { key: "rabbitmq", url: RABBITMQ_MANGE_API, icon: "notification", name: "RabbitMQ管理", isShow: true },
        { key: "virtual", url: "/resource/virtual", icon: "eye", name: "环境监控", isShow: true },
        { key: "service", url: "/resource/service", icon: "customer-service", name: "服务监控", isShow: true },
      ],
      option: [
        { key: "menu", url: "/option/menu", icon: "windows", name: "菜单管理", isShow: true },
        { key: "icon", url: "/option/icon", icon: "select", name: "图标管理", isShow: true },
        { key: "dictionary", url: "/option/dictionary", icon: "read", name: "数据字典", isShow: true },
        { key: "notice", url: "/option/notice", icon: "message", name: "通知公告", isShow: true },
        { key: "interface", url: "", icon: "file", name: "接口文档", isShow: true, children: [
            { key: "trace", url: BASE_SWAGGER_API, icon: "file-markdown", name: "缓存链路", isShow: true },
            { key: "business", url: SYSTEM_SWAGGER_API, icon: "file-ppt", name: "业务服务", isShow: true },
        ]},
        { key: "info", url: "/option/info", icon: "info-circle", name: "关于我们", isShow: true },
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
