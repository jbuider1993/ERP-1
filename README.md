# 昆仑管理系统

<p align="center"> 
    <img src="https://img.shields.io/circleci/project/vuejs/vue/dev.svg" alt="Build Status">
    <img src="https://img.shields.io/badge/Spring%20Cloud-Greenwich.SR5-blue.svg" alt="Coverage Status">
    <img src="https://img.shields.io/badge/Spring%20Boot-2.1.7.RELEASE-blue.svg" alt="Downloads">
</p>

#### 系统介绍
昆仑管理系统基于前后端分离架构，通过Apache Shiro与Jwt组件，用token进行数据交互认证，可快速开发并独立进行Docker容器化部署。

kunlun-web 基于React + Umi(乌米) + Ant Design (蚂蚁金服) 构建开发，提供前端解决方案，其中kunlun-home-web为前端框架，主要负责登录页面、业务菜单、消息待办、主题皮肤等信息的展示；kunlun-system-web为前端业务服务，主要用于展示各个菜单的业务功能页面，如首页信息、人员管理、用户地图、流程管理、操作日志、事项日程、服务资源管理、菜单管理等。

kunlun-service 基于 SpringBoot 与 Spring Cloud 构建开发，提供后端基于微服务架构的解决方案，其中kunlun-common-api为公共模块，提供公共基础模型、工具、自动配置等，kunlun-register-service为服务治理模块，提供服务注册、服务发现、服务心跳检测及高级消息队列等，kunlun-gateway-service为服务网关模块，提供服务路由及分布式服务配置中心等，kunlun-basedata-service为基础数据模块，提供基础数据支持，如菜单、角色、权限等，并提供分布式缓存功能等，kunlun-system-service为业务服务模块，提供业务功能支持服务。


#### 软件架构
<table>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0411/165451_44bb82b5_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0411/165543_a617076b_1894302.png"/></td>
    </tr>
</table>


#### 使用说明

1.  npm安装前端依赖库，并启动kunlun-home-web与kunlun-system-web服务；
2.  启动PostgreSQL，执行kunlun-basedata-service与kunlun-system-service服务resources下的sql文件；
3.  启动RabbitMQ和Redis；
4.  启动注册中心kunlun-register-service；
5.  依次启动kunlun-gateway-service、kunlun-basedata-service与kunlun-system-service服务；
6.  访问URL：http://localhost:8000；
7.  输入账号：admin，密码：admin及验证码。


#### 功能说明

1.  统一安全认证中心，支持用户名、密码加图形验证码登录
2.  微服务架构基础支撑，支持服务注册发现、路由与负载均衡，服务熔断与限流，统一配置中心
3.  系统服务监控中心，支持服务调用链监控，微服务监控
4.  系统业务支撑，支持统一跨域处理，统一异常处理，统一处理操作日志，服务内部Swagger接口文档
5.  基于docker容器化部署


#### 工具插件

<table>
    <tr>
        <td>后端框架</td>
        <td>前端框架</td>
    </tr>
    <tr>
        <td>
            <table>
                <tr>
                    <td>核心框架</td>
                    <td><a target = "_blank" href={"https://spring.io/projects/spring-boot"}>Spring Boot</a></td>
                </tr>
                <tr>
                    <td>服务架构</td>
                    <td><a target = "_blank" href={"https://spring.io/projects/spring-cloud"}>Spring Cloud</a></td>
                </tr>
                <tr>
                    <td>安全框架</td>
                    <td><a target = "_blank" href={"http://shiro.apache.org/"}>apache Shiro</a>、<a target = "_blank" href={"https://jwt.io/"}>Jwt</a></td>
                </tr>
                <tr>
                    <td>持久层框架</td>
                    <td><a target = "_blank" href={"http://www.mybatis.org/mybatis-3/zh/index.html"}>MyBatis</a></td>
                </tr>
                <tr>
                    <td>数据库连接池</td>
                    <td><a target = "_blank" href={"https://github.com/alibaba/druid"}>Druid</a></td>
                </tr>
                <tr>
                    <td>数据库</td>
                    <td>PosgreSQL、<a target = "_blank" href={"https://redis.io/"}>Redis</a></td>
                </tr>
                <tr>
                    <td>工作流引擎</td>
                    <td><a target = "_blank" href={"https://www.activiti.org/documentation"}>Activiti-5.22.0</a></td>
                </tr>
                <tr>
                    <td>脚本执行</td>
                    <td>Flyway</td>
                </tr>
                <tr>
                    <td>资源爬取</td>
                    <td><a target = "_blank" href={"https://www.selenium.dev/"}>Selenium</a></td>
                </tr>
                <tr>
                    <td>消息组件</td>
                    <td><a target = "_blank" href={"https://www.rabbitmq.com/"}>RabbitMQ</a></td>
                </tr>
                <tr>
                    <td>全局搜索</td>
                    <td><a target = "_blank" href={"https://www.elastic.co/"}>ElasticSearch</a></td>
                </tr>
            </table>
        </td>
        <td>
            <table>
                <tr>
                    <td>前端技术栈</td>
                    <td><a target = "_blank" href={"https://github.com/facebook/react"}>react</a></td>
                </tr>
                <tr>
                    <td>前端框架</td>
                    <td><a target = "_blank" href={"https://umijs.org/"}>Umi</a></td>
                </tr>
                <tr>
                    <td>数据流框架</td>
                    <td><a target = "_blank" href={"https://dvajs.com/guide/"}>Dva</a></td>
                </tr>
                <tr>
                    <td>前端UI库</td>
                    <td><a target = "_blank" href={"https://ant.design/index-cn"}>Ant Design</a></td>
                </tr>
                <tr>
                    <td>图表库</td>
                    <td><a target = "_blank" href={"https://antv.alipay.com/zh-cn/index.html"}>AntV@G2</a></td>
                </tr>
                <tr>
                    <td>图标库</td>
                    <td><a target = "_blank" href={"https://remixicon.com/"}>Remix Icon</a></td>
                </tr>
                <tr>
                    <td>地图组件</td>
                    <td><a target = "_blank" href={"https://github.com/ElemeFE/react-amap"}>React-amap</a></td>
                </tr>
                <tr>
                    <td>富文本编辑器</td>
                    <td><a target = "_blank" href={"https://braft.margox.cn/"}>Braft-editor</a></td>
                </tr>
                <tr>
                    <td>HTTP库</td>
                    <td><a target = "_blank" href={"http://www.axios-js.com/"}>Axios</a></td>
                </tr>
                <tr>
                    <td>拾色器</td>
                    <td><a target = "_blank" href={"http://casesandberg.github.io/react-color/"}>React-color</a></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>


#### 页面截图

<table>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152135_716ae863_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152155_14ac505e_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152202_da0038d4_1894302.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152211_111ac69f_1894302.png"/></td>
	<td><img src="https://images.gitee.com/uploads/images/2020/0519/152218_6520a194_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152230_a46a2892_1894302.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152238_5a7f8254_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152246_b7e41e71_1894302.png"/></td>
	<td><img src="https://images.gitee.com/uploads/images/2020/0519/152309_043548b1_1894302.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152650_bfc4269e_1894302.png"/></td>
	<td><img src="https://images.gitee.com/uploads/images/2020/0519/152658_4980a1cb_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152706_2f111bab_1894302.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152753_8e4ad63b_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152801_9f9d6d17_1894302.png"/></td>
	<td><img src="https://images.gitee.com/uploads/images/2020/0519/152809_852a1cfe_1894302.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152818_7cb1053d_1894302.png"/></td>
	<td><img src="https://images.gitee.com/uploads/images/2020/0519/152827_17f5d565_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152835_a1d03494_1894302.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152851_65fb3969_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152901_c5345e42_1894302.png"/></td>
	<td><img src="https://images.gitee.com/uploads/images/2020/0519/152923_83532d5e_1894302.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152932_fbed524a_1894302.png"/></td>
	<td><img src="https://images.gitee.com/uploads/images/2020/0519/152951_026619ce_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/152958_87b1ede5_1894302.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/153015_38279fa1_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/153023_b861971a_1894302.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2020/0519/160042_d9fa0b7b_1894302.png"/></td>
    </tr>
</table>
