import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { withRouter } from 'react-router-dom';

class Registro extends Component {
    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Faça o seu Cadastro!</h1>
                        <div className="p-grid">
                            <div className="p-col-6 p-md-2">
                                <label htmlFor="loginInput">Login:</label>
                            </div>
                            <div className="p-col-6 p-md-6">
                                <InputText id="loginInput"/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6 p-md-2">
                                <label htmlFor="emailInput">Email:</label>
                            </div>
                            <div className="p-col-6 p-md-6">
                                <InputText id="emailInput"/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6 p-md-2">
                                <label htmlFor="passwordInput">Senha:</label>
                            </div>
                            <div className="p-col-6 p-md-6">
                                <Password id="passwordInput"/>
                            </div>
                        </div>
                        <Button label="Registrar"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Registro);