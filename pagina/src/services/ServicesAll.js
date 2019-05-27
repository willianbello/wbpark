import axios from "axios";
const uri = "http://localhost:8085/api";

export default{
    getAll(){
        return axios
            .get(`${uri}/carros`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
    },
    getValores(){
        return axios
            .get(`${uri}/valores`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
    },
    atualizaValores(configuracoes){
        return axios
            .put(`${uri}/valores/${configuracoes._id}`, configuracoes)
            .then(res => {
                return res.data;
            })
    },
    // servico de login - REFAZER
    verificaUsuario(usuario){
        return axios
            .get(`${uri}/login/${usuario}`)
            .then(res => {
                return res.data;
            })
    },
    getCarById(id){
        return axios
            .get(`${uri}/carros/${id}`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
    },
    cadastro(carro){
        return axios
            .post(`${uri}/carros/`, carro)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
    },
    atualizaCarro(carro){
        return axios
            .put(`${uri}/carros/${carro._id}`, carro)
            .then(res => {
                return res.data;
            })
            .catch(err => console.error(err));
    },
    deletaCarro(id){
        return axios
            .delete(`${uri}/carros/${id}`)
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err));
    }
} 