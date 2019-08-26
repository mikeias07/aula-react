import React, { Component } from 'react';

export default class InputCustomizado extends Component{
    render(){
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props} name={this.props.name} values={this.props.value} onChange={this.props.onChange}/>
            </div>
        );
    }
}