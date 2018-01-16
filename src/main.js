import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketio from 'vue-socket.io'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"
import Vue2Leaflet from 'vue2-leaflet'
import "leaflet/dist/leaflet.css"


Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCxVHLbMJQxofyadngJdJdbAVvFVnFBMUY'
   // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
  }
})
Vue.use(Vuetify)
Vue.use(VueSocketio, 'http://localhost:3000');


/* eslint-disable no-new */
//document.addEventListener('DOMContentLoaded', function() {
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
//})