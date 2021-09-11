import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'
import Api from '../../service/api.js';
import { useState, useEffect } from 'react';
const api = new Api();


export default function Index() {
    const [alunos, setAlunos] = useState([]);
    
    async function carregar()  {
        let r = await api.listarNomes();
        console.log(r);
        setAlunos(r);
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
                            <div className="text-new-student">Novo Aluno</div>
                        </div>
                        <div className="input-new-student"> 
                            <div className="input-left">
                                <div className="agp-input"> 
                                    <div className="name-student"> Nome: </div>  
                                    <div className="input"> <input /> </div>  
                                </div> 
                                <div className="agp-input">
                                    <div className="number-student"> Chamada: </div>  
                                    <div className="input"> <input /> </div> 
                                </div>
                            </div>
                            <div className="input-right">
                                <div className="agp-input">
                                    <div className="corse-student"> Curso: </div>  
                                    <div className="input"> <input /> </div>  
                                </div>
                                <div className="agp-input">
                                    <div className="class-student"> Turma: </div>  
                                    <div className="input"> <input /> </div> 
                                </div>
                            </div>
                            <div className="button-create"> <button> Cadastrar </button> </div>
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

                                {alunos.map(item => 
                                    <tr>
                                        <td>{item.id_matricula}</td>
                                        <td> Fulao da Silva Sauro</td>
                                        <td> 15 </td>
                                        <td> InfoX </td>
                                        <td> Informática </td>
                                        <td> <button> <img src="/assets/images/edit2.svg" alt="" /> </button> </td>
                                        <td> <button> <img src="/assets/images/trash2.svg" alt="" /> </button> </td>
                                    </tr>   
                                )}

                                <tr>
                                    <td> 1 </td>
                                    <td> Fulao da Silva Sauro</td>
                                    <td> 15 </td>
                                    <td> InfoX </td>
                                    <td> Informática </td>
                                    <td> <button> <img src="/assets/images/edit2.svg" alt="" /> </button> </td>
                                    <td> <button> <img src="/assets/images/trash2.svg" alt="" /> </button> </td>
                                </tr>
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}