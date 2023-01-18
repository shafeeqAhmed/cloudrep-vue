#Aurthor: Faraz    #Frontend #Development Branch 2 Aug 
FROM ubuntu:latest
RUN apt update -y && \
    apt install curl -y && \
    apt install apache2 -y && \
    apt install net-tools -y && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt -y install nodejs
USER root
RUN mkdir /root/frontendapp
WORKDIR /root/frontendapp
COPY default.conf /etc/apache2/sites-enabled/000-default.conf
RUN cat /etc/apache2/sites-enabled/000-default.conf
RUN node --version
COPY . /root/frontendapp/
RUN cp -f .htaccess /var/www/html/
RUN ls -la /var/www/html/
RUN npm install
RUN npm run build
WORKDIR /root/frontendapp
RUN ls .htaccess
RUN cat .htaccess
RUN cp -f .htaccess /var/www/html/
RUN ls /var/www/html/
RUN cp -r dist/* /var/www/html/
WORKDIR /root/frontendapp
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
EXPOSE 80
#RUN chmod +x docker-entrypoint.sh
#ENTRYPOINT ["sh", "./docker-entrypoint.sh"]

