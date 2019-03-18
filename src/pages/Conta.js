import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button} from 'primereact/button';

export default class Conta extends Component {
    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Conta</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="nomeInput">Nome:</label>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText id="nomeInput"/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="emailInput">Email:</label>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText id="emailInput"/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="senhaAtualInput">Senha Atual:</label>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <Password id="senhaAtualInput"/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="novaSenhaInput">Nova Senha:</label>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <Password id="novaSenhaInput"/>
                            </div>
                        </div>
                        <Button label="Salvar"/>
                    </div>
                </div>
            </div>
        );
    }
}