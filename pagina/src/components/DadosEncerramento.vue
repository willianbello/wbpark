<template>
    <div class="container">
        <div class="row mt-5">
            <form action="" class="m-auto col-md-12" @submit.prevent.stop="finalizar()">
                <div class="form-group row">
                    <div class="col-md-6">
                        <label for="horaEntrada">Data Entrada:</label>
                        <input id="horaEntrada" :value="carro.entrouData" class="form-control text-center" readonly>
                    </div>
                    <div class="col-md-6">
                        <label for="horaEntrada">Hora Entrada:</label>
                        <input id="horaEntrada" :value="carro.entrouHora" class="form-control text-center" readonly>
                    </div>
                </div>
                <div class="form-group row" v-if="pagamento">
                    <div class="col-md-6 margem">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Tempo decorrido: </span>
                            </div>
                            <input v-model="tempoFormatado" class="form-control text-center valor" readonly preppend="teste">
                        </div>
                        <label for="horaEntrada">Valor a ser Pago:</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">R$</span>
                            </div>
                            <input id="horaEntrada" :value="pagamento" class="form-control text-center valor" readonly preppend="teste">
                            <div class="input-group-append">
                                <span class="input-group-text">.00</span>
                            </div>
                        </div>
                        <div class="form-group m-auto text-center">
                            <div class="row">
                                <div class="col-md-6">
                                    <router-link :to="{ name: 'Inicio' }" class="btn btn-danger">Cancelar</router-link>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-success" type="submit" >Finalizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!pagamento" class="spinner-border text-success loading" role="status">
                    <span class="sr-only">Carregando...</span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import services from '../services/ServicesAll.js';
    export default {
        data() {
            return {
                carro:{},
                id:this.$route.params.id,
                data:'',
                hora:'',
                valores:{
                    valor5:0,
                    valor30:0,
                    valor60:0,
                    valorAdicional:0,
                },
                pagamento:0,
                mesmoDia: false,
                qntHoraPassadas:'',
                qntMinutosPassados:'',
                tempoFormatado:'',
                tempoRodando:{},
                pronto:false,
            }
        },

        async mounted() {
            // pegar valores do banco
                await services
                    .getValores()
                    .then(valores => {
                        this.valores = valores[0];
                    }, err => {
                        console.error(err);
                });
        },

        async created(){
            
            if(this.id)
            services
                .getCarById(this.id)
                .then(carro => {
                    this.carro = carro;
                    this.$bus.$on('horaRodando', horario => {
                    this.data = horario.data;
                    this.hora = horario.hora;

                    if (this.data.substring(3,5) == this.carro.entrouData.substring(3,5)){
                        //console.log('OK');
                        if (this.data.substring(0,2) == this.carro.entrouData.substring(0,2)){
                            //console.log('OK');
                            this.mesmoDia = true;
                        }else{
                            this.mesmoDia = false;
                        }
                    }

                    if (!this.mesmoDia){
                        this.pagamento = 20;
                        this.tempoFormatado = 'Mais de 1 dia';
                    }else{

                        this.qntHoraPassadas = parseInt(this.hora.substring(0,2)) - parseInt(this.carro.entrouHora.substring(0,2));
                            
                            if (this.qntHoraPassadas > 0){
                                if(parseInt(this.hora.substring(3,5)) - parseInt(this.carro.entrouHora.substring(3,5)) < 0){
                                    this.qntMinutosPassados = parseInt(this.hora.substring(3,5)) - parseInt(this.carro.entrouHora.substring(3,5))+60;
                                }else{
                                    this.qntMinutosPassados = parseInt(this.hora.substring(3,5)) - parseInt(this.carro.entrouHora.substring(3,5));
                                }
                            }else{
                                this.qntMinutosPassados = parseInt(this.hora.substring(3,5)) - parseInt(this.carro.entrouHora.substring(3,5));
                            }
                            
                        if(this.mesmoDia && this.qntMinutosPassados >= 5){
                            this.tempoFormatado = this.qntHoraPassadas + ' h e ' + this.qntMinutosPassados + ' min';
                        }

                        if (this.qntHoraPassadas == 0 && this.qntMinutosPassados < 5){
                            this.tempoFormatado = 'Menos de 5 min';
                            this.pagamento = this.valores.valor5;
                        }else if (this.qntHoraPassadas == 0 && this.qntMinutosPassados >= 5 && this.qntMinutosPassados < 30){
                            this.pagamento = this.valores.valor30;
                        }else if (this.qntHoraPassadas == 0 && this.qntMinutosPassados >= 30 && this.qntMinutosPassados < 60){
                            this.pagamento = this.valores.valor60;
                        }else{
                            this.pagamento = parseInt(this.valores.valor60) + (parseInt(this.qntHoraPassadas) * parseInt(this.valores.valorAdicional));
                        }

                        let calculaHoraEData = setInterval(()=>{
                            this.qntHoraPassadas = parseInt(this.hora.substring(0,2)) - parseInt(this.carro.entrouHora.substring(0,2));
                            
                            if (this.qntHoraPassadas > 0){
                                if(parseInt(this.hora.substring(3,5)) - parseInt(this.carro.entrouHora.substring(3,5)) < 0){
                                    this.qntMinutosPassados = parseInt(this.hora.substring(3,5)) - parseInt(this.carro.entrouHora.substring(3,5))+60;
                                }else{
                                    this.qntMinutosPassados = parseInt(this.hora.substring(3,5)) - parseInt(this.carro.entrouHora.substring(3,5));
                                }
                            }else{
                                this.qntMinutosPassados = parseInt(this.hora.substring(3,5)) - parseInt(this.carro.entrouHora.substring(3,5));
                            }

                            this.tempoFormatado = this.qntHoraPassadas + ' h e ' + this.qntMinutosPassados + ' min';
                        },6000);
                    }
                });
                }, err => {
                    console.log(err);
                })
        },

        methods: {
            async finalizar(){
                this.carro.valor = this.pagamento;
                this.carro.saiuData = this.data;
                this.carro.saiuHora = this.hora;
                this.carro.estado = 'encerrado';

                await services
                    .atualizaCarro(this.carro)
                    .then(success => {
                        if (success){
                            alert('Encerrado com Sucesso!');
                            this.$router.push({ name: 'Inicio' });
                        }
                    }, err => {
                        console.error('Falha ao atualizar dados')
                });         
            }
        },
    }
</script>

<style scoped>
    .margem{
        margin: 30px auto 0 auto
    }

    .valor{
        font-size: 30px;
        font-weight: bold;
    }

    .loading{
        margin-top: 50px;
        font-size: 30px;
        height: 80px;
        width: 80px;
    }
</style>