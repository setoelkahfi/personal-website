server {
    listen 443 ssl;
    server_name setoelkahfi.com;
    root /var/www/setoelkahfi.com;
    index index.html;

    ssl_certificate_key /etc/letsencrypt/live/setoelkahfi.com-0001/privkey.pem; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/setoelkahfi.com-0001/fullchain.pem; # managed by Certbot

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 80;
    listen 443 ssl;
    ssl_certificate	/etc/letsencrypt/live/setoelkahfi.com-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/setoelkahfi.com-0001/privkey.pem;
    server_name www.setoelkahfi.com;
    return 301 https://setoelkahfi.com$request_uri;
}
