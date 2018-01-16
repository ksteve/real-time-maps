<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Quick Maps</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center>
          <gmap-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import MapView from './MapView.vue'
  import GmapView from './GmapView.vue'
  export default {
    name: 'App',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        drawer: null
      }
    },
    props: {
      source: String
    },
    components: {
      "map-view" : MapView,
      "gmap-view" : GmapView
    },
    methods: {
      test : function(){
        console.log("hello")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.map-view {
  width: 100%;
  height: 100%;
}
</style>
