import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';

class TabelaLivros extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (livro) {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

        );
    }
}
class FormularioLivros extends Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: '', autorId: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        console.log("dados de livros sendo enviados");
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({
                titulo: this.state.titulo,
                preco: this.state.preco,
                autorId: this.state.autorId
            }),
            success: function (novaListagem) {
                console.log("enviado com sucesso");
                // PubSub.publish('atualiza-lista-autores', novaListagem);
                // this.setState({ nome: '', email: '', senha: '' });
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({titulo:'',preco:'',autorId:''});
            }.bind(this),
            error: function(resposta){
                console.log(resposta);
                if(resposta.status === 400){
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function(){
                PubSub.publish("limpa-erros", {});
            }
        });

    }

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setAutorId(evento) {
        this.setState({ autorId: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Titulo" />
                    <InputCustomizado id="preco" type="number" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preco" />
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>

                        <select value={this.state.autorId} id="autorId" name="autorId" onChange={this.setAutorId}>
                            <option>Selecione Autor</option>
                            {
                                this.props.autores.map(function (autor) {
                                    return <option key={autor.id} value={autor.id}>
                                        {autor.nome}
                                    </option>;
                                })
                            }


                        </select>
                    </div>
                    <BotaoSubmitCustomizado />
                </form>
            </div>
        );
    }
}

export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = { lista: [], autores: [] };

    }


    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/livros",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        }
        );



        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ autores: resposta });
            }.bind(this)
        }
        );

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
            this.setState({ lista: novaLista });
        }.bind(this));
    }
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro Livro</h1>
                    <span></span>
                </div>
                <div className="content-subhead" id="content">
                    <div className="content">
                        <FormularioLivros autores={this.state.autores} />
                        <div className="content">
                            <TabelaLivros lista={this.state.lista} />
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}