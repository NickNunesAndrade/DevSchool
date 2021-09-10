import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export default class Api {
    async listarNomes()  {
        let nomes = await api.get('/matricula');
        return nomes.data;
    }
}