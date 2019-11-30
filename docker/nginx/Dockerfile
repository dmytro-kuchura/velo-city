FROM nginx:1.15.3-alpine
LABEL Description="nginx (a little bit customized)"

COPY ./etc/fastcgi_params /etc/nginx/fastcgi_params
COPY ./etc/html /usr/share/nginx/html
COPY ./etc/html-errorpages /usr/share/nginx/html-errorpages
COPY ./etc/errorpages.conf /etc/nginx/errorpages.conf
COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx-entrypoint.sh /nginx-entrypoint.sh

ENTRYPOINT ["/nginx-entrypoint.sh"]

CMD ["nginx"]
