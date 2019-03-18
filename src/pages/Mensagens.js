import React, { Component } from 'react';
import MensagensDataTableCrud from '../components/MensagemDataTableCrud';

export default class Mesas extends Component {
    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Mensagens</h1>
                        <MensagensDataTableCrud title="Enviar Mensagem"/>
                    </div>
                </div>
            </div>
        );
    }
}