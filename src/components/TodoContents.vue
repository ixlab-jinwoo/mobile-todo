<template>
  <v-container>
    <TodoHeader :msg="name" />
    <TodoInput></TodoInput>
    <TodoList></TodoList>
  </v-container>
</template>

<script>
import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";
import TodoInput from "./TodoInput.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {  
  components: {
    TodoList,    
    TodoHeader,
    TodoInput,
  },

  data() {
    return {
      name: "",
      auth: getAuth(),
    };
  },
  methods: {},
  created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        // this.todoItems.push(localStorage.key(i));
        this.$store.commit("addTodo", localStorage.key(i));
      }
    }
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.name = user.email;
        // ...
      } else {
        this.$router.replace({ path: "/" });
        // ...
      }
    });
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

