const GATEWAY_SERVICE_API = 'http://localhost:8015/kunlun-gateway-service';
const BASEDATA_SERVICE_API = 'http://localhost:8015/kunlun-basedata-service';
const SYSTEM_SERVICE_API = 'http://localhost:8015/kunlun-system-service';
const WEB_SYSTEM_API = 'http://localhost:8005';
const ACTIVITI_PROCESS_API = "http://localhost:8025";
const config = {
  name: '昆仑管理系统',
  footerText: '昆仑管理系统 © 2018-2028 KunLun Copyright | Version 1.0.0',
  LIMIT_SIZE: 5,
  PAGE_SIZE: 10,
  WEB_SYSTEM_API,
  GATEWAY_SERVICE_API,
  BASEDATA_SERVICE_API,
  SYSTEM_SERVICE_API,
  ACTIVITI_PROCESS_API,
  DEFAULT_THEME_COLOR: "#31ac90",
  DEFAULT_SIDER_COLOR: "#ffffff",
  base_cache_api: {
    // 验证码
    getAuthCode: `${BASEDATA_SERVICE_API}/code/getAuthCode`,

    // 系统菜单
    getAppMenu: `${BASEDATA_SERVICE_API}/menu/getAppMenu`,

    // 消息管理
    getAllMessages: `${SYSTEM_SERVICE_API}/message/getAllMessages`,
  },
  gate_way_api: {
    // 登录
    login: `${GATEWAY_SERVICE_API}/shiro/login`,
    logout: `${GATEWAY_SERVICE_API}/shiro/logout`,
  },
  system_api: {
    // 待办
    getTodoList: `${SYSTEM_SERVICE_API}/processList`,
  },
  frame_menu: {
    main: [
      { key: "home", url: WEB_SYSTEM_API + "/home", icon: "ri-home-4-line", name: "首页", show: true },
      { key: "user", url: "", icon: "ri-user-line", name: "用户管理", show: true },
      { key: "synergy", url: "", icon: "ri-codepen-line", name: "协同管理", show: true },
      { key: "resource", url: "", icon: "ri-file-cloud-line", name: "资源管理", show: true },
      { key: "option", url: "", icon: "ri-settings-3-line", name: "系统管理", show: true },
    ],
    sider: {
      user: [
        { key: "list", url: WEB_SYSTEM_API + "/user/list", icon: "ri-team-line", name: "人员用户", show: true },
        { key: "role", url: WEB_SYSTEM_API + "/user/role", icon: "ri-file-user-line", name: "角色权限", show: true },
        { key: "online", url: WEB_SYSTEM_API + "/user/online", icon: "ri-global-line", name: "在线用户", show: true },
        { key: "amap", url: WEB_SYSTEM_API + "/user/amap", icon: "ri-map-pin-user-line", name: "用户地图", show: true },
      ],
      synergy: [
        { key: "model", url: WEB_SYSTEM_API + "/synergy/model", icon: "ri-government-line", name: "模型管理", show: true },
        { key: "create", url: ACTIVITI_PROCESS_API + "/service/create", icon: "ri-community-line", name: "模型创建", show: false },
        { key: "update", url: ACTIVITI_PROCESS_API + "/static/modeler.html?modelId=", icon: "ri-hotel-line", name: "模型编辑", show: false },
        { key: "process", url: WEB_SYSTEM_API + "/synergy/process", icon: "ri-qr-scan-line", name: "流程管理", show: true },
        { key: "todo", url: WEB_SYSTEM_API + "/synergy/todo", icon: "ri-todo-line", name: "待办任务", show: false },
        { key: "log", url: WEB_SYSTEM_API + "/synergy/log", icon: "ri-article-line", name: "操作日志", show: true },
        { key: "schedule", url: WEB_SYSTEM_API + "/synergy/schedule", icon: "ri-calendar-todo-line", name: "事项日程", show: true },
      ],
      resource: [
        { key: "druid", url: "http://localhost:8025/druid/index.html", icon: "ri-database-2-line", name: "Druid数据库", show: true },
        { key: "eureka", url: "http://localhost:8010/", icon: "ri-cloud-line", name: "Eureka中心", show: true },
        { key: "zipkin", url: "http://localhost:8020/zipkin/", icon: "ri-file-search-line", name: "调用链追踪", show: true },
        { key: "rabbitmq", url: "http://localhost:15672/", icon: "ri-message-2-line", name: "RabbitMQ管理", show: true },
        { key: "hystrix", url: "http://localhost:8015/hystrix", icon: "ri-search-eye-line", name: "Hystrix监控", show: true },
        { key: "virtual", url: WEB_SYSTEM_API + "/resource/virtual", icon: "ri-eye-line", name: "环境监控", show: true },
        { key: "service", url: WEB_SYSTEM_API + "/resource/service", icon: "ri-customer-service-line", name: "服务监控", show: true },
      ],
      option: [
        { key: "menu", url: WEB_SYSTEM_API + "/option/menu", icon: "ri-windows-line", name: "菜单管理", show: true },
        { key: "icon", url: WEB_SYSTEM_API + "/option/icon", icon: "ri-remixicon-line", name: "图标管理", show: true },
        { key: "dictionary", url: WEB_SYSTEM_API + "/option/dictionary", icon: "ri-book-read-line", name: "数据字典", show: true },
        { key: "notice", url: WEB_SYSTEM_API + "/option/notice", icon: "ri-notification-line", name: "通知公告", show: true },
        { key: "interface", url: "http://localhost:8015/swagger-ui.html", icon: "ri-file-text-line", name: "接口文档", show: true},
        { key: "info", url: WEB_SYSTEM_API + "/option/info", icon: "ri-information-line", name: "关于我们", show: true },
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
