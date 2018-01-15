<template>
  <div class="map-view">
    <b-container fluid>
    <b-row>
        <b-button 
          type="button" 
          class="btn btn-default glyphicon glyphicon-menu-left"
          style="width: 50px; height: 50px"
          v-on:click="goBack">
        </b-button>
      </b-row>
      <b-row>
        <b-col class="col-md-10">
          <gmap-map
            :center="{lat:10, lng:10}"
            :zoom="7"
            style="width: 100%; height: 500px"
            @click="addMarker($event)">
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
            ></gmap-marker>
          </gmap-map>
          <activity-feed/>
        </b-col>
        <b-col col-md-4>
          <connected-users/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import ConnectedUsers from './ConnectedUsers.vue'
  import ActivityFeed from './ActivityFeed.vue'
  import io from 'socket.io-client'

  export default {
    name: 'MapRoom',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        center: {lat: 10.0, lng: 10.0},
        markers: [{position:{lat: 10, lng : 10}}]
      }
    },
    components : {
        'connected-users' : ConnectedUsers,
        'activity-feed' : ActivityFeed
    },
    mounted: function(){

    },
    methods: {
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
