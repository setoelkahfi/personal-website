server {
    listen 80;
    listen 443 ssl;

    server_name setoelkahfi.com;

    ssl_certificate     /etc/letsencrypt/live/setoelkahfi.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/setoelkahfi.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
   }
}

server {
    listen 80;
    listen 443 ssl;
    ssl_certificate	/etc/letsencrypt/live/setoelkahfi.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/setoelkahfi.com/privkey.pem;
    server_name www.setoelkahfi.com;
    return 301 https://setoelkahfi.com$request_uri;
}
