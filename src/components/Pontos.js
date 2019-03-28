import React, { Component } from 'react';
import { Button } from 'primereact/button';

export default class Pontos extends Component {
    render() {
        return (
            <div className="clearfix">
                <div className="pontos-phantom" />
                <div className="pontos">
                    Bônus: <span className="w3-badge w3-green">{this.props.pontos}</span>
                </div>
            </div>
        );
    }
}