## 1. Version

| Name | Version |
| --- | --- |
| JVM | OpenJDK 11.0 |
| Docker | 24.0.7, build afdd53b |
| Intellij | 2023.02 |
| Jenkins | 2.432 |

<br>

## 2. Build

### Front

```powershell
1. npm install -g npm@latest
2. npm install -g typescript@latest
3. npm install --legacy-peer-deps
```

<br>

### Backend

```powershell
1. ./gradlew clean build
2. java -jar [Build된 파일 경로]
```

<br>

## 2. Dockerfile
### Frontend

```jsx
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install -g typescript@latest
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

<br>

### Backend

```jsx
FROM openjdk:11-jdk

COPY ./build/libs/oneshot-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

<br>

## 3. nginx 설정

### /etc/nginx/sites-available/default

```powershell
server {

        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name k9d108.p.ssafy.io;
        include /etc/nginx/mime.types;

				location / {
                proxy_pass http://localhost:81;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
        }

        location /api/ {
				proxy_pass http://localhost:9090;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }

        listen [::]:443 ssl ipv6only=on;
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/k9d108.p.ssafy.io/fullchain.pem; 
        ssl_certificate_key /etc/letsencrypt/live/k9d108.p.ssafy.io/privkey.pem; 
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

}
```

<br>

### nginx.conf

```powershell
server {
    listen 80;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```
