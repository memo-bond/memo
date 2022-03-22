## create new sudo user

``` shell
    
    adduser lucas
    usermod -aG sudo lucas
    
```

## setup coder

``` shell
    
    # git curl
    sudo apt install -y curl git lsof
    # install coder
    curl -fsSL https://code-server.dev/install.sh | sh

    sudo systemctl enable --now code-server@lucas

    code-server

    sudo vi /home/lucas/.config/code-server/config.yaml
    => 127.0.0.1:8080 => 0.0.0.0:8880
    
```

## Setup Memo Dev ENV

``` shell
    
    # install nvm 
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash && \
    source ~/.bashrc && \
    nvm install v14.18.3 && \
    npm i -g yarn && \
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

```    


## Nginx

``` shell

    sudo apt update && sudo apt install -y ufw nginx \
    && sudo ufw allow 'Nginx HTTP' \
    && sudo ufw allow OpenSSH \
    && sudo ufw allow ssh \
    && sudo ufw enable

    sudo systemctl reload nginx


# config a tenant for our coder shared ENV
server {
    listen 80;
    server_name lucas.memo.bond;
    location /{
        proxy_pass http://127.0.0.1:8880/;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Accept-Encoding gzip;
    }
}
```