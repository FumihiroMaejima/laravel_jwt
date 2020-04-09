# Laravel Docker Environmental

### 構成

-PHP:7.4(php:7.4-fpm-alpine)

-MySQL:８

-Nginx:1.17(nginx:1.17-alpine)


## 開発環境構築


### 不要ファイルの削除

＊コンテナイメージの作り直し時も同様

```shell-session
$ docker-compose down --rmi all
$ docker-compose down
$ docker-compose up -d

```
