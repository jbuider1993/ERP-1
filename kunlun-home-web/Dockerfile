# 指定基础image
FROM node:10

# 切换目录
WORKDIR .

# 挂载文件
VOLUME /kunlun-home-web/node_modules

# 复制当前文件下所有文件到指定路径
COPY . .

# 执行命令
RUN npm install -g --registry=https://registry.npm.taobao.org

# 执行命令
RUN npm install -g

#COPY . .

RUN npm run build

# 暴露容器端口
EXPOSE 8000

# 设置容器启动时执行的操作
CMD npm start
