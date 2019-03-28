import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { withRouter } from 'react-router-dom';
import { Messages } from 'primereact/messages';

class Registro extends Component {
    constructor() {
        super();
        this.username = '';
        this.nome = '';
        this.email = '';
        this.password = '';
    }

    render() {
        return (
            <form onSubmit={event => this.registrar(event)}>
                <Messages id="mensagens" ref={(el) => this.messages = el}></Messages>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-lg-6">
                        <div className="card card-w-title">
                            <h1>Faça o seu Cadastro!</h1>
                            <div className="p-grid">
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="loginInput">Login:</label>
                                </div>
                                <div className="p-col-6 p-md-6">
                                    <InputText id="loginInput" onChange={event => this.username = event.target.value} required/>
                                </div>
                            </div>
                            <div className="p-grid">
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="nomeInput">Nome:</label>
                                </div>
                                <div className="p-col-6 p-md-6">
                                    <InputText id="nomeInput" onChange={event => this.nome = event.target.value} required/>
                                </div>
                            </div>
                            <div className="p-grid">
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="emailInput">Email:</label>
                                </div>
                                <div className="p-col-6 p-md-6">
                                    <InputText id="emailInput" onChange={event => this.email = event.target.value} required/>
                                </div>
                            </div>
                            <div className="p-grid">
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="passwordInput">Senha:</label>
                                </div>
                                <div className="p-col-6 p-md-6" required>
                                    <Password id="passwordInput" onChange={event => this.password = event.target.value} required/>
                                </div>
                            </div>
                            <Button label="Registrar" />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    
    registrar(event) {
        event.preventDefault();

        const method = 'POST';
        const body = JSON.stringify({ username: this.username, nome: this.nome, email: this.email, password: this.password});
        const headers = new Headers({'Content-type': 'application/json'});

        fetch('http://localhost:8080/user/public', { method, body, headers })
        .then(res => { if (res.status === 303) this.showMessage('Usuário já existe!', 'error'); 
                        else if (res.status === 201) this.showMessage('Usuário criado com sucesso!', 'success');})
        .then(console.log);
    }

    showMessage(msg, severity) {
        let summary = 'SUCESSO:';
        if (severity === 'error')
            summary = 'ERRO:'
        this.messages.show({severity: severity, summary: summary, detail: msg});
    }
}

export default withRouter(Registro);