import React from 'react';
import { Carousel, Descriptions, Divider, Layout, Timeline } from 'antd';
import styles from './Introduction.less';
import config from '../../../config/config';
import 'remixicon/fonts/remixicon.css';

const DescriptionsItem = DescriptionsItem;
const { Header, Content, Footer } = Layout;
const TimeLineItem = Timeline.Item;

const SystemInfo = (props) => {

  const iconStyle = {
    verticalAlign: "bottom",
    fontSize: "16px",
  };

  const iconTitleStyle = {
    marginRight: "6px"
  };

  /**
   * 还可增加系统成长史，可罗列出关键时间；系统数次启动操作指南等
   */

  return (
    <div>
      <Layout style={{ background: '#fff'}}>
        <Header style={{ background: '#e8e8e88a', padding: 0, marginBottom: "15px", width: "100%" }}>
          <div style={{ padding: "10px 15px", display: "inline" }}>
            <i className="ri-global-fill" style={{ fontSize: "35px", color: "blue" }}></i>
            <span style={{ padding: "9px 10px", marginTop: "-9px", position: "absolute", fontSize: "20px" }}>{config.name}</span>
          </div>
        </Header>
        <Content>
          <div className={styles.infoDiv}>
            <div className={styles.introductionDiv}>
              <div className={styles.infoShowDiv}>
                <div className={styles.briefDiv}>
                  <div className={styles.infoFontSize}><i className="ri-bookmark-3-fill" style={iconTitleStyle}></i>系统简介</div>
                  <Divider className={styles.dividerDiv} />
                </div>
                <div className={styles.briefContentDiv}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{config.name}是一套基于前后端分离架构的后台管理系统。kunlun-web 基于React + Umi(乌米) + Ant Design (蚂蚁金服) 构建开发，提供前端解决方案；kunlun-service 基于 SpringBoot 与 Spring Cloud 构建开发，提供后端基于微服务架构的解决方案。系统通过Apache Shiro与Jwt组件，用token进行数据交互认证，可快速开发并独立进行Docker容器化部署。
                </div>
                <div className={styles.projectInfoDIv}>
                  <Descriptions title="" layout="vertical" bordered column={3} style={{padding: "0px 10px 0px 10px"}}>
                    <DescriptionsItem label="名称">服务治理</DescriptionsItem>
                    <DescriptionsItem label="项目名">kunlun-register-service</DescriptionsItem>
                    <DescriptionsItem label="说明">服务注册、服务发现、服务心跳检测、高级消息队列(RabbitMQ)及分布式配置中心等</DescriptionsItem>
                    <DescriptionsItem label="服务网关">基础数据</DescriptionsItem>
                    <DescriptionsItem label="kunlun-gateway-service">kunlun-basedata-service</DescriptionsItem>
                    <DescriptionsItem label="服务路由、登录用户校验、鉴权及生成Token、Hystrix的turbine模式配置及Swagger路由配置等">提供基础数据支持，如菜单、角色、权限等，并提供基于Redis的分布式缓存功能、基于ElasticSearch + RabbitMQ的服务调用追踪、资源爬取等</DescriptionsItem>
                    <DescriptionsItem label="业务服务">前端框架</DescriptionsItem>
                    <DescriptionsItem label="kunlun-system-service">kunlun-home-web</DescriptionsItem>
                    <DescriptionsItem label="业务功能支持服务，提供业务数据、动态数据源、脚本自动执行及基于RabbitMQ的异步操作日志生成功能">提供登录页面、业务菜单、消息待办、主题皮肤、登录人信息及项目布局等</DescriptionsItem>
                    <DescriptionsItem label="前端业务">公共模块</DescriptionsItem>
                    <DescriptionsItem label="kunlun-system-web">kunlun-common-api</DescriptionsItem>
                    <DescriptionsItem label="展示系统业务数据及功能页面，如首页信息、人员管理、用户地图、流程管理、操作日志、事项日程、服务资源管理、菜单管理等">提供公共基础模型、工具、自动配置、统一异常处理、统一Swagger配置及操作日志AOP等等</DescriptionsItem>
                  </Descriptions>
                </div>
              </div>
              <div className={styles.logDiv}>
                <div className={styles.logFontDiv}>
                  <div className={styles.infoFontSize}><i className="ri-stack-fill" style={iconTitleStyle}></i>系统开发升级日志</div>
                  <Divider className={styles.dividerDiv} />
                </div>
                <div className={styles.logContenDiv}>
                  <div className={styles.logServiceDiv}>
                    <Timeline>
                      <TimeLineItem dot={<i className="ri-global-line" style={iconStyle}></i>} color="green">2018-10-04 搭建单服务前台</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-stack-line" style={iconStyle}></i>} color="blue">2018-10-04 SpringCloud工程搭建</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-global-line" style={iconStyle}></i>} color="green">2018-10-15 实现初版菜单切换功能（每个页面嵌套在公共菜单框架里）</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-global-line" style={iconStyle}></i>} color="green">2018-11-09 实现第二版菜单切换功能（公共菜单框架嵌套在route.js里）</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-global-line" style={iconStyle}></i>} color="green">2018-12-27实现第三版菜单切换功能（菜单框架与业务服务分开）</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-stack-line" style={iconStyle}></i>} color="blue">2018-11-04初步搭建SpringCloud工程（服务治理与路由网关）</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-stack-line" style={iconStyle}></i>} color="blue">2018-11-24 搭建SpringCloud工程（服务调用链追踪）</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-stack-line" style={iconStyle}></i>} color="blue">2019-01-13 前端与后端开始整合</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-stack-line" style={iconStyle}></i>} color="blue">2019-03-13 SpringBoot整合RabbitMQ</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-stack-line" style={iconStyle}></i>} color="blue">2019-04-05 实现动态数据源切换</TimeLineItem>
                    </Timeline>
                  </div>
                  <div className={styles.logWebDiv}>
                    <Timeline>
                      <TimeLineItem dot={<i className="ri-stack-line" style={iconStyle}></i>} color="blue">2019-04-15 Apache Shiro与Jwt实现用户认证与鉴权</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-stack-line" style={iconStyle}></i>} color="blue">2019-04-23 系统整合Activiti流程管控组件</TimeLineItem>
                      <TimeLineItem dot={<i className="ri-global-line" style={iconStyle}></i>} color="green">2019-07-02 前台功能逐步完善</TimeLineItem>
                    </Timeline>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.structureDiv}>
              <div className={styles.serviceDiv}>
                <div className={styles.serviceInfoDiv}>
                  <div className={styles.infoFontSize}><i className="ri-code-box-fill" style={iconTitleStyle}></i>后端框架</div>
                  <Divider className={styles.dividerDiv} />
                </div>
                <div className={styles.serviceDetailDiv}>
                  <Descriptions title="" layout="horizontal" bordered column={1} className={styles.technicalDescription} style={{ flex: 1}}>
                    <DescriptionsItem label="核心框架"><a target = "_blank" href={"https://spring.io/projects/spring-boot"}>Spring Boot</a></DescriptionsItem>
                    <DescriptionsItem label="服务架构"><a target = "_blank" href={"https://spring.io/projects/spring-cloud"}>Spring Cloud</a></DescriptionsItem>
                    <DescriptionsItem label="安全框架"><a target = "_blank" href={"http://shiro.apache.org/"}>apache Shiro</a>、<a target = "_blank" href={"https://jwt.io/"}>Jwt</a></DescriptionsItem>
                    <DescriptionsItem label="持久层框架"><a target = "_blank" href={"http://www.mybatis.org/mybatis-3/zh/index.html"}>MyBatis</a></DescriptionsItem>
                    <DescriptionsItem label="数据库连接池"><a target = "_blank" href={"https://github.com/alibaba/druid"}>Druid</a></DescriptionsItem>
                    <DescriptionsItem label="数据库">PosgreSQL、<a target = "_blank" href={"https://redis.io/"}>Redis</a></DescriptionsItem>
                    <DescriptionsItem label="工作流引擎"><a target = "_blank" href={"https://www.activiti.org/documentation"}>Activiti-5.22.0</a></DescriptionsItem>
                    <DescriptionsItem label="脚本执行">Flyway</DescriptionsItem>
                    <DescriptionsItem label="资源爬取"><a target = "_blank" href={"https://www.selenium.dev/"}>Selenium</a></DescriptionsItem>
                    <DescriptionsItem label="消息组件"><a target = "_blank" href={"https://www.rabbitmq.com/"}>RabbitMQ</a></DescriptionsItem>
                    <DescriptionsItem label="全局搜索"><a target = "_blank" href={"https://www.elastic.co/"}>ElasticSearch</a></DescriptionsItem>
                  </Descriptions>
                </div>
              </div>
              <div className={styles.webDiv}>
                <div className={styles.webInfoDiv}>
                  <div className={styles.infoFontSize}><i className="ri-html5-fill" style={iconTitleStyle}></i>前端框架</div>
                  <Divider className={styles.dividerDiv} />
                </div>
                <div className={styles.webDetailDiv}>
                  <Descriptions title="" layout="horizontal" bordered column={1} className={styles.technicalDescription} style={{ flex: 1}}>
                    <DescriptionsItem label="前端技术栈"><a target = "_blank" href={"https://github.com/facebook/react"}>React</a></DescriptionsItem>
                    <DescriptionsItem label="前端框架"><a target = "_blank" href={"https://umijs.org/"}>Umi</a></DescriptionsItem>
                    <DescriptionsItem label="数据流框架"><a target = "_blank" href={"https://dvajs.com/guide/"}>Dva</a></DescriptionsItem>
                    <DescriptionsItem label="前端UI库"><a target = "_blank" href={"https://ant.design/index-cn"}>Ant Design</a></DescriptionsItem>
                    <DescriptionsItem label="图表库"><a target = "_blank" href={"https://antv.alipay.com/zh-cn/index.html"}>AntV@G2</a></DescriptionsItem>
                    <DescriptionsItem label="图标库"><a target = "_blank" href={"https://remixicon.com/"}>Remix Icon</a></DescriptionsItem>
                    <DescriptionsItem label="地图组件"><a target = "_blank" href={"https://github.com/ElemeFE/react-amap"}>React-amap</a></DescriptionsItem>
                    <DescriptionsItem label="富文本编辑器"><a target = "_blank" href={"https://braft.margox.cn/"}>Braft-editor</a></DescriptionsItem>
                    <DescriptionsItem label="HTTP库"><a target = "_blank" href={"http://www.axios-js.com/"}>Axios</a></DescriptionsItem>
                    <DescriptionsItem label="拾色器"><a target = "_blank" href={"http://casesandberg.github.io/react-color/"}>React-color</a></DescriptionsItem>
                  </Descriptions>
                </div>
              </div>
              <div className={styles.linkDiv}>
                <div className={styles.linkFontDiv}>
                  <div className={styles.infoFontSize}><i className="ri-base-station-fill" style={iconTitleStyle}></i>友情链接</div>
                </div>
                <div className={styles.linkUrlDiv}>
                  <Carousel dotPosition={"bottom"} className={styles.carousel} autoplay={true}>
                    <div className={styles.carsouselOne}>
                      <h3 className={styles.carsouselFont}>
                        <a href={"http://59.110.164.254:8066/login.html"} target = "_blank">OCP微服务能力开放平台</a>
                      </h3>
                    </div>
                    <div className={styles.carsouselTwo}>
                      <h3 className={styles.carsouselFont}>
                        <a href={"http://pigx.pig4cloud.com/#/login"} target = "_blank">PigX快速开发框架</a>
                      </h3>
                    </div>
                    <div className={styles.carsouselThree}>
                      <h3 className={styles.carsouselFont}>
                        <a href={"https://preview.pro.ant.design/"} target = "_blank">Ant Design Pro</a>
                      </h3>
                    </div>
                    <div className={styles.carsouselFour}>
                      <h3 className={styles.carsouselFont}>
                        <a href={"http://demo.ruoyi.vip/login"} target = "_blank">若依管理系统</a>
                      </h3>
                    </div>
                    <div className={styles.carsouselFour}>
                      <h3 className={styles.carsouselFont}>
                        <a href={"http://demo9java.5kcrm.net/"} target = "_blank">悟空 CRM</a>
                      </h3>
                    </div>
                    <div className={styles.carsouselFour}>
                      <h3 className={styles.carsouselFont}>
                        <a href={"http://biz.demo.zentao.net"} target = "_blank">禅道企业版</a>
                      </h3>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', marginTop: "15px", width: "100%", height: "64px" }}>
          <div>{config.footerText}</div>
        </Footer>
      </Layout>
    </div>
  );
};

export default SystemInfo;
