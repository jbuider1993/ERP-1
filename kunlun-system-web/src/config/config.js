const REGISTRY_AMQP_API = 'http://localhost:8015/kunlun-register-service';
const CACHE_TRACE_API = 'http://localhost:8015/kunlun-basedata-service';
const SYSTEM_SERVICE_API = 'http://localhost:8015/kunlun-system-service';
const PROCESS_API = "http://localhost:8025";
const config = {
  name: '昆仑管理系统',
  footerText: '昆仑管理系统 © 2018-2028 KunLun Copyright | Version 2.0',
  logo: '/logo.png',
  LIMIT_SIZE: 5,
  PAGE_SIZE: 10,
  PAGE_SIZE_LIST: ['10', '20', '50', '100', '200'],
  REGISTRY_AMQP_API,
  CACHE_TRACE_API,
  SYSTEM_SERVICE_API,
  PROCESS_API,
  NEW_PROCESS_API: PROCESS_API + "/create",
  EDIT_PROCESS_API: PROCESS_API + "/static/modeler.html?modelId=",
  amap_info: {
    amapkey: "0d78256ea89beeb8c25d1cd047549d1f",
    // amapkey: "788e08def03f95c670944fe2c78fa76f",
    center: {longitude: 108.947031, latitude: 34.259437},
  },
  registry_api: {
    // 获取MQ队列及交换器
    getMessages: `${REGISTRY_AMQP_API}/mq/getMessages`,
  },
  base_api: {
    // 首页数据
    getUserCount: `${CACHE_TRACE_API}/home/getUserCount`,

    // 消息管理
    getAllMessages: `${SYSTEM_SERVICE_API}/message/getAllMessages`,
    addMessage: `${SYSTEM_SERVICE_API}/message/addMessage`,
    updateMessage: `${SYSTEM_SERVICE_API}/message/updateMessage`,
    batchDeleteMessage: `${SYSTEM_SERVICE_API}/message/batchDeleteMessage`,
  },
  system_api: {
    // 菜单管理
    getMenuList: `${CACHE_TRACE_API}/menu/getAllMenu`,
    addMenu: `${CACHE_TRACE_API}/menu/addMenu`,
    editMenu: `${CACHE_TRACE_API}/menu/editMenu`,
    deleteMenu: `${CACHE_TRACE_API}/menu/deleteMenu`,

    // 图标管理
    getIconList: `${CACHE_TRACE_API}/icon/getAllIcon`,
    addIcon: `${CACHE_TRACE_API}/icon/addIcon`,
    getIconInfo: `${CACHE_TRACE_API}/icon/getIconInfo`,
    fetchIcons: `${CACHE_TRACE_API}/icon/fetchIcons`,
    onExportIcons: `${CACHE_TRACE_API}/icon/onExportIcons`,

    // 数据字典
    getAllDictionaryItem: `${SYSTEM_SERVICE_API}/dict/getAllDictionaryItem`,
    getAllDictionaryValue: `${SYSTEM_SERVICE_API}/dict/getAllDictionaryValue`,
    addDictionaryItem: `${SYSTEM_SERVICE_API}/dict/insertDictionaryItem`,
    addDictionaryValue: `${SYSTEM_SERVICE_API}/dict/insertDictionaryValue`,
    deleteDictionaryItem: `${SYSTEM_SERVICE_API}/dict/deleteDictionaryItem`,
    deleteDictionaryValue: `${SYSTEM_SERVICE_API}/dict/deleteDictionaryValue`,
    updateDictionaryItem: `${SYSTEM_SERVICE_API}/dict/updateDictionaryItem`,
    updateDictionaryValue: `${SYSTEM_SERVICE_API}/dict/updateDictionaryValue`,

    // 用户管理
    getUserList: `${CACHE_TRACE_API}/user/getAllUser`,
    addUser: `${CACHE_TRACE_API}/user/addUser`,
    updateUser: `${CACHE_TRACE_API}/user/updateUser`,
    batchDeleteUser: `${CACHE_TRACE_API}/user/batchDeleteUser`,
    downloadUsers: `${CACHE_TRACE_API}/user/downloadUsers`,

    // 在线用户
    getModelList: `${SYSTEM_SERVICE_API}/service/modelList`,

    // 角色管理
    getRoleList: `${CACHE_TRACE_API}/role/getAllRole`,
    addRole: `${CACHE_TRACE_API}/role/addRole`,
    updateRole: `${CACHE_TRACE_API}/role/updateRole`,
    updateMenuLimit: `${CACHE_TRACE_API}/role/updateMenuLimit`,
    updateAllotUser: `${CACHE_TRACE_API}/role/updateAllotUser`,
    batchDeleteRole: `${CACHE_TRACE_API}/role/batchDeleteRole`,

    // 协同管理
    getOnlineUserList: `${CACHE_TRACE_API}/onlineUser/getAllOnlineUser`,
    deployModel: `${SYSTEM_SERVICE_API}/deploy`,
    getModelNodeList: `${SYSTEM_SERVICE_API}/service/model/XXX/json`,
    batchDeleteModel: `${SYSTEM_SERVICE_API}/service/batchDelete`,

    // 流程管理
    getAllProcess: `${SYSTEM_SERVICE_API}/processList`,
    submitProcess: `${SYSTEM_SERVICE_API}/start`,
    auditProcess: `${SYSTEM_SERVICE_API}/run`,
    getCurrentProcessNode: `${SYSTEM_SERVICE_API}/getCurrentProcessNode`,

    // 资源管理
    getMachineList: `${SYSTEM_SERVICE_API}/machine/getAllMachine`,
    downloadTemplate: `${SYSTEM_SERVICE_API}/machine/downloadTemplate`,

    // 操作日志
    getLogList: `${SYSTEM_SERVICE_API}/log/getLogList`,
    exportOperateLog: `${SYSTEM_SERVICE_API}/log/exportOperateLog`,

    // 事项日程
    getAllSchedules: `${SYSTEM_SERVICE_API}/schedule/getAllSchedules`,
    addSchedule: `${SYSTEM_SERVICE_API}/schedule/addSchedule`,
    updateSchedule: `${SYSTEM_SERVICE_API}/schedule/updateSchedule`,
    deleteSchedule: `${SYSTEM_SERVICE_API}/schedule/deleteSchedule`,
  },

  MENU_LEVEL: [
    { key: "1", value: "menu", name: "菜单" },
    { key: "2", value: "catalog", name: "目录" },
  ],

  STATUS_FLAG: [
    { key: "1", value: true, name: "是", desc: "show" },
    { key: "2", value: false, name: "否", desc: "hide" },
  ],

  USER_SEX: [
    { key: "1", value: "man", name: "男" },
    { key: "2", value: "woman", name: "女" },
  ],

  PROCESS_STATUS: [
    { key: "0", name: "未提交", color: "#1382e8" },
    { key: "1", name: "审核中", color: "#e8dd09" },
    { key: "2", name: "驳回", color: "#e81b24" },
    { key: "3", name: "废止", color: "#e8e8e8" },
    { key: "4", name: "已完成", color: "#25e832" },
  ],

  ICON_STYLE: [
    { key: "line", name: "线框风格"},
    { key: "fill", name: "实底风格"},
  ],

  SERVICE_NAMES: [
    {key: "common", value: "kunlun-common-api", description: "公共模块"},
    {key: "register", value: "kunlun-register-service", description: "服务治理"},
    {key: "gateway", value: "kunlun-gateway-service", description: "服务网关"},
    {key: "basedata", value: "kunlun-basedata-service", description: "基础数据服务"},
    {key: "system-service", value: "kunlun-system-service", description: "业务服务"},
    {key: "home", value: "kunlun-home-web", description: "前端框架"},
    {key: "system-web", value: "kunlun-system-web", description: "前端业务"},
  ],

  MENU_ICON: "down, up, left, right, up-circle, down-circle, left-circle, right-circle, login, logout, menu-fold, " +
             "menu-unfold, fullscreen, fullscreen-exit, question-circle, plus, plus-circle, pause, minus, minus-circle," +
             "exclamation-circle, close, close-circle, check, check-circle, stop, warning, clock-circle, edit, form, copy," +
             "delete, snippets, diff, highlight, redo, radar-chart, lock, unlock, bars, book, calender, cloud, cloud-download," +
             "credit-card, desktop, download, file, file-text, folder, folder-open, folder-add, hdd, laptop, appstore, link," +
             "mail, mobile, notification, picture, poweroff, reload, search, setting, share-alt, shopping-cart, tablet, tag," +
             "tags, upload, user, video-camera, home, loading, cloud-upload, star, heart, eye, eye-invisible, camera, save, team," +
             "solution, phone, filter, exception, import, export, qrcode, scan, like, message, pay-circle, calculator, bulb, select," +
             "switcher, rocket, bell, database, compass, barcode, key, flag, layout, printer, sound, usb, skin, tool, sync, wifi," +
             "schedule, user-add, user-delete, gift, bank, contacts, global, table, profile, audit, read, cluster, block, project," +
             "dollar, file-done, gateway, ie, chrome, windows, apple, android, qq, wechat, codepen, code-sandbox, ant-design",
};

export default config;
