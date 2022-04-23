import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import router from './route/index.js'
import { store } from './store/store.js'

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
initializeApp(firebaseConfig);

new Vue({  
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
