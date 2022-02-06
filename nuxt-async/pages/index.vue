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
let url = 'https://jsonplaceholder.typicode.com/usersxxxxx';
export default {
  // コンポーネントを初期化する前に非同期の通信を行えるようにするためのメソッド
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
