```conf
worker_processes 4;
worker_rlimit_nofile 65535;
events {
    #nginx采用epoll事件模型，处理效率高。
    use epoll;
    #work_connections是单个worker进程允许客户端最大连接数，这个数值一般根据服务器性能和内存来制定，实际最大值就是worker进程数乘以work_connections.
    #实际我们填入一个65535，足够了，这些都算并发值，一个网站的并发达到这么大的数量，也算一个大站了！
    worker_connections 65535;
    #multi_accept 告诉nginx收到一个新连接通知后接受尽可能多的连接，默认是on，设置为on后，多个worker按串行方式来处理连接
    #也就是一个连接只有一个worker被唤醒#，其他的处于休眠状态，设置为off后，多个worker按并行方式来处理连接
    #也就是一个连接会唤醒所有的worker，直到连接分配毕
    #没有取得连接的继续休眠。当你的服务器连接数不多时，开启这个参数会让负载有一定的降低，但是当服务器的吞吐量很大时，为了效率，可以关闭这个参数
    multi_accept off;
}

http {
    include mime.types;
    default_type application/octet-stream;
    sendfile on;
    tcp_nopush on;
    keepalive_timeout 300;
    tcp_nodelay on;
    server {
        listen 80;
        server_name 10.18.51.76;
        client_max_body_size 1024M;
        underscores_in_headers on;
        location / {
            proxy_pass http://10.18.84.149:8006/;
            proxy_set_header Host $host:$server_port;
        }
    }
    server {
        listen 5009;
        server_name yhbzlx.mem.gov.cn;
        location / {
            alias /data/yhdownload/;
            sendfile on;
            autoindex on;
            autoindex_exact_size off;
            autoindex_localtime on;
        }
    }

    server {
        listen 443 ssl;
        server_name yhbzlx.mem.gov.cn;
        large_client_header_buffers 4 16k;
        client_body_buffer_size 128k;
        proxy_connect_timeout 600;
        proxy_read_timeout 600;
        proxy_send_timeout 600;
        proxy_buffer_size 64k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 64k;
        client_max_body_size 1024M;
        index index.html;
        ssl_certificate /data/nginx/ssl/2437551__mem.gov.cn.pem;
        ssl_certificate_key /data/nginx/ssl/2437551__mem.gov.cn.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers HIGH:!RC4:!MD5:!aNULL:!eNULL:!NULL:!DH:!EDH:!EXP:+MEDIUM;
        ssl_prefer_server_ciphers on;
        location / {
            uwsgi_send_timeout 600;
            uwsgi_connect_timeout 600;
            uwsgi_read_timeout 600;
            proxy_pass https://10.18.84.149:8080/;
            proxy_set_header Host $host:$server_port;
        }
    }
}
```