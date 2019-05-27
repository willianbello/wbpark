<template>
    <div>
        <div class="container">
            <div class="row">

                <!-- Modal -->
                <b-modal id="modalAdicionar" ref="modalAdicionar" centered title="Adicionar Veículo" ok-only ok-title="Cancelar" ok-variant="danger">
                    <form class="row" v-if="!objetoEnviado">
                        <div class="col-md-12">
                            <label for="horario">Horario:</label>
                            <input :value="tempoRodando.hora" class="form-control text-center">
                        </div>
                        <div class="col-md-12">
                            <label for="placa">Placa do Veículo:</label>
                            <input v-validate="'required|min:7|max:7'" name="placa" maxlength="7" minlength="7" v-model="Carro.placa" class="form-control text-center" placeholder="ABC1234">
                            <span v-if="errors.has('placa')" class="erro">* Digite uma placa válida</span>
                        </div>
                        <div class="col-md-12">
                            <label for="descricao">Descrição:</label>
                            <input v-validate="'required|min:3'" name="descricao" v-model="Carro.descricao" class="form-control text-center" placeholder="Fusca Azul">
                            <span v-if="errors.has('descricao')" class="erro"> * Digite um modelo ou descrição sobre o veículo </span>
                        </div>
                    </form>
                    <div v-if="!objetoEnviado" slot="modal-footer" class="w-100">
                        <b-button variant="primary" size="md" class="float-right" @click="adicionaVeiculo()">Adicionar</b-button>
                        <b-button variant="danger" size="md" class="float-right mr-5" @click="hideModal">Close</b-button>
                    </div>
                    <div v-if="objetoEnviado">
                        <h4>Veículo adicionado com Sucesso!</h4>
                    </div>
                </b-modal>
                <!-- Modal FIM -->
                
                <div class="col-md-7">
                    <input type="search" @input="filtro = $event.target.value" class="form-control" placeholder="filtre por placa">
                </div>
                <div class="form-group form-check col-md-1">
                    <input type="checkbox" class="form-check-input" v-model="ativos" id="ativos">
                    <label class="form-check-label" for="ativos">Ativos</label>
                </div>
                <div class="form-group form-check col-md-1">
                    <input type="checkbox" class="form-check-input" v-model="encerrados" id="encerrados">
                    <label class="form-check-label" for="encerrados">Encerrados</label>
                </div>
                <div class="ml-auto col-md-3">
                    <b-button class="btn btn-success" v-b-modal.modalAdicionar>Adicionar Veículo</b-button>
                </div>
                
                <table class="table table-striped mt-3">
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
                            <th scope="col">Encerrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(carro, index) in carrosComFiltro" :key="carro.id" v-if="ativos && carro.estado == 'ativo' && !encerrados">
                            <th scope="row">{{ index+1 }}</th>
                            <td>{{ carro.placa }}</td>
                            <td>{{ carro.descricao }}</td>
                            <td>{{ carro.estado }}</td>
                            <td>{{ carro.entrouData }}</td>
                            <td>{{ carro.entrouHora }}</td>
                            <td>
                                <router-link :to="{ name: 'Encerrar', params: { id:carro._id }}" class="encerrar" v-if="carro.estado == 'ativo'"><i class="fas fa-sign-out-alt"></i></router-link>
                            </td>

                        </tr>

                        <tr v-for="(carro, index) in carrosComFiltro" :key="carro.id" v-if="encerrados && carro.estado == 'encerrado' && !ativos">
                            <th scope="row">{{ index+1 }}</th>
                            <td>{{ carro.placa }}</td>
                            <td>{{ carro.descricao }}</td>
                            <td>{{ carro.estado }}</td>
                            <td>{{ carro.entrouData }}</td>
                            <td>{{ carro.entrouHora }}</td>
                            <td>
                                <router-link :to="{ name: 'Encerrar', params: { id:carro._id }}" class="encerrar" v-if="carro.estado == 'ativo'"><i class="fas fa-sign-out-alt"></i></router-link>
                            </td>
                        </tr>

                        <tr v-for="(carro, index) in carrosComFiltro" :key="carro.id" v-if="(encerrados && ativos)">
                            <th scope="row">{{ index+1 }}</th>
                            <td>{{ carro.placa }}</td>
                            <td>{{ carro.descricao }}</td>
                            <td>{{ carro.estado }}</td>
                            <td>{{ carro.entrouData }}</td>
                            <td>{{ carro.entrouHora }}</td>
                            <td>
                                <router-link :to="{ name: 'Encerrar', params: { id:carro._id }}" class="encerrar" v-if="carro.estado == 'ativo'"><i class="fas fa-sign-out-alt"></i></router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import services from '../services/ServicesAll.js';

    export default {
        data() {
            return {
                carros:[],
                carrosFiltrados:[],
                loading: true,
                objetoSaida:{},
                filtro:'',
                tempoRodando:'',
                objetoEnviado:false,
                Carro:{
                    placa:'',
                    descricao:'',
                    entrouData:'',
                    entrouHora:'',
                },
                exibeEstados:0,
                ativos:true,
                encerrados:true,
            }
        },

        computed:{
            carrosComFiltro(){
                if(this.filtro){
                    /* Filtrar */
                    let exp = new RegExp(this.filtro.trim(), 'i');
                    this.carrosFiltrados = this.carros.filter(carro => exp.test(carro.placa));
                    return this.carrosFiltrados;
                }else{
                    return this.carros;
                }
            },
        },

        created() {
            this.$bus.$on('horaRodando', horario => {
                this.tempoRodando = horario;
            });
        },

        async mounted(){

            await services
                .getAll()
                .then((res)=>{
                    this.carros = res;
                    this.loading = false;
                },(erro => console.log(erro)));

            this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
                this.Carro.placa = null;
                this.Carro.descricao = null;
                this.Carro.entrouData = null;
                this.Carro.entrouHora = null;
                this.objetoEnviado = false;
            })
        },

        methods:{

            adicionaVeiculo(){
                this.$validator
                    .validateAll()
                    .then(async (success) =>{
                        if(success){
                            this.Carro.entrouHora = this.tempoRodando.hora;
                            this.Carro.entrouData = this.tempoRodando.data;
                            await services
                                .cadastro(this.Carro)
                                .then((res) => {
                                    this.objetoEnviado = true;
                                    this.carros = null;
                                    this.loading = true;
                                    services
                                        .getAll()
                                        .then((res)=>{
                                            this.carros = res;
                                            this.loading = false;
                                        },(erro => console.log(erro)));

                                }, err => {
                                    console.error('Falha ao salvar no Banco de dados');
                                })
                        }else{
                            console.error('Campos inválidos');
                            return;
                        }        
                });
            },

            hideModal() {
                this.$refs['modalAdicionar'].hide()
            }
        }
    }
</script>

<style scoped>
    .tabela{
        width: 70%;
    }

    .informacoes{
        height: 50px;
        line-height: 50px;
        width: 80%;
        margin: 0 auto;
    }

    .loading{
        margin-top: 50px;
        font-size: 30px;
        height: 80px;
        width: 80px;
    }

    .encerrar{
        cursor: pointer;
        color: green;
    }

    .erro{
        color: red;
        font-weight: bold;
    }
</style>
