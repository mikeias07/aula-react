import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioLivros extends Component {
    constructor() {
        super();
        this.state = {titulo:'', preco:'', autorId:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        console.log("dados de livros sendo enviados");
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: ' post',
            data: JSON.stringify({
                titulo: this.state.titulo,
                preco: this.state.preco,
                autorId: this.state.autorId
            }),

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
                </form>
            </div>
        );
    }
}

export default class LivroBox extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro Livro</h1>
                </div>
                <div>
                    <FormularioLivros/>
                </div>
            </div>

        );
    }
}