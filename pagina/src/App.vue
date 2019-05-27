<template>
  <div id="app">
    <menu-topo :rotas="routes"/>
    <router-view/>
    <rodape/>
  </div>
</template>

<script>
import MenuTopo from './components/shared/MenuTopo.vue';
import Rodape from './components/shared/Rodape.vue';
import { routes } from './routes/index.js';

export default {
  components:{
    'menu-topo':MenuTopo,
    rodape:Rodape
  },
  name: 'App',
  data() {
    return {
      routes: routes.filter(route => route.menu),
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Aleo&display=swap');
#app {
  
  font-family: 'Aleo', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
