<template>
    <div>

          <v-layout flex justify-center>

      <!-- <gmap-map
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
        </gmap-map> -->
            <div class="google-map" :id="mapName" @contextmenu="show"/>
          <v-menu offset-y v-model="showMenu" absolute full-width :position-x="x" :position-y="y">

            <v-list>
              <v-list-tile v-for="item in items" :key="item.title" @click="openMarkerDialog">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          </v-layout>
      <!-- <v-map class="vmap" :zoom=13 :center="[47.413220, -1.219482]"
        @l-contextmenu="show">
         <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
     </v-map> -->
     <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Marker</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs3 sm3>
              <v-select
                label="Color"
                v-bind:items="srcs">
                 <template slot="selection" slot-scope="data">
                  <v-avatar>
                    <img :src="data.item.img">
                  </v-avatar>
                </template>
                <template slot="item" slot-scope="data">
                  <template>
                    <v-list-tile-avatar>
                      <img v-bind:src="data.item.img"/>
                    </v-list-tile-avatar>
                  </template>
                </template>
              </v-select>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Description" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="showDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addMarker">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
export default {
  name: 'google-map',
  props: {
    'name': { 
      type : String,
      default: function(){
        return "hello"
      }
    },
    'latitude': {
      type: Number,
      default: function(){
        return 39.50
      }
    },
    'longitude': {
      type: Number,
      default: function(){
        return -98.35
      }
    },
    'zoom': {
      type: Number,
      default: function(){
        return 4
      }
    }
  },
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837
      }, {
        latitude: 51.505874,
        longitude: -0.1838486
      }, {
        latitude: 51.4998973,
        longitude: -0.202432
      }],
     // map: null,
      bounds: null,
      markers: [],
      showMenu: false,
      showDialog: false,
      //lat: 0,
      //lng: 0,
      items: [
        { title: 'Add Marker' }
      ],
      srcs: [
        {img: '/src/assets/marker.png'},
        {img: '/src/assets/marker.png'},
        {img: '/src/assets/marker.png'},
        {img: '/src/assets/marker.png'},
        {img: '/src/assets/marker.png'}
      ]
    }
  },
  mounted() {
    //'this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
   // 'const mapCentre = this.markerCoordinates[0]
    // const options = {
    //   center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    // }
     this.map = new google.maps.Map(element, {
        center: {lat: this.latitude, lng: this.longitude},
        zoom: this.zoom
      });

      this.map.addListener('rightclick', this.show);

    // this.markerCoordinates.forEach((coord) => {
    //   const position = new google.maps.LatLng(coord.latitude, coord.longitude);
    //   const marker = new google.maps.Marker({ 
    //     position,
    //     map: this.map
    //   });
    // this.markers.push(marker)
    //   this.map.fitBounds(this.bounds.extend(position))
    // });

  },
  methods : {
    show (e) {
        console.log(e);
        this.showMenu = false
        this.lat = e.latLng.lat();
        this.lng = e.latLng.lng();
        this.x = window.event.clientX;
        this.y = window.event.clientY;
        this.$nextTick(() => {
          this.showMenu = true
        });
    },
    openMarkerDialog : function(event){
      this.showMenu = false;
      this.$nextTick(() => {
        this.showDialog = true;
      });
    },
    addMarker : function(){
      this.showDialog = false
      let position = {position:{ lat: this.lat, lng: this.lng}}
      this.markers.push(position)
      this.$socket.emit('add_marker', position)
    }
  }
};
</script>
<style scoped>
  .menu {
    max-width: 600px;
  }

  .google-map {
    width: 1000px;
    height: 800px;
    margin: 0 auto;
    background: gray;
  }
</style>