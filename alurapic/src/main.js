import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  /*routes: routes; Em ECS6, quando o valor da propriedade tem o mesmo nome, podemos deixar 
    simplismente o nome da propriedade */
  routes
});

Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
