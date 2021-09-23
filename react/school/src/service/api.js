import axios from 'axios';
const api = axios.create({
    baseURL: 'https://devschool-matricula.herokuapp.com'
});

export default class Api {
    async listar() {
        let r = await api.get('/matricula');
        return r.data;
    }

    async adicionar(nome, chamada, curso, turma)  {
        let cria = await api.post('/matricula',{nome, chamada, curso, turma});
        return cria.data;
    }


    async editar(nome, chamada, curso, turma, id) {
        let editar = await api.put(`/matricula/${id}`,{nome, chamada, curso, turma});
        return editar.data;
    }

    async remover(id) {
        let remover = await api.delete(`/matricula/${id}`);
        return remover.data;
    }
}