import Home from '../screens/Home.vue';
import Encerrar from '../screens/Encerrar.vue';
import Historico from '../screens/Historico.vue';
import Configuracoes from '../screens/Configuracoes.vue';

export const routes = [
    { path:'', component: Home, name: 'Inicio', menu: true },
    { path:'/encerrar/:id', component: Encerrar, name: 'Encerrar', menu: false },
    { path:'/historico', component: Historico, name: 'Historico', menu: true },
    { path:'/configuracoes', component: Configuracoes, name: 'Configuracoes', menu: true },
];