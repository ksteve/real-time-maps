<template>
  <div class="connected-users">
    <h2>users</h2>
    <b-list-group>
      <b-list-group-item :key='index' v-for="(ux, index) in users">{{ux}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  export default {
    name: 'ConnectedUsers',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        users : []
      }
    },
    methods: {

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
