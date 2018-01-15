<template>
  <div class="activity-feed">
    <h2>activity</h2>
    <b-list-group>
      <b-list-group-item :key='index' v-for="(ux, index) in feed">{{ux}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  export default {
    name: 'ActivityFeed',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        feed : []
      }
    },
    methods: {

    },
    sockets:{
      user_joined : function(users){
        console.log(users);
        this.feed = users;
      },
      user_left : function(users){
        this.feed = users
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
