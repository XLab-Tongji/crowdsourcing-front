FROM nginx

MAINTAINER nee <nee_11235@qq.com>

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

COPY dist/  /usr/share/nginx/html/