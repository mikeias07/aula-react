import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component{
    constructor(){
        super();
        this.state = {msgErro:''};
    }
    
    render(){
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props} name={this.props.name} values={this.props.value} onChange={this.props.onChange}/>
            </div>
        );
    }

    componentDidMount(){
        PubSub.subscribe("erro-validacao", function(topico,erro){
            if(erro.field === this.props.name){
                this.setState({msgErro:erro.defaultMessage});
            }
        }.bind(this));

        PubSub.subscribe("limpa-erros", function(topico){
            this.setState({msgErro:''});
        }.bind(this));
    }
}