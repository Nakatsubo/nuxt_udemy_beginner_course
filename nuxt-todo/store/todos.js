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
        created: firebase.firestore.FieldValue.serverTimestamp() // タイムスタンプを取得する
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

// ソートしたデータ一覧を表示する
export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
  }
}