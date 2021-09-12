import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'
import Api from '../../service/api.js';
import { useState, useEffect } from 'react';
const api = new Api();


export default function Index() {
    const [alunos, setAlunos] = useState([]);
    const [nome, setNome] = useState('');
    const [chamada, setChamada] = useState('');
    const [curso, setCurso] = useState('');
    const [turma, setTurma] = useState('');
    const [idAlterando, setIdAlterando] = useState(0);
    
    async function carregar()  {
        let r = await api.listar();
        setAlunos(r);
    }

    async function criar() {
        if(idAlterando === 0) {
            let aluno = await api.adicionar(nome, chamada, curso, turma);

            if(nome === "") {
                alert('O campo nome e obrigatorio !!');
            } else if(chamada === "") {
                alert('O campo chamada e obrigatorio !!');
            } else if(curso === "") {
                alert('O campo curso e obrigatorio !!');
            } else if(turma === "") {
                alert('O campo turma e obrigatorio !!');
            } else if(chamada <= 0) {
                alert('A chamada nao pode ter numero negativo !!');
            } else {
                carregar();
            }

            if(aluno.erro) {
                alert(aluno.erro);
            }

        } else {
            let edita = await api.editar(idAlterando, nome, chamada, curso, turma);
            if(edita.erro) {
                alert(edita.erro);
            } else {
                alert('Aluno alterado !!');
            }
        }
        limpar();
        carregar();
    }

    function limpar() {
        setNome('');
        setChamada('');
        setCurso(''); 
        setTurma('');
        setIdAlterando(0);
    }

    async function remover(id) {
        let remove = await api.remover(id);
        alert('Aluno removido !!');
        carregar();
    }

    async function editar(item) {
        setNome(item.nm_aluno);
        setChamada(item.nr_chamada);
        setCurso(item.nm_curso);
        setTurma(item.nm_turma);
        setIdAlterando(item.id_matricula);
    }

    useEffect(() => {
        carregar();
    }, []);
    return (
        <Container>
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div className="body-right-box">
                    <div className="new-student-box">                       
                        <div className="text-new-student">
                            <div className="bar-new-student"></div>
                            <div className="text-new-student"> { idAlterando === 0 ? "Novo Aluno" : "Alterando aluno" + idAlterando } </div>
                        </div>
                        <div className="input-new-student"> 
                            <div className="input-left">
                                <div className="agp-input"> 
                                    <div className="name-student"> Nome: </div>  
                                    <div className="input"> <input  type="text" value={nome} onChange={e => setNome(e.target.value)} /> </div>  
                                </div> 
                                <div className="agp-input">
                                    <div className="number-student"> Chamada: </div>  
                                    <div className="input"> <input type="text" value={chamada} onChange={e => setChamada(e.target.value)}/> </div> 
                                </div>
                            </div>
                            <div className="input-right">
                                <div className="agp-input">
                                    <div className="corse-student"> Curso: </div>  
                                    <div className="input"> <input type="text" value={curso} onChange={e => setCurso(e.target.value)}/> </div>  
                                </div>
                                <div className="agp-input">
                                    <div className="class-student"> Turma: </div>  
                                    <div className="input"> <input type="text" value={turma} onChange={e => setTurma(e.target.value)}/> </div> 
                                </div>
                            </div>
                            <div className="button-create"> <button onClick={criar}> {idAlterando === 0 ?"Cadastrar" :"Alterar"} </button> </div>
                        </div>
                    </div>
                    <div className="student-registered-box">
                        <div className="row-bar"> 
                            <div className="bar-new-student"> </div>
                            <div className="text-registered-student"> Alunos Matriculados </div>
                        </div>
                        <table className="table-user">
                            <thead>
                                <tr>
                                    <th> ID </th>
                                    <th> Nome </th>
                                    <th> Chamada </th>
                                    <th> Turma </th>
                                    <th> Curso </th>
                                    <th className="coluna-acao"> </th>
                                    <th className="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>

                                {alunos.map((item, i) => 
                                    <tr className= {i % 2 === 0 ? "linha-alternada" : ""}>
                                        <td>{item.id_matricula}</td>
                                        <td title={item.nm_aluno}> {item.nm_aluno != null && item.nm_aluno.length >= 25
                                                ? item.nm_aluno.substr(0, 25) + "..."
                                                : item.nm_aluno} 
                                         </td>
                                        <td> {item.nr_chamada} </td>
                                        <td> {item.nm_turma} </td>
                                        <td> {item.nm_curso} </td>
                                        <td className="coluna-acao"> <button onClick={() => editar(item)}> <img src="/assets/images/edit2.svg" alt="" /> </button> </td>
                                        <td className="coluna-acao"> <button onClick={() => remover(item.id_matricula)}> <img src="/assets/images/trash2.svg" alt="" /> </button> </td>
                                    </tr>   
                                )}
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}