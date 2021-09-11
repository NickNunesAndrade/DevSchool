import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export default class Api {
    async listarNomes()  {
        let r = await api.get('/matricula');
        return r.data;
    }

    async adicionar(nome, chamada, curso, turma)  {
        let cria = await api.post('/matricula',{nome, chamada, curso, turma});
        return cria.data;
    }


    async editar(nome, chamda, curso, turma, id) {
        let aluno = {
            nm_aluno: nome,
            nr_chamada: chamda,
            nm_curso: curso,
            nm_turma: turma     
        }
        let editar = await api.put(`/matricula/${id}`, aluno);
        return editar.data;
    }

    async remover(id) {
        let remover = await api.delete(`/matricula/${id}`);
        return remover.data;
    }
}