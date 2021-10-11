echo "LOADING--------"
apt-get install libdb5.3++-dev -y
# namecoind -addnode=47.90.204.241 -printtoconsole
# npm install express cors body-parser namecoin-rpc
namecoind -addnode=47.90.204.241 -printtoconsole & node /usr/local/bin/index.js