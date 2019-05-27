<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <form @submit.stop.prevent="AtualizarValores()">
                    <div class="row">
                        <div class="col-md-6 m-auto">
                            <label for="valorAte5">Valor até 5 min:</label>
                            <input id="valorAte5" v-model="valores.valor5" class="form-control text-center" readonly>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6 m-auto">
                            <label for="valorAte30">Valor até 30 min:</label>
                            <input v-validate="'required|min:0|max:99'" type="number" name="valorAte30" id="valorAte30" max="99" min="0" v-model="valores.valor30" class="form-control text-center" placeholder="0 a 99">
                            <span v-if="errors.has('valorAte30')" class="erro">* Digite um número inteiro entre 0 e 99</span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6 m-auto">
                            <label for="valorAte60">Valor até 1h:</label>
                            <input v-validate="'required|min:0|max:99'" type="number" name="valorAte60" id="valorAte60" max="99" min="0" v-model="valores.valor60" class="form-control text-center" placeholder="0 a 99">
                            <span v-if="errors.has('valorAte60')" class="erro">* Digite um número inteiro entre 0 e 99</span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6 m-auto">
                            <label for="valorAdicional">Valor adicional:</label>
                            <input v-validate="'required|min:0|max:99'" type="number" name="valorAdicional" id="valorAdicional" max="99" min="0" v-model="valores.valorAdicional" class="form-control text-center" placeholder="0 a 99">
                            <span v-if="errors.has('valorAdicional')" class="erro">* Digite um número inteiro entre 0 e 99</span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <router-link :to="{ name: 'Inicio' }" class="btn btn-primary">Voltar</router-link>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-success" type="submit">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import services from '../services/ServicesAll.js';

    export default {
        data() {
            return {
                valores:{},
            }
        },

        computed:{
        },

        methods:{

            AtualizarValores(){
                console.log(this.valores);
                
                this.$validator
                    .validateAll()
                    .then(success => {
                        
                        //verifica se os dados foram validados
                        if(success){
                            services
                                .atualizaValores(this.valores)
                                .then(valoresAtualizados => {
                                    if (valoresAtualizados){
                                        alert("Valores atualizados com sucesso!");
                                        this.$router.push({ name: 'Inicio' });
                                        //codigo se atualizar
                                    }
                            });
                        }
                    });
            },
        },

        async created(){
            await services
                .getValores()
                .then(valores => {
                    if (valores){
                        this.valores = valores[0];                        
                    }
            });
        }
    }
</script>

<style scoped>
    .erro{
        color: red;
        font-weight: bold;
    }
</style>