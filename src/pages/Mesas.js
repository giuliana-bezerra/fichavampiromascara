import React, { Component } from 'react';
import MesaDataTableCrud from '../components/MesaDataTableCrud';

export default class Mesas extends Component {
    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Mesas</h1>
                        <MesaDataTableCrud title="Criar Mesa"/>
                    </div>
                </div>
            </div>
        );
    }
}