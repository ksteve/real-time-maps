<template>
    <div>
      <!-- <div class="google-map" :id="mapName"/> -->
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
            <v-list-tile-title @click="openMarkerDialog">{{ item.title }}</v-list-tile-title>
        </v-list-tile>
        </v-list>
    </v-menu>
      <!-- <v-map class="vmap" :zoom=13 :center="[47.413220, -1.219482]"
        @l-contextmenu="show">
         <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
     </v-map> -->
     <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal last name" hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Age"
                  required
                  :items="['0-17', '18-29', '30-54', '54+']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                ></v-select>
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
  props: ['name'],
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
      map: null,
      bounds: null,
      markers: [],
      showMenu: false,
      showDialog: false,
      x: 0,
      y: 0,
      lat: 0,
      lng: 0,
      items: [
        { title: 'Add Marker' }
      ]
    }
  },
  //   mounted: function () {
  //   this.bounds = new google.maps.LatLngBounds();
  //   const element = document.getElementById(this.mapName)
  //   const mapCentre = this.markerCoordinates[0]
  //   const options = {
  //     center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
  //   }
  //   this.map = new google.maps.Map(element, options);
  //   this.markerCoordinates.forEach((coord) => {
  //     const position = new google.maps.LatLng(coord.latitude, coord.longitude);
  //     const marker = new google.maps.Marker({ 
  //       position,
  //       map: this.map
  //     });
  //   this.markers.push(marker)
  //     this.map.fitBounds(this.bounds.extend(position))
  //   });
  //   this.map.addListener('rightclick', function(e) {
  //     console.log(e)
  //       this.show(window.event);
  //       this.lat = e.latLng.lat();
  //       this.lng = e.latLng.lng();
  //       this.x = window.event.clientX
  //       this.y = window.event.clientY
  //   }.bind(this));
  // },
  methods : {
    show (e) {
        console.log(e);
        this.x = window.event.clientX;
        this.y = window.event.clientY;
        this.lat = e.latLng.lat();
        this.lng = e.latLng.lng();
        this.showMenu = false
        this.$nextTick(() => {
        this.showMenu = true
        })
    },
    openMarkerDialog : function(event){
      this.showMenu = false;
      this.showDialog = true;
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

.vmap {
  width: 800px;
  height: 800px;
  margin: 0 auto;
  background: gray;
}
</style>