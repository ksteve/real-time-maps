import Vue from 'vue'
import Router from 'vue-router'
import MapRoom from './../components/MapRoom.vue'
import RoomFeed from './../components/RoomFeed.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RoomFeed',
      component: RoomFeed
    },
    {
      path: '/maps',
      name: 'MapRoom',
      component: MapRoom
    }
  ]
})
