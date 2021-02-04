# 基于node镜像而构建
FROM node:10.16.3

# 指定工作目录
WORKDIR .

# COPY 指令将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置
COPY package.json ./

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装依赖
RUN cnpm install --no-cache

# 将所有文件copy到工作目录
COPY ./ ./

# 声明运行时容器提供服务端口
EXPOSE 8000

# 指定默认的容器主进程的启动命令
CMD ["npm", "run", "start"]
