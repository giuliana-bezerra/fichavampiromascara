import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { withRouter } from 'react-router-dom';

class Logon extends Component {
    constructor() {
        super();
        this.login = '';
        this.senha = '';
    }

    render() {
        return (
            <form onSubmit={event => this.autenticar(event)}>
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Autentique-se</h1>
                        <div className="p-grid">
                            <div className="p-col-6 p-md-2">
                                <label htmlFor="loginInput">Login:</label>
                            </div>
                            <div className="p-col-6 p-md-6">
                                <InputText id="loginInput" onChange={event => this.login = event.target.value} required/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6 p-md-2">
                                <label htmlFor="passwordInput">Senha:</label>
                            </div>
                            <div className="p-col-6 p-md-6">
                                <Password id="passwordInput" onChange={event => this.senha = event.target.value} required/>
                            </div>
                        </div>
                        <button className="p-link link" onClick={e => this.props.history.push('/registro')}>
                            Ainda não possui conta? Faça o seu cadastro!
                        </button>
                        <Button label="Entrar"/>
                    </div>
                </div>
            </div>
            </form>
        );
    }

    autenticar(event) {
        event.preventDefault();
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa('testjwtclientid:XY7kmzoNzl100'));
        // Recuperar e salvar o token no local storage:
        fetch('http://localhost:8080/oauth/token',
        { headers, body: `grant_type=password&username=${this.login}&password=${this.senha}`, method: 'POST' })
        .then(res => { if (res.ok) return res; else throw res})
        .then(token => localStorage.setItem('X-AUTH-TOKEN', token.json()));
    }
}

export default withRouter(Logon);