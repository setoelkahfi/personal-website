# personal-website

This is the source and **nginx** config file for my personal website.

## deployment

Given you have the key to the server:

```bash
$ scp index.html deploy@api.smbcloud.xyz:/var/www/setoelkahfi.com
```

Of course that will not work because of the `permission denied` error. So, upload to the `home` folder:

```bash
$ scp index.html deploy@api.smbcloud.xyz:
$ scp -r src deploy@api.smbcloud.xyz:
```

Then move them to `/var/www/setoelkahfi.com/`:

```bash
$ sudo mv index.html /var/www/setoelkahfi.com/
$ sudo mv src /var/www/setoelkahfi.com/src
```

## nginx

Download the **nginx** config for this website:

```bash
$ scp deploy@api.smbcloud.xyz:/etc/nginx/sites-enabled/setoelkahfi.com .smb/nginx-setoelkahfi.com
```