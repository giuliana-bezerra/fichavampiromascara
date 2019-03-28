import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { withRouter } from 'react-router-dom';

class Logon extends Component {
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
                                <InputText id="loginInput" required/>
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
        
        console.log('s');
    }
}

export default withRouter(Logon);