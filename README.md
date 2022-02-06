# Nuxt.js 入門

## 0. インデックス
1. Hello, World
1. 

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

### ~/pages/index.vue

```javascript
<template>
  <h1>Hello, World!</h1>
</template>
```
