import React, { Component } from 'react';

export default class Pontos extends Component {
    render() {
        return (
            <div className="clearfix">
                <div className="pontos-phantom" />
                <div className="pontos">
                    Bônus: <span className="w3-badge w3-green">6</span>
                </div>
            </div>
        );
    }
}