<template>
    <div>
        <div class="menu">
            <nav class="navbar container">
                <a class="navbar-brand" href="#">WBPark</a>
                <div id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto d-inline">
                        <li class="nav-item active d-inline" v-for="rota in rotas" :key="rota.id">
                            <router-link class="menu-itens ml-4" :to="rota.path ? rota.path:'/'">{{ rota.name }}<span class="sr-only">{{ rota.name }}</span></router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12 horario">
                    <span>Horário atual: {{ horario.data }} - {{ horario.hora }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:{
            rotas:{
                type: Array,
                required: true,
            }
        },

        data() {
            return {
                horario:{
                    hora:'',
                    data:'',
                }
            }
        },

        created(){
            this.emitirHora();
            setInterval(()=>{
                let hoje = new Date();
                let hora = hoje.getHours();
                if (hora < 10) hora = "0"+hora;
                let minutos = hoje.getMinutes();
                if (minutos < 10) minutos = "0"+minutos;
                let segundos = hoje.getSeconds();
                if (segundos < 10) segundos = "0"+segundos;
                let dia = hoje.getDate();
                if (dia < 10) dia = "0" + dia;
                let mes = hoje.getMonth()+1;
                if (mes < 10) mes = "0" + mes;
                let ano = hoje.getFullYear();

                this.horario.hora = hora+":"+minutos+":"+segundos;
                this.horario.data = dia+"/"+mes+"/"+ano;

                this.emitirHora();
                
            },1000);
        },

        methods: {
            emitirHora(){
                this.$bus.$emit('horaRodando', this.horario);
            }
        },
    }
</script>

<style scoped>
    .menu{
        background-color: #439143;
    }

    .navbar-brand{
        color: white;
    }

    .horario{
        padding-left: 2%;
        text-align: left;
    }

    .menu-itens{
        color: white;
        text-decoration: none;
    }
    .menu-itens:hover{
        color: #233329;
    }
</style>