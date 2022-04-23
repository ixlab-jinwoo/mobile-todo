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
      <v-btn @click=startCam> Cam </v-btn>      

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
      <div id="cam"></div>
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
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

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
      model: null,
      webcam: null,
      predicted: "",
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
    async loop() {
      this.webcam.update(); // update the webcam frame
      await this.predict();
      window.requestAnimationFrame(this.loop);
    },
    async predict() {
      // predict can take in an image, video or canvas html element
      let prediction = await this.model.predictTopK(
        this.webcam.canvas,
        1,
        true
      );
      this.message = prediction[0].className;
    },
    async startCam() {
      this.webcam = new tmImage.Webcam(200, 200, true);
      await this.webcam.setup(); // request access to the webcam
      await this.webcam.play();
      document.getElementById("cam").appendChild(this.webcam.canvas);
      window.requestAnimationFrame(this.loop);
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
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
    let baseURL = "https://teachablemachine.withgoogle.com/models/[Yourmodel]]/";
    this.model = await tmImage.load(
      baseURL + "model.json",
      baseURL + "metadata.json"
    );
    let maxPredictions = this.model.getTotalClasses();
    console.log(maxPredictions);
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

