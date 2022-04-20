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
      <v-form
        ><v-container
          ><v-row>
            <v-col cols="6" sm="3">
              <v-text-field v-model="email" label="email"></v-text-field>
            </v-col>
            <v-col cols="6" sm="3">
              <v-text-field
                v-model="password"
                label="Password"
                hint="At least 6 characters"
                counter
              ></v-text-field>
            </v-col> </v-row></v-container
      ></v-form>
      <v-btn outlined @click="addUser"> Signup </v-btn>
      <v-btn outlined @click="login"> Login </v-btn>
      <h1>{{ msg }}</h1>
    </v-main>
  </v-app>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default {
  data() {
    return {
      msg: "hi",
      auth: getAuth(),
      email: "",
      password: "",
    };
  },
  methods: {
    addUser() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          //var user = userCredential.user;
          this.msg = "loggined as " + userCredential.user.email;
          // ...
        })
        .catch((error) => {
          this.msg = error;
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // ..
        });
    },
    login() {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential.user);
          this.name = userCredential.user.email;
          this.$router.push({ path: "todo" });
          // ...
        })
        .catch((error) => {
          this.msg = error;
        });
    },
  },
  beforeCreate() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user.email);
        this.$router.push({ path: "todo" });
        // ...
      } else {
        console.log("not logged in");
        // User is signed out
        // ...
      }
    });
  },
};
</script>

<style>
</style>