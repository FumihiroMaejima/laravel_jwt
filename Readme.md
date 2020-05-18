# Laravel Docker Environmental

Laravel環境をDockerで構築する為の手順書

# 構成

-PHP:7.4(php:7.4-fpm-alpine)

-MySQL:8.0

-Nginx:1.17(nginx:1.17-alpine)

-Laravel:7.*

# ローカル環境の構築(Mac)

## PHPのバージョン更新

```shell-session
$ brew search php@7
==> Formulae
php@7.2                    php@7.3                    php@7.4

$ brew install php@7.4
```

インストール中に下記のメッセージがある。
下記のメッセージを頼りに$PATHと設定する。

```shell-session
If you need to have apr first in your PATH run:
  echo 'export PATH="/usr/local/opt/apr/bin:$PATH"' >> ~/.bash_profile
```

「~/.bash_profile」にPATHの設定を追記。
「~/.bash_profile」の読み込み。

```shell-session
$ echo 'export PATH="/usr/local/opt/apr/bin:$PATH"' >> ~/.bash_profile
$ source ~/.bash_profile
```

PHPのサービスの起動。

```shell-session
$ brew services start php
==> Successfully started `php` (label: homebrew.mxcl.php)
```

更新の確認。

```shell-session
$ php -v
PHP 7.4.4 (cli) (built: Mar 19 2020 20:14:52) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.4, Copyright (c), by Zend Technologies
```

## Composerのインストール

opensslのインストール

```shell-session
$ brew install openssl
```

Composerのインストール

```shell-session
$ curl -sS https://getcomposer.org/installer | php
```

インストールしたファイルを「/usr/local/bin/」に移動させる。

```shell-session
$ ls
composer.phar
$ mv composer.phar /usr/local/bin/composer
```

インストールの確認

```shell-session
$ composer --version
Composer version 1.10.4 2020-04-09 17:05:50
```

# 開発環境構築

## プロジェクト新規作成直後に必須の作業

### laravel_dockerリポジトリのclone

```shell-session
$ git clone https://github.com/FumihiroMaejima/laravel_docker your_project
```

### masterブランチのチェックアウト

デフォルトブランチがdevelopの為、masterブランチをチェックアウトする。

```shell-session
$ git checkout -b master remotes/origin/master
```

### 現在のremoteのURLの確認

```shell-session
$ git remote -v
origin	https://github.com/FumihiroMaejima/laravel_docker (fetch)
origin	https://github.com/FumihiroMaejima/laravel_docker (push)
```

### remoteリポジトリのURLの変更

```shell-session
$ git remote set-url origin https://github.com/Your_Name/your_project
$ git remote -v
origin	https://github.com/Your_Name/your_project (fetch)
origin	https://github.com/Your_Name/your_project (push)
```

### masterとdevelopブランチをremoteにpushする。

```shell-session
$ git push origin master
$ git push origin develop
```

### git-flowの初期化を行う。

```shell-session
$ git flow init
```


### env_exampleをコピペして.envを作る。
APP_PORTは現状設定不要。
nginxのポート設定は要注意が必要。


### Laravel version7系のプロジェクトを用意する場合

既存の「backend」ディレクトリをリネームして新しく作成する

```shell-session
$ composer create-project laravel/laravel=7.* --prefer-dist backend
```

## 不要ファイルの削除

＊コンテナイメージの作り直し時も同様

```shell-session
$ docker-compose down --rmi all
$ docker-compose down
$ docker-compose up -d

```

## Laravelプロジェクトの新規作成

dockerコンテナとマウントする為の「backend」ディレクトリはローカルで作成する。
「app」ディレクトリに移動してcomposerでプロジェクトを新規作成する。

バージョン:6.*

プロジェクト名:backend

*(フロントエンドとの連携を考慮しての命名)

```shell-session
$ cd app
$ composer create-project laravel/laravel=6.* --prefer-dist backend
```

## パッケージのインストール

バージョン7系をインストールする場合
「GuzzleHttpClient」はバージョン7系だとデフォルトでインストールされる。

```shell-session
$ composer require guzzlehttp/guzzle
$ composer require --dev nunomaduro/phpinsights
$ composer require --dev barryvdh/laravel-debugbar
$ composer require --dev friendsofphp/php-cs-fixer
$ composer require --dev squizlabs/php_codesniffer
$ composer require --dev phpmd/phpmd
$ composer require --dev codedungeon/phpunit-result-printer
$ composer require --dev barryvdh/laravel-ide-helper
```

php-cs-fixer,phpcs,phpmdの設定ファイルを格納する

```shell-session
backend/.php_cs
backend/phpcs.xml
backend/ruleset.xml
```

CI関係のコマンド

```shell-session
vendor/bin/phpunit --testdox
vendor/bin/php-cs-fixer fix -v
vendor/bin/phpcs --standard=phpcs.xml --extensions=php .
vendor/bin/phpmd . text ruleset.xml --suffixes php --exclude node_modules,resources,storage,vendor
```


## マイグレーションについて

backend/.envの値はプロジェクトrootの.envの値に合わせること。
DB_HOSTはdocker.compose.ymlのmysqlコンテナの名前と同様になる。

```shell-session
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

マイグレーションは必ずコンテナの内部で実行すること

```shell-session
$ docker-compose exec app php artisan migrate
Migration table created successfully.
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (0.07 seconds)
Migrating: 2019_08_19_000000_create_failed_jobs_table
Migrated:  2019_08_19_000000_create_failed_jobs_table (0.03 seconds)
```

DBのテーブル内の状態を初期化したい場合は、refreshコマンドを使う。

データベース全体を作り直すことが出来る。

```shell-session
$ docker-compose exec app php artisan migrate:refresh
Rolling back: 2019_08_19_000000_create_failed_jobs_table
Rolled back:  2019_08_19_000000_create_failed_jobs_table (0.08 seconds)
Rolling back: 2014_10_12_000000_create_users_table
Rolled back:  2014_10_12_000000_create_users_table (0.03 seconds)
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (0.06 seconds)
Migrating: 2019_08_19_000000_create_failed_jobs_table
Migrated:  2019_08_19_000000_create_failed_jobs_table (0.03 seconds)
```

データベースをリフレッシュし、全データベースシードを実行する

```shell-session
$ php artisan migrate:refresh --seed
```

データベースから全テーブルをドロップする。

```shell-session
$ php artisan migrate:fresh (--seed)
```

## 認証機能作成について

一度、migrate:freshなと実行しておくと良い。


laravel/uiのインストール

メモリ消費量が大きい為、コンテナ側で実行する。(php.iniの設定)

```shell-session
$ docker-compose exec app composer require laravel/ui
```

認証系のファイルの作成

```shell-session
$ php artisan ui vue --auth
```

マイグレーションの実行

```shell-session
$ docker-compose exec app php artisan migrate
```

アセットのコンパイル

```shell-session
$ npm install
$ npm run dev or npm run production
```

上記でデフォルトの認証機能が作成出来る。


# 補足

