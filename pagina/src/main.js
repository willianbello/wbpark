import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import { routes } from './routes';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css';
import VeeValidate from 'vee-validate';
import eventBus from 'vue-event-bus';
Vue.use(eventBus);

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Axios);
Vue.use(VeeValidate);

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
