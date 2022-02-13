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
