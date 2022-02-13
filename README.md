# Nuxt.js 入門

## 0. インデックス
1. Hello, World
1. ルーティング
1. ビュー
1. 非同期通信
1. アセットファイル
1. Vuexストア
1. サンプルプロジェクト カウンターアプリ
1. サンプルプロジェクト　Nuxt.js + Firebase (SPA)

## 1. Hello, World

```bash
$ create-nuxt-app hello
$ npm run dev
```

### マスタッシュ構文

```javascript
<template>
  <section class="container">
    <h1>{{ message }}</h1>
    <hr>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      message: 'Hello, World!'
    }
  }
}
</script>
```

### ページ遷移

#### ~/pages/index.vue

```javascript
<template>
  <section class="container">
    <h1>{{ message }}</h1>
    <hr>
    <router-link to="price">Price Page</router-link>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      message: 'Hello, World!'
    }
  }
}
</script>
```

#### ~/pages/price.vue

```javascript
<template>
  <section class="container">
    <h1>Price Page</h1>
    <hr>
    <router-link to="/">Top Page</router-link>
  </section>
</template>
```

### スクラッチでプロジェクトを作成

#### package.json

```javascript
{
  "name": "nuxt-scratch-app",
  "dependencies": {
    "nuxt": "^2.15.8"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

```bash
$ npm install

$ mkdir pages
$ touch index.vue
```

#### ~/pages/index.vue

```javascript
<template>
  <h1>Hello, World!</h1>
</template>
```

## 2. ルーティング
~/.nuxt/router.js で自動的に定義される

#### ~/.nuxt/router.js

```javascript
export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/users",
      component: _1bfa3b20,
      name: "users"
    }, {
      path: "/users/other",
      component: _4fbf7b44,
      name: "users-other"
    }, {
      path: "/users/:id",
      component: _7dc6f4f0,
      name: "users-id"
    }, {
      path: "/",
      component: _dc4a57b2,
      name: "index"
    }],

    fallback: false
  })
}
```

#### ~/pages/users/_id.vue
validate メソッドを定義し パラメータ 以外のアクセスを制限する

```javascript
<template>
  <section>
    <h1>{{ message }}</h1>
    <p>id: {{ this.$route.params.id }}</p>
  </section>
</template>

<script>
  export default {
    data: function() {
      return {
        message: '/users/_id.vueを表示中'
      }
    },
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    }
  }
</script>
```

## 3. ビュー
~/.nuxt/views/app.template.html に雛形が定義されている

#### ~/.nuxt/views/app.template.html

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

#### app.html

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    <noscript>Your browser does not support JavaScript！</noscript>
    {{ APP }}
  </body>
</html>
```

### デフォルトテンプレート
~/layouts/default.vue に定義した CSS, JavaScriptが全ページに適用される

#### ~/layouts/default.vue

```javascript
<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
```

### HTMLヘッダー
nuxt.config.js に定義した head が全ページに適用される


```javascript
  head: {
    title: 'Hello Nuxt.js!',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap' }
    ]
  },
```

## 4. 非同期通信
axiosをインストールする

##### シードデータ用API
[JSONPlaceholder](https://jsonplaceholder.typicode.com/)

```bash
$ npm install axios
```

#### ~/pages/index.vue

```javascript
<template>
  <section class="container">
    <div>
      <!-- {{ users[0].id }}, {{ users[0].name }} -->
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.id }}, {{ user.name }}, {{ user.company.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
const axios = require('axios');
let url = 'https://jsonplaceholder.typicode.com/users';
export default {
  // asyncData -> コンポーネントを初期化する前に非同期の通信を行えるようにするためのメソッド
  asyncData({ params, error }) {
    return axios.get(url)
      .then((res) => {
        return { users: res.data }
      })
      .catch((e => {
        // console.log(e.response.status)
        error({ statusCode: e.response.status, message: e.message })
      }))
  }
}
</script>
```

### エラーメソッドの追加

```javascript
.catch((e => {
  // console.log(e.response.status)
  error({ statusCode: e.response.status, message: e.message })
}))
```

## 5. アセットファイル

#### ~/pages/index.vue

```javascript
<template>
  <section class="container">
    <img src="~/assets/cat.jpg" alt="#">
  </section>
</template>
```

### 静的ファイル
~/static/ 以下にファイルを保存する

## 6. Vuexストア
状態管理を行うためのライブラリ。アプリケーションの状態をひとつの場所において管理する

### メリット

- データの流れを見えやすくすることでバグが少なくなる
- デバックがしやすくなる

### デメリット

- コードが冗長になる
- 学習コスト高い

### State / ステート
アプリケーションの状態を保持するオブジェクト。
ステートオブジェクトにはアプリケーションの状態が全て含まれており、信頼できる唯一の情報源（single source of truth）
各コンポーネントから直接ステートの値を書き換えることは禁じられており、書き換える場合はミューテーションを経由させる

### Actions / アクション
外部APIとの通信を行い、ミューテーションを呼び出す。非同期処理が必要な場合アクションにコードを記述する

### Mutations / ミューテーション
Vuexのストアの状態を唯一変更できる存在。アクションを経由してステートを変更する

#### ~/store/index.js

```javascript
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
  // state は dataオブジェクトと同等の役割を果たす
  state: function() {
      return {
        message: 'Hello Vuex!'
      }
    },
  })
}

export default createStore
```

#### ~/pages/index.vue

```javascript
<template>
  <section class="container">
    <div>
      <p>{{ $store.state.message }}</p>>
    </div>
  </section>
</template>
```
### ミューテーションでステートを書き換える

#### ~/store/index.js

```javascript
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        message: 'Hello Vuex!'
      }
    },
    mutations: {
      updateMessage: function(state) {
        state.message = 'Updated!'
      }
    }
  })
}

export default createStore
```

#### ~/pages/index.vue

```javascript
<template>
  <section class="container">
    <div>
      <p>{{ $store.state.message }}</p>
      // commit でミューテーションを呼び出す
      <button v-on:click="$store.commit('updateMessage')">Update</button>>
    </div>
  </section>
</template>
```

### ミューテーションへ値を渡しステートを書き換える
commit メソッドの第二引数で値を渡す

#### ~/store/index.js

```javascript
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        message: 'Hello Vuex!'
      }
    },
    mutations: {
      // payload で値を受け取る
      updateMessage: function(state, payload) {
        state.message = payload
      }
    },
  })
}

export default createStore
```

#### ~/pages/index.vue

```javascript
<template>
  <section class="container">
    <div>
      <p>{{ $store.state.message }}</p>>
      <button v-on:click="$store.commit('updateMessage', 'Commit with Payload')">Update</button>
    </div>
  </section>
</template>
```

#### アクションを経由し、ミューテーションへ値を渡しステートを書き換える

#### ~/store/index.js

```javascript
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        message: 'Hello Vuex!'
      }
    },
    mutations: {
      updateMessage: function(state, payload) {
        state.message = payload
      }
    },
    actions: {
      updateMessageAction(context, payload) {
        context.commit('updateMessage', payload)
      }
    }
  })
}

export default createStore
```

#### ~/pages/index.vue

```javascript
<template>
  <section class="container">
    <div>
      <p>{{ $store.state.message }}</p>
      // dispatch メソッドで値をミューテーションへ渡す
      <button v-on:click="$store.dispatch('updateMessageAction', 'Dispatch with payload')">Dispatch</button>
    </div>
  </section>
</template>
```

#### クラシックモード / モジュールモード

##### クラシックモード
index.js の一つのファイルに記述する

##### モジュールモード
複数のファイルに記述する

## 7. サンプルプロジェクト カウンターアプリ

### 7-1. カウントアップの実装

#### ~/store/counter.js

```javascript
export const state = () => ({
  counter: 0
})

export const mutations = () => ({
  countUp: function(state) {
    state.counter++
  }
})
```

#### ~/components/Counter.vue

```javascript
<template>
  <section>
    <h2>{{ title }}</h2>
    counter: {{ $store.state.counter.counter }}
    <button v-on:click="$store.commit('counter/countUp')">+1</button>
  </section>
</template>

<script>

export default {
  data: function() {
    return {
      title: 'Counter'
    }
  }
}
</script>
```

#### ~/pages/index.vue

```javascript
<template>
  <section class="container">
    <div>
      <counter></counter>
      <hr>
      <counter></counter>
      <hr>
      <counter></counter>
      <hr>
    </div>
  </section>
</template>

<script>
// Counterコンポーネントを index.vueに読み込む
import Counter from '~/components/Counter.vue'

export default {
  components: {
    Counter
  }
}
</script>
```

### 7-2. カウントリセットの実装

#### ~/store/counter.js

```javascript
export const state = ({
  counter: 0
})

export const mutations = {
  countUp: function(state) {
    state.counter++
  },
  // リセット機能の追加
  reset: function(state) {
    state.counter = 0
  }
}
```

#### ~/components/Counter.vue

```javascript
<template>
  <section>
    <h2>{{ title }}</h2>
    counter: {{ $store.state.counter.counter }}
    <button v-on:click="$store.commit('counter/countUp')">+1</button>
    // リセットボタンの追加
    <button v-on:click="$store.commit('counter/reset')">reset</button>
  </section>
</template>

<script>

export default {
  data: function() {
    return {
      title: 'Counter'
    }
  }
}
</script>
```

## 8. サンプルプロジェクト　Nuxt.js + Firebase (SPA)

### Firebase
BaaS(Backend as a service)というサービスの一種
アプリケーションのバックエンドシステムを提供する

### Firebase / CloudFirestore
ドキュメント指向データベース（ex. MongoDB）
ここでは**テストモード**、asianortheast1で開始する

### Firebase関連パッケージをインストール
- firebase
- vuexfire

```bash
$ npm install --save firebase@7.19.1
$ npm install --save vuexfire@3.0.1
```

### 環境変数を設定

```bash
$ npm install --save @nuxtjs/dotenv@1.3.0
```

```
FIREBASE_PROJECT_ID = {projectId}
```

#### ~nuxt.config.js

```javascript
/*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv'
  ],
```

#### ~/plugins/firebase.js

```javascript
import firebase from 'firebase';

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

// アプリを初期化する
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
```

#### ~/store/index.js

```javascript
import { vuexfireMutations } from 'vuexfire';

// 必ず ~/store/index.js に記述する
export const mutations = {
  ...vuexfireMutations
}
```

### todos.js の設定

#### ~/store/todos.js

```javascript
import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

// todos を管理
export const state = () => {
  todos: []
}

export const actions = {
  // todo データを初期化し呼び出す　firestoreAction を呼び出す　第一引数の bindFirestoreRef のみ受け取る
  init: firestoreAction(( { bindFirestoreRef }) => {
    // collectionの参照をする // バインドする -> 関連づける
    bindFirestoreRef('todos', todosRef)
  }),
  // todo を作成する
  add: firestoreAction((context, name) => {
    // name が空でなければ処理を実行する
    if(name.trim()) {
      todosRef.add({
        // 値を渡す
        name: name,
        done: false,
        created: firebase.firestore.FaildValue.serverTimestamp() // タイムスタンプを取得する
      })
    }
  }),
  // todo を削除する
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  // todo を更新する
  toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}
```

### todos.vue の設定

#### ~/pages/todos.vue

```javascript
<template>
  <div>

  </div>
</template>

<script>
export default {
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  }
}
</script>
```

### todo の新規追加

#### ~/pages/todos.vue

```javascript
<template>
  <div>
    <div class="form">
      <!-- .prevent を付与し、Addボタンを押した際にページがリロードされないようにする -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  // 新規登録されるデータを一時保存する
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  },
  // データ送信際に addメソッドを実行する
  methods: {
    add() {
      this.$store.dispatch('todos/add', this.name)
      // addメソッドが実行されたら値を空にする
      this.name = ''
    }
  },
}
</script>
```

### todo の一覧追加

#### ~/pages/todos.vue

```javascript
<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        {{ todo.done }}
        {{ todo.name }}
        {{ todo.created }}
      </li>
    </ul>
    <div class="form">
      <!-- .prevent を付与し、Addボタンを押した際にページがリロードされないようにする -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  // 新規登録されるデータを一時保存する
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  },
  // データ送信際に addメソッドを実行する
  methods: {
    add() {
      this.$store.dispatch('todos/add', this.name)
      // addメソッドが実行されたら値を空にする
      this.name = ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos
    }
  }
}
</script>
```

### todo の削除

#### ~/pages/todos.vue

```javascript
<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        {{ todo.done }} {{ todo.name }} {{ todo.created }}
        <button v-on:click="remove(todo.id)">X</button>
      </li>
    </ul>
    <div class="form">
      <!-- .prevent を付与し、Addボタンを押した際にページがリロードされないようにする -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  // 新規登録されるデータを一時保存する
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  },
  // データ送信際に addメソッドを実行する
  methods: {
    // データを追加する
    add() {
      this.$store.dispatch('todos/add', this.name)
      // addメソッドが実行されたら値を空にする
      this.name = ''
    },
    // データを削除する
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos
    }
  }
}
</script>
```

### todo の更新

#### ~/pages/todos.vue

```javascript
<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo }}
        <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">

        {{ todo.name }} {{ todo.created }}
        <button v-on:click="remove(todo.id)">X</button>
      </li>
    </ul>
    <div class="form">
      <!-- .prevent を付与し、Addボタンを押した際にページがリロードされないようにする -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  // 新規登録されるデータを一時保存する
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  },
  // データ送信際に addメソッドを実行する
  methods: {
    // データを追加する
    add() {
      this.$store.dispatch('todos/add', this.name)
      // addメソッドが実行されたら値を空にする
      this.name = ''
    },
    // データを削除する
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    // データを更新する
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos
    }
  }
}
</script>
```

### スタイルの追加

#### ~/pages/todos.vue

```javascript
<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">

        <span v-bind:class="{ done: todo.done }">
          {{ todo.name }} {{ todo.created }}
        </span> 
        <button v-on:click="remove(todo.id)">X</button>
      </li>
    </ul>
    <div class="form">
      <!-- .prevent を付与し、Addボタンを押した際にページがリロードされないようにする -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  // 新規登録されるデータを一時保存する
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  },
  // データ送信際に addメソッドを実行する
  methods: {
    // データを追加する
    add() {
      this.$store.dispatch('todos/add', this.name)
      // addメソッドが実行されたら値を空にする
      this.name = ''
    },
    // データを削除する
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    // データを更新する
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos
    }
  }
}
</script>

<style scoped>
li > span.done {
  text-decoration: line-through;
}
</style>
```

### 日時フォーマットの整形

### Moment のインストール

```bash
$ npm install --save moment@2.24.0
```

#### ~/pages/todos.vue

```javascript
<template>
  <div>
    {{ todos }}
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">

        <span v-bind:class="{ done: todo.done }">
          {{ todo.name }} {{ todo.created.toDate() | dateFilter}}
        </span> 
        <button v-on:click="remove(todo.id)">X</button>
      </li>
    </ul>
    <div class="form">
      <!-- .prevent を付与し、Addボタンを押した際にページがリロードされないようにする -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  // 新規登録されるデータを一時保存する
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  },
  // データ送信際に addメソッドを実行する
  methods: {
    // データを追加する
    add() {
      this.$store.dispatch('todos/add', this.name)
      // addメソッドが実行されたら値を空にする
      this.name = ''
    },
    // データを削除する
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    // データを更新する
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
    // データ一覧を表示する
    todos() {
      return this.$store.state.todos.todos
    }
  },
  // 日時フォーマットを整形する
  filters: {
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  } 
}
</script>

<style scoped>
li > span.done {
  text-decoration: line-through;
}
</style>
```

### 値が空だった場合の対応

#### ~/pages/todos.vue

```javascript
<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        <!-- todo.created の値が空だったら一覧に表示しない -->
        <span v-if="todo.created">
          <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">

          <span v-bind:class="{ done: todo.done }">
            {{ todo.name }} {{ todo.created.toDate() | dateFilter}}
          </span> 
          <button v-on:click="remove(todo.id)">X</button>
        </span>
      </li>
    </ul>
    <div class="form">
      <!-- .prevent を付与し、Addボタンを押した際にページがリロードされないようにする -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  // 新規登録されるデータを一時保存する
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  },
  // データ送信際に addメソッドを実行する
  methods: {
    // データを追加する
    add() {
      this.$store.dispatch('todos/add', this.name)
      // addメソッドが実行されたら値を空にする
      this.name = ''
    },
    // データを削除する
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    // データを更新する
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
    // データ一覧を表示する
    todos() {
      return this.$store.state.todos.todos
    }
  },
  // 日時フォーマットを整形する
  filters: {
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  } 
}
</script>

<style scoped>
/*　スタイルを修正する　*/
li > span > span.done {
  text-decoration: line-through;
}
</style>
```

### ソート順を修正

### lodash を読み込む
[lodash](https://lodash.com/docs/4.17.15)

#### ~nuxt.config.json

```javascript
const webpack = require('webpack')

///////////////////

/*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]

  }
```

#### ~/stote/index.js

```javascript
export const getters = {
  orderedTodos: state => {
    return _.sortBy(state.todos, created)
  }
}
```

#### ~/pages/todos.vue

```javascript
<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        <!-- todo.created の値が空だったら一覧に表示しない -->
        <span v-if="todo.created">
          <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">

          <span v-bind:class="{ done: todo.done }">
            {{ todo.name }} {{ todo.created.toDate() | dateFilter}}
          </span> 
          <button v-on:click="remove(todo.id)">X</button>
        </span>
      </li>
    </ul>
    <div class="form">
      <!-- .prevent を付与し、Addボタンを押した際にページがリロードされないようにする -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  // 新規登録されるデータを一時保存する
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  // todos.js の initメソッドを呼び出す 
  created: function() {
    this.$store.dispatch('todos/init')
  },
  // データ送信際に addメソッドを実行する
  methods: {
    // データを追加する
    add() {
      this.$store.dispatch('todos/add', this.name)
      // addメソッドが実行されたら値を空にする
      this.name = ''
    },
    // データを削除する
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    // データを更新する
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
    // データ一覧を表示する
    todos() {
      // return this.$store.state.todos.todos
      // ソートしたデータ一覧を表示する
      return this.$store.getters['todos/orderdTodos']
    }
  },
  // 日時フォーマットを整形する
  filters: {
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  } 
}
</script>

<style scoped>
li > span > span.done {
  text-decoration: line-through;
}
</style>
```