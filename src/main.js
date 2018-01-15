import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import router from './router'
import VueSocketio from 'vue-socket.io'
import * as VueGoogleMaps from 'vue2-google-maps'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(VueSocketio, 'http://localhost:3000');
Vue.use(BootstrapVue)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCxVHLbMJQxofyadngJdJdbAVvFVnFBMUY'
   // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

/* eslint-disable no-new */
document.addEventListener('DOMContentLoaded', function() {
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    sockets:{
      connect : function(){
        console.log('socket connected')
      }
    }
  })
})