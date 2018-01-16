<template>
  <div class="map-view">
    <v-layout flex justify-center>
        <gmap-map
          :center="{lat:10, lng:10}"
          :zoom="7"
          style="width: 800px; height: 800px"
          @rightclick="show">
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
    </v-layout>
    <v-menu offset-y v-model="showMenu" absolute :position-x="x" :position-y="y">
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import io from 'socket.io-client'

  export default {
    name: 'MapView',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        center: {lat: 10.0, lng: 10.0},
        markers: [],
        viewMenu: false,
        showMenu: false,
        x: 0,
        y: 0,
        items: [
          { title: 'Add Marker' }
        ]
      }
    },
    mounted: function(){

    },
    methods: {
      show (e) {
        console.log(e);
        this.showMenu = false
        this.x = e.pixel.x
        this.y = e.pixel.y
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
      openMenu : function(event){
        this.viewMenu = true      
      },
      addMarker : function(event){
        let position = {position:{ lat: event.latLng.lat(), lng: event.latLng.lng()}}
        this.markers.push(position)
        this.$socket.emit('add_marker', position)
        //this.$socket.emit('emit_method', val)
      },
      markerAdded : function(data){
        console.log(data)
        this.markers.push(data);
        console.log(this.markers);
      },
      goBack : function(){
        this.$router.go(-1)
      }
    },
    watch: {
      '$route'(to, from) {
        // Call resizePreserveCenter() on all maps
        Vue.$gmapDefaultResizeBus.$emit('resize')
      }
    },
    sockets:{
      marker_added : function(data){
        this.markerAdded(data);
      },
      room_added : function(data){
        let nsp = io('localhost:3000/room')
        this.$socket = nsp
        console.log(this.$socket);

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.portrait {
  width: 500px;
  height: 500px;
}
</style>
