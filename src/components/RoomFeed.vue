<template>
    <div class="room-feed">
        <b-container fluid>
            <b-row>
              <b-col cols="2">
              <b-btn v-b-modal="'myModal'">Create Map</b-btn>
              </b-col>
              <b-col cols="10">
              <h2>Map Rooms</h2>
              <b-card style="height:100%">
              <b-list-group>
                <b-list-group-item :key='index' v-for="(rm, index) in rooms">{{rm.name}}</b-list-group-item>
              </b-list-group>
              </b-card>
              <b-modal id="myModal"
                      @ok="handleOk">
                  Hello From My Modal!
              </b-modal>
              </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

  export default {
    name: 'RoomFeed',
    data () {
      return {
        showModal : true,
        rooms : []
      }
    },
    methods: {
      mounted: function(){

      }
      ,handleOk : function()
      {
        this.$router.push({ name: 'MapRoom', params: {}})
      }

    },
    sockets:{
      user_joined : function(users){
        console.log(users);
        this.users = users;
      },
      user_left : function(users){
        this.users = users
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