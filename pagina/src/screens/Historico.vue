<template>
    <div>
        <div v-if="!loading" class="container text-right">
            <button class="btn btn-warning" @click="imprimir()">Imprimir</button>
        </div>

        <table class="table table-striped mt-3" id="tabela">
            <!-- Loading -->
            <div v-if="loading" class="spinner-border text-success loading" role="status">
                <span class="sr-only">Carregando...</span>
            </div>

            <thead v-if="!loading">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Descricao</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Entrada Data</th>
                    <th scope="col">Entrada Hora</th>
                    <th scope="col">Saída Data</th>
                    <th scope="col">Saída Hora</th>
                    <th scope="col">Valor R$</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(carro, index) in carros" :key="carro.id">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ carro.placa }}</td>
                    <td>{{ carro.descricao }}</td>
                    <td>{{ carro.estado }}</td>
                    <td>{{ carro.entrouData }}</td>
                    <td>{{ carro.entrouHora }}</td>
                    <td><span v-if="carro.saiuData != '0'">{{ carro.saiuData }}</span></td>
                    <td><span v-if="carro.saiuHora != '0'">{{ carro.saiuHora }}</span></td>
                    <td><span v-if="carro.valor">{{ carro.valor }}<span v-if="carro.valor > 0">,00</span></span></td>
                    <td>
                        <router-link :to="{ name: 'encerrar', params: { id:carro._id }}" class="encerrar" v-if="carro.estado == 'ativo'"></router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import services from '../services/ServicesAll.js';

    export default {
        data() {
            return {
                carros:[],
                loading: true,
            }
        },

        created(){
            services
                .getAll()
                .then((res)=>{
                    this.carros = res;
                    this.loading = false;
                },(erro => console.log(erro)));
        },

        methods:{
            imprimir(){
                let conteudo = document.getElementById('tabela').innerHTML;
                window.print(conteudo);
            }
        }
    }
</script>

<style scoped>

</style>