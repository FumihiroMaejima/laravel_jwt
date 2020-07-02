# nuxt_admin

[front_vuetify_template](https://github.com/FumihiroMaejima/front_vuetify_template)のNuxt.js+TypeScript版

---
## Update Yarn

```
$ yarn -v
1.21.1

$ npm uninstall yarn -g
$ npm install yarn -g

$ yarn --version
1.22.1
```


## Update Vue-cli

```
$ vue --version
@vue/cli 4.1.1

$ yarn global add @vue/cli

$ vue --version
@vue/cli 4.2.3


$ yarn -v
1.21.1
```

---
## Make Projet

### gitリポジトリそのものをフロントエンドのリポジトリにしたい場合
一度rootに新規プロジェクトディレクトリを作成し、
node_modules以外をrootディレクトリに移すことでプロジェクトを作ることが出来る。

```
$ yarn create nuxt-app sample
$ mv sample/* ./ // エディターを使ってコピペして来た方が良い
$ rm -rf sample
$ yarn install
```

---
## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


---
# 環境構築

yarn コマンドで作成出来る。

```Shell
$ yarn create nuxt-app nuxt_admin

success Installed "create-nuxt-app@2.15.0" with binaries:
      - create-nuxt-app

create-nuxt-app v2.15.0
✨  Generating Nuxt.js project in nuxt_admin
? Project name nuxt_admin
? Project description my nuxt admin template.
? Author name your_name
? Choose programming language TypeScript
? Choose the package manager Yarn
? Choose UI framework Vuetify.js
? Choose custom server framework None (Recommended)
? Choose the runtime for TypeScript @nuxt/typescript-runtime
? Choose Nuxt.js modules Axios, DotEnv
? Choose linting tools ESLint, Prettier, Lint staged files, StyleLint
? Choose test framework Jest
? Choose rendering mode Universal (SSR)
? Choose development tools jsconfig.json (Recommended for VS Code)

```

## envファイルの設定

プロジェクト作成時に「DotEnv」を選択すると自動的に.envが作成される。
「.env-example」は作成されない為、各自で作成すること。

```
.env-example

# .env.local
# NODE_ENV='local'
# BASE_URL=http://localhost:3030
# VUE_APP_HEADER_TITLE='LaraJWT'
# VUE_APP_API_URL='http://localhost/'
# VUE_APP_BACKEND_API_DOMAIN=http://localhost
# MOCK_CLIENT_MODE='mockClientMode'
# DEVELOP_API_URL='http://localhost:3030/'

# .env.development
# NODE_ENV='development'
BASE_URL=http://localhost:3030
VUE_APP_HEADER_TITLE='LaraJWT'
VUE_APP_API_URL='http://localhost:3030/'
VUE_APP_BACKEND_API_DOMAIN=http://localhost
MOCK_CLIENT_MODE='mockClientMode'
DEVELOP_API_URL='http://localhost:3030/'

# .env.prod
# NODE_ENV='production'
# BASE_URL=http://localhost:3030
# VUE_APP_HEADER_TITLE='LaraJWT'
# VUE_APP_API_URL='http://localhost/'
# VUE_APP_BACKEND_API_DOMAIN=http://localhost
# MOCK_CLIENT_MODE=''
# DEVELOP_API_URL='http://localhost:3030/'


```

## アセットディレクトリの作成

/src/assets/下に
「css」、「img」、「js」ディレクトリ作成

## ライブラリの追加

プロジェクト作成時には入れていない下記のライブラリを追加

```
$ yarn add axios-mock-server
$ yarn add material-design-icons-iconfont
$ yarn add vuex-class
$ yarn add vue-property-decorator
$ yarn add @nuxtjs/proxy
$ yarn add @types/node
```

scss系のライブラリは別途記載。

## ライブラリの設定

package.jsonの編集

特にlintはtsの拡張子を追加する様に注意すること。

```Json
  "scripts": {
    "dev": "nuxt-ts",
    "build": "nuxt-ts build",
    "generate": "nuxt-ts generate",
    "start": "nuxt-ts start",
    "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore .",
    "test": "jest",
    "mock:build": "axios-mock-server -b",
    "mock:watch": "axios-mock-server -w"
  },
```

./.eslintrc.jsの作成と編集

```Javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "@typescript-eslint/no-var-requiress": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-this-alias": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
```

## nuxt.config.jsの設定

まず拡張子を「ts」にして「nuxt.config.ts」にリネームする。

configとctxの型に「any」を指定する。

```TypeScript
build: {
  /*
    ** You can extend webpack config here
    */
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extend(config: any, ctx: any) {}
}
```

scssファイルの読み込みを行う。

```TypeScript
css: ['~/assets/scss/App.scss'],
```


「tsconfig.json」の「types」にvuetifyを追加しないとエラーが発生する為注意が必要。

## Vuetifyの設定

インストール

```
$ vue add vuetify
$ yarn add material-design-icons-iconfont
```

Typescriptを使っている場合は下記の通りtsconfig.jsonの「types」に「vuetify」を追加する

```Json
{
  "compilerOptions": {
    "types": [
      "webpack-env",
      "vuetify",
      "jest"
    ],
  }
}
```

## tsconfig.jsonの設定

設定が必要な項目のみ抜粋する。

```Json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "types": [
      "webpack-env",
      "vuetify",
      "jest"
    ],
  }
}
```


## huskyの設定

lint-stagedを設定する

⇨nuxt.js利用時は不要っぽい。

```
$ npx mrm lint-staged
```

package.jsonに「gitHooks」の設定があれば削除する



## Componentsディレクトリの設定(Atomic Designs)

/src/Components下に下記のディレクトリを作成する
Atomic Designs

＊(nuxt.jsの場合、pagesは別途自動的に作成されている。)

```
atoms
molecules
organisms
templates
```

## vuexの設定

TypeScriptでvuexを使う為にvuex-classをインストール

```Shell
$ yarn add vuex-class
```

/src/store/index.tsの作成と編集

モジュールモードでの実装例は下記の通り

```TypeScript
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '~/store/types'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  state: {
    version: '1.0.0'
  },
  modules: {},
  mutations: {},
  actions: {}
}

```

/src/store/types.tsの作成と編集


```TypeScript
/* root */
export interface RootState {
  version: string
}

/* Login Module */
export interface LoginState {
  postData: {
    name: PostData['name']
    password: PostData['password']
    token: PostData['token']
  }
}
/* Login Module PostData */
export interface PostData {
  name: string
  password: string
  token: string
}
```

例としてloginモジュールのファイルを作成する。

/src/store/modules/login/index.tsの作成と編集


```TypeScript
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { LoginState, RootState, PostData } from '~/store/types'

export const state = () => ({
  postData: {
    name: '',
    password: '',
    token: ''
  }
})

export const getters: GetterTree<LoginState, RootState> = {
  name: (state: LoginState) => state.postData.name,
  password: (state: LoginState) => state.postData.password,
  token: (state: LoginState) => state.postData.token
}

export const actions: ActionTree<LoginState, RootState> = {
  getNameDataAction: ({ commit }, payload: PostData['name']) => {
    commit('setNameData', payload)
  },
  getPasswordDataAction: ({ commit }, payload: PostData['password']) => {
    commit('setPasswordData', payload)
  },
  getTokenDataAction: ({ commit }, payload: PostData['token']) => {
    commit('setTokenData', payload)
  }
}

export const mutations: MutationTree<LoginState> = {
  setNameData: (state: LoginState, payload: PostData['name']) => {
    state.postData.name = payload
  },
  setPasswordData: (state: LoginState, payload: PostData['password']) => {
    state.postData.password = payload
  },
  setTokenData: (state: LoginState, payload: PostData['token']) => {
    state.postData.token = payload
  }
}
```


## 「src」ディレクトリの作成と設定

ルートディレクトリの直下に「src」ディレクトリを作成し、下記のディレクトリとファイルを移動させる

```shell-session
・assets
・comonents
・config
・layouts
・middleware
・pages
・plugins
・static
・store
・client.ts
```

nuxt.config.tsに下記の設定を追加する。(.envの設定も合わせて行う。)

```Javascript

require('dotenv').config()

export default {
  srcDir: 'src',
  buildModules: [
    '@nuxtjs/dotenv',
  ],
  dotenv: {
    path: process.cwd()
  }
}

```

tsconfig.jsonの「path」の設定を下記の通りに変更する。

```Json
  "baseUrl": ".",
  "paths": {
    "~/*": [
      "src/*"
    ],
    "@/*": [
      "src/*"
    ]
  }
```

jest.config.jsに下記の通りに設定を修正する。


```Javascript

module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue'
  ]
}
```

## vuetifyのインストール

vuetifyを別途インストールする場合

yarnでinstallしないことに注意

```shell-session
$ vue add vuetify
```

---
## axios-mock-serverの設定

### mocksディレクトリの作成

```shell-session
$ mkdir mocks
```

### apiファイルとdataファイルを作成

/mocks/api/users/user.js
/mocks/data/users/user.json

・user.js

```Javascript
import data from '../../data/users/user.json'

export default {
  get() {
    return [
      200,
      data
    ]
  }
}
```

・user.json

```Json
{
  "id": 0,
  "name": "foo"
}
```

### mockのビルド

```shell-session
$ yarn mock:build
yarn mock:build
yarn run v1.22.1
$ axios-mock-server -b
mocks/$mock.js was built successfully.
```

/mocks/$mock.jsファイルが作成される。

### client.tsの修正

client.tsを下記の通りに修正

MOCK_CLIENT_MODEに指定の文字列が設定されるとプロキシを利用せずにmockを利用したリクエストを送ることになる。

```Javascript
import axios from 'axios'
import mock from '../mocks/$mock'

let baseURL = process.env.VUE_APP_API_URL

if (process.env.NODE_ENV === 'development') {
  baseURL = process.env.DEVELOP_API_URL
  if (process.env.MOCK_CLIENT_MODE === 'mockClientMode') {
    mock()
  }
}

const client = axios.create({
  baseURL: baseURL,
  responseType: 'json'
})

export default client

```

### axiosのプロキシ設定

プロキシを設定する為に下記をインストールする。

```shell-session
$ yarn add @types/node
$ yarn add @nuxtjs/proxy
```

tsconfi.jsonの「types」に追記する。

```Json
  "types": [
    "vuetify",
    "@types/node",
    "@nuxt/types",
    "@nuxtjs/axios"
  ]
```

nuxt.config.tsの「modules」に「'@nuxtjs/proxy'」を追記

```TypeScript
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
```

nuxt.config.tsの「axios」と「proxy」にそれぞれ下記の通り設定を加える。

「axios」の「proxy」キーは変数などで任意に変更出来る様にしておくと良い。

```TypeScript
  axios: {
    proxy: true
  },
  proxy: {
    '/api': 'http://localhost/',
  },
```

---
## Cookieを取得する方法

cookie-universal-nuxtのインストール

```shell-session
$ yarn add cookie-universal-nuxt
```

tsconfi.jsonの「types」に追記する。

```Json
  "types": [
    "cookie-universal-nuxt"
  ]
```

nuxt.config.tsの「modules」に「'cookie-universal-nuxt'」を追記

```TypeScript
  modules: [
    ['cookie-universal-nuxt', { parseJSON: false }]
  ],
```

`cookieの取得、設定、削除`

```TypeScript
  this.$cookies.get('csrftoken')
  this.$cookies.set('csrftoken', value)
  this.$cookies.remove('csrftoken')
```

---
## SCSSの利用設定

### sass-loaderとnode-sassと@nuxtjs/style-resourcesをインストールする

```shell-session
$ yarn add --dev sass-loader
$ yarn add --dev node-sass
$ yarn add --dev @nuxtjs/style-resources
```

nuxt.config.tsのexport default内のそれぞれの項目に下記の値を追記

*styleResourcesは新規追加になるはず。

```TypeScript
module.exports = {
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['~/assets/scss/App.scss']
  }
}
```

~/layouts/default.vueのscriptタグ内に下記を追記

```TypeScript
import '~/assets/scss/App.scss'
```

---
## TypeScriptのインストール

### グローバルにインストールする

```
$ npm install -g typescript
$ tsc -v
Version 3.8.3
```

### プロジェクトにインストールする

＊Vue-cliのプロジェクト作成時に選択した方が楽である。

```
$ yarn add typescript
```

その他のパッケージもインストールする

```
$ yarn add ts-loader
$ yarn add webpack
$ yarn add webpack-cli
```


### tsconfig.jsonに追記する事項

随時追記する

```Json
"experimentalDecorators": true,
"types": [
  "vuetify",
]
```

---
## Jestの設定

`jest.config.js`の設定は下記の通り

```JavaScript
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue'
  ]
}
```

@types/jestのインストールする

```Shell-sesshion
$ yarn add @types/jest
```

### tsconfig.jsonに設置を追記する

随時追記する

```Json
"types": [
  "@types/jest",
]

---
## Storybookの設定


### Storybookにインストール

```shell-session
$ yarn add --dev @storybook/vue@nuxt

```

⇨バージョンはstable版をインストールする。


### その他パッケージのインストール

```shell-session
$ yarn add --dev babel-preset-vue
$ yarn add --dev core-js@2.6.10
```

### addonのインストール

```shell-session
$ yarn add --dev @storybook/addon-knobs
$ yarn add --dev @storybook/addon-actions
$ yarn add --dev @storybook/addon-notes
$ yarn add --dev @storybook/addon-viewport
$ yarn add --dev @storybook/addon-a11y
$ yarn add --dev @storybook/addon-backgrounds
```

`addon-viewport`は現状エラーが発生する為、インストールは不要


### Storybookのコマンド設定

pasckage.jsonの`scripts`に下記の設定を追記する。
ポート番号を変更する場合は

```Json
  "scripts": {
    "storybook": "start-storybook -p 9100"
  },
```

### Storybookの設定ファイルについて

`/.storybookw`ディレクトリを作成し、下記のファイルを作成する。

- addons.ts

- config.ts

- webpack.config.ts

・addons.ts

```TypeScript
import '@storybook/addon-knobs/register'
import '@storybook/addon-actions/register'
import '@storybook/addon-notes/register'
// import '@storybook/addon-viewport/register'
import '@storybook/addon-a11y/register'
import '@storybook/addon-backgrounds/register'

```


config.ts

基本的な設定は下記の通り

その他はVuetifyを適用する設定を行なっている。

Story(サンドボックス環境)ファイルの格納場所や拡張子を変更する場合は下記を修正する。

```TypeScript
function loadStories() {
  const req = require.context('../src/stories', true, /\.story\.ts$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
```

・webpack.config.ts

```TypeScript
const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = ({ config }: any) => {

  config.resolve.alias['~'] = rootPath
  config.resolve.alias['@'] = rootPath

  // for Typescript
  config.module.rules.push({
    test: /\.ts/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
  })

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            './assets/scss/*.scss',
          ],
          rootPath
        }
      },
    ],
  })

  return config
}

```

---
## API Blueprintの設定

### aglioのインストール
*Mac版の場合

・Windowsは「--unsafe-perm」を付けない
・yarnではインストール出来ない

```
$ npm install -g aglio --unsafe-perm
```

### apibディレクトリの作成

test.apibファイルを作成し、下記のコマンドでWeb上にAPI仕様を出力出来る。

```
$ aglio -i apib/api.apib --theme-template triple -s
```

API仕様書のHTMLファイルの出力

```
$ aglio -i apib/api.apib -o apib/doc/api.html
```
