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
      <v-btn @click="predict"> Detect </v-btn>
      <v-btn text>
        <span>More</span>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="deviceFeature(item.title)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <v-icon>mdi-menu</v-icon> -->
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-file-input v-model="files" />
      <img id="img" :src="src" width="100%" />
      <TodoHeader :msg="message" />
      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList
        v-bind:propsdata="todoItems"
        @removeTodo="removeTodo"
      ></TodoList>
    </v-main>
    <v-footer color="primary">
      <TodoFooter v-on:removeAll="clearAll" />
    </v-footer>
  </v-app>
</template>

<script>
import TodoFooter from "./components/TodoFooter.vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoInput from "./components/TodoInput.vue";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-cpu";
import * as cocoSSD from "@tensorflow-models/coco-ssd";

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
      message: "Todo It!",
      todoItems: [],
      items: [
        { title: "battery" },
        { title: "geo" },
        { title: "network" },
        { title: "vibrate" },
      ],
      src: "",
      model: "",
      files: null,
    };
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
    addTodo(todoItem) {
      localStorage.setItem(todoItem, todoItem);
      this.todoItems.push(todoItem);
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    deviceFeature(feature) {
      console.log(feature);
      switch (feature) {
        case "vibrate":
          navigator.vibrate([2000, 500, 2000, 500]);
          break;
        case "network":
          console.log(navigator.connection.type);
          this.message = "Network status:" + navigator.connection.type;
          break;
        case "battery":
          navigator.getBattery().then((battery) => {
            this.message = "Battery status:" + battery.level;
            battery.onchargingchange = () => {
              this.addTodo(battery.charging);
            };
          });
          break;
        case "geo":
          navigator.geolocation.getCurrentPosition((location) => {
            this.message =
              "Current Position:" +
              location.coords.longitude +
              "&" +
              location.coords.latitude;
          });
      }
    },
    async predict() {
      const img = document.getElementById("img");
      let tmp = await this.model.detect(img);
      tmp.forEach(obj => this.message += " "+obj.class)
    },
  },
  created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        this.todoItems.push(localStorage.key(i));
      }
    }
  },
  async mounted() {
    this.model = await cocoSSD.load();

    console.log("model loaded");
  },
  watch: {
    files() {
      console.log(this.files);
      var reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = (e) => {
        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
        // Read image as base64 and set to imageData
        this.src = e.target.result;
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(this.files);
    },
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

