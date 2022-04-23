<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn text>
        <span>More</span>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <TodoHeader :msg="name" />
      <TodoInput></TodoInput>
      <TodoList></TodoList>
    </v-main>
    <v-footer color="primary">
      <TodoFooter />
    </v-footer>
  </v-app>
</template>

<script>
import TodoFooter from "./TodoFooter.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";
import TodoInput from "./TodoInput.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",

  components: {
    TodoList,
    TodoFooter,
    TodoHeader,
    TodoInput,
  },

  data() {
    return {      
      name: "",
      auth: getAuth()      
    };
  },
  methods: {    
  },
  created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        // this.todoItems.push(localStorage.key(i));
        this.$store.commit('addTodo',localStorage.key(i));
      }
    }
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.name = user.email;
        // ...
      } else {
        this.$router.replace({path:"/"});
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

