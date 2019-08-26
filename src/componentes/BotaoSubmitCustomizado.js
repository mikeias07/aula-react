import React, { Component } from 'react';

export default class BotaoSubmitCustomizado extends Component{
    render(){
        return(
            <div className="pure-control-group">
            <label></label>
            <input type="submit" value={this.props.label} className="pure-button-primary pure-button"/>
          </div>
        );
    }
}