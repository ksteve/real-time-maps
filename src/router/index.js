import Vue from 'vue'
import Router from 'vue-router'
import App from './../components/App.vue'
import RoomFeed from './../components/RoomFeed.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    }
  ]
})
