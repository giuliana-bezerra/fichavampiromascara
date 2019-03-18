import React, { Component } from 'react';
import { DataTableCrud } from '../components/DataTableCrud';
import AgengamentoDataTableCrud from '../components/AgendamentoDataTableCrud';

export default class Agendamento extends Component {
    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Sessões Marcadas</h1>
                        <AgengamentoDataTableCrud title="Agendar Sessão"/>
                    </div>
                </div>
            </div>
        );
    }
}