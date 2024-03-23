# 使用官方的Nginx基础镜像
FROM nginx:alpine
 
# 将构建目录下的所有文件复制到Nginx的服务器根目录
COPY . /usr/share/nginx/html
 
# 暴露80端口供外部访问
EXPOSE 80
 
# 启动Nginx服务器，并且当容器启动时自动运行
CMD ["nginx", "-g", "daemon off;"]