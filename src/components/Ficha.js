import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { Spinner } from 'primereact/spinner';
import Pontos from './Pontos';
import { Button } from 'primereact/button';
import {Messages} from 'primereact/messages';


export default class Ficha extends Component {
    constructor(props) {
        super(props);
        this.prioridades = [{ label: 'Primária', value: 1 }, { label: 'Secundária', value: 2 }, { label: 'Terciária', value: 3 }];
        this.state = {
            show: false,
            pontuacaoFicha: {
                atributos: {
                    primaria: 10,
                    secundaria: 8,
                    terciaria: 6,
                    custoPontoBonus: 5
                },
                habilidades: {
                    primaria: 13,
                    secundaria: 9,
                    terciaria: 5,
                    custoPontoBonus: 2
                },
                vantagens: {
                    antecedentes: { pontos: 5, custoPontoBonus: 1 },
                    disciplinas: { pontos: 3, custoPontoBonus: 7 },
                    virtudes: { pontos: 8, custoPontoBonus: 2 }
                },
                outros: {
                    humanidade: { pontos: 0, custoPontoBonus: 1 },
                    forcaDeVontade: { pontos: 0, custoPontoBonus: 1 },
                    qualidadesDefeitos: { pontos: 0, custoPontoBonus: 1 }
                },
                pontosBonus: 0
            },
            mesaSelecionada: null,
            mesas: [],
            antecedentes: [],
            disciplinas: [],
            qualidadesDefeitos: [],
            clas: [],
            arquetipos: [],
            ficha: {
                conceito: {
                    nome: '', 
                    jogador: '',
                    cronica: '',
                    natureza: '',
                    comportamento: '',
                    cla: '',
                    geracao: 13,
                    refugio: '',
                    conceito: '',
                    mesa: ''
                },
                atributos: {
                    fisicos: {
                        forca: { normal: 1, bonus: 0 },
                        destreza: { normal: 1, bonus: 0 },
                        vigor: { normal: 1, bonus: 0 },
                        prioridade: 1
                    },
                    sociais: {
                        carisma: { normal: 1, bonus: 0 },
                        manipulacao: { normal: 1, bonus: 0 },
                        aparencia: { normal: 1, bonus: 0 },
                        prioridade: 2
                    },
                    mentais: {
                        percepcao: { normal: 1, bonus: 0 },
                        inteligencia: { normal: 1, bonus: 0 },
                        raciocinio: { normal: 1, bonus: 0 },
                        prioridade: 3
                    }
                },
                habilidades: {
                    talentos: {
                        prontidao: { normal: 0, bonus: 0 },
                        esportes: { normal: 0, bonus: 0 },
                        briga: { normal: 0, bonus: 0 },
                        esquiva: { normal: 0, bonus: 0 },
                        empatia: { normal: 0, bonus: 0 },
                        expressao: { normal: 0, bonus: 0 },
                        intimidacao: { normal: 0, bonus: 0 },
                        lideranca: { normal: 0, bonus: 0 },
                        manha: { normal: 0, bonus: 0 },
                        labia: { normal: 0, bonus: 0 },
                        prioridade: 1
                    },
                    pericias: {
                        empatiaComAnimais: { normal: 0, bonus: 0 },
                        oficios: { normal: 0, bonus: 0 },
                        conducao: { normal: 0, bonus: 0 },
                        etiqueta: { normal: 0, bonus: 0 },
                        armasDeFogo: { normal: 0, bonus: 0 },
                        armasBrancas: { normal: 0, bonus: 0 },
                        performance: { normal: 0, bonus: 0 },
                        seguranca: { normal: 0, bonus: 0 },
                        furtividade: { normal: 0, bonus: 0 },
                        sobrevivencia: { normal: 0, bonus: 0 },
                        prioridade: 2
                    },
                    conhecimentos: {
                        academicos: { normal: 0, bonus: 0 },
                        computador: { normal: 0, bonus: 0 },
                        financas: { normal: 0, bonus: 0 },
                        investigacao: { normal: 0, bonus: 0 },
                        direito: { normal: 0, bonus: 0 },
                        linguistica: { normal: 0, bonus: 0 },
                        medicina: { normal: 0, bonus: 0 },
                        ocultismo: { normal: 0, bonus: 0 },
                        politica: { normal: 0, bonus: 0 },
                        ciencia: { normal: 0, bonus: 0 },
                        prioridade: 3
                    }
                },
                outros: {
                    forcaDeVontade: { pontos: {normal: 1, bonus: 0} },
                    humanidade: { nome: '', pontos: {normal: 2, bonus: 0} },
                    qualidadesDefeitos: []
                },
                vantagens: {
                    antecedentes: [],
                    disciplinas: [],
                    virtudes: {
                        consciencia: { normal: 1, bonus: 0 },
                        autocontrole: { normal: 1, bonus: 0 },
                        coragem: { normal: 1, bonus: 0 },
                    }
                },
                preludio: {
                    texto: ''
                },
                usuario: ''
            }
        };
    }

    updatePrioridade(event, categoria, subcategoria) {
        const ficha = this.state.ficha;
        const categoriaPrioridade = ficha[categoria];
        Object.keys(categoriaPrioridade).forEach(categoriaKey => {
            if (this._isPrioridadeJaSelecionada(categoriaKey, subcategoria, categoriaPrioridade[categoriaKey].prioridade, event.target.value)) {
                this._limparPontos(categoriaPrioridade[categoriaKey], categoria);
                categoriaPrioridade[categoriaKey].prioridade = categoriaPrioridade[subcategoria].prioridade;
            }
        })
        categoriaPrioridade[subcategoria].prioridade = parseInt(event.value);
        this._limparPontos(categoriaPrioridade[subcategoria], categoria);
        this.setState({ ficha });
    }

    _limparPontos(secaoFicha, categoriaKey) {
        Object.keys(secaoFicha).forEach(campo => {
            let ponto = secaoFicha[campo];
            if (ponto.hasOwnProperty('normal')) {
                ponto.normal = this._getValorMinimoCategoria(categoriaKey);
                ponto.bonus = 0;
            }
        });
    }

    _getValorMinimoCategoria(categoria) {
        if (categoria === 'atributos') return 1;
        else return 0;
    }

    _isPrioridadeJaSelecionada(categoriaSelecionada, categoriaChecada, prioridadeSelecionada, prioridadeChecada) {
        return (categoriaSelecionada !== categoriaChecada && prioridadeSelecionada === prioridadeChecada);
    }

    getPontosPrioridade(propriedade, subcategoria, prioridade) {
        if (prioridade === 1) return this.state.pontuacaoFicha[propriedade].primaria;
        else if (prioridade === 2) return this.state.pontuacaoFicha[propriedade].secundaria;
        else if (prioridade === 3) return this.state.pontuacaoFicha[propriedade].terciaria;
        else return this.state.pontuacaoFicha[propriedade][subcategoria].pontos;
    }

    getPontosRestantesSecaoFicha(categoria, subcategoria, prioridade) {
        const pontosPrioridade = this.getPontosPrioridade(categoria, subcategoria, prioridade);
        return ((pontosPrioridade === 0) ? 0 : (pontosPrioridade - this.getPontosNormaisGastosBySubcategoria(this.state.ficha[categoria][subcategoria])));
    }

    getPontosNormaisGastosBySubcategoria(camposFicha) {
        if (camposFicha instanceof Array) {
            return camposFicha.length === 0 ? 0 : camposFicha.map(ponto => ponto.normal)
                .reduce((total, pontuacao) => total + pontuacao);
        } else
            return Object.values(camposFicha)
                .filter(ponto => ponto.hasOwnProperty('normal') === true)
                .map(ponto => ponto.normal)
                .reduce((total, pontuacao) => total + pontuacao);
    }

    getPontosBonusGastosBySubcategoria(camposFicha) {
        if (camposFicha instanceof Array)
            return camposFicha.map(ponto => ponto.bonus)
                .reduce((total, pontuacao) => total + pontuacao);
        else
            return Object.values(camposFicha)
                .filter(ponto => ponto.hasOwnProperty('bonus') === true)
                .map(ponto => ponto.bonus)
                .reduce((total, pontuacao) => total + pontuacao);
    }

    getTotalPontosBonusRestantes() {
        return this.state.pontuacaoFicha.pontosBonus - this.getPontosBonusGastos();
    }

    getPontosBonusGastos() {
        const bonusAtributos = this.getPontosBonusAtributos();
        const bonusHabilidades = this.getPontosBonusHabilidades();
        const bonusVantagens = this.getPontosBonusVantagens();
        const bonusOutros = this.getPontosBonusOutros();
        return bonusAtributos + bonusHabilidades + bonusVantagens + bonusOutros;
    }

    getPontosBonusAtributos() {
        return Object.values(this.state.ficha.atributos).map(atributo => {
            if (atributo instanceof Object)
                return this.getPontosBonusGastosBySubcategoria(atributo);
            else
                return 0;
        }).reduce((total, pontuacao) => total + pontuacao) * this.state.pontuacaoFicha.atributos.custoPontoBonus;
    }

    getPontosBonusHabilidades() {
        return Object.values(this.state.ficha.habilidades).map(habilidade => {
            if (habilidade instanceof Object)
                return this.getPontosBonusGastosBySubcategoria(habilidade)
            else
                return 0;
        }).reduce((total, pontuacao) => total + pontuacao) * this.state.pontuacaoFicha.habilidades.custoPontoBonus;
    }

    getPontosBonusVantagens() {
        return Object.entries(this.state.ficha.vantagens).map(vantagem => {
            if (vantagem[1] instanceof Array && vantagem[1].length > 0)
                return this.getPontosBonusGastosBySubcategoria(vantagem[1]) * this.state.pontuacaoFicha.vantagens[vantagem[0]].custoPontoBonus;
            else if (!(vantagem[1] instanceof Array) && vantagem[1] instanceof Object)
                return this.getPontosBonusGastosBySubcategoria(vantagem[1]) * this.state.pontuacaoFicha.vantagens[vantagem[0]].custoPontoBonus;
            else
                return 0;
        }).reduce((total, pontuacao) => total + pontuacao);
    }

    getPontosBonusOutros() {
        return Object.entries(this.state.ficha.outros).map(outro => {
            if (outro[1] instanceof Array && outro[1].length > 0)
                return (outro[1].map(obj => obj.pontos).reduce((total, pontuacao) => total + pontuacao)) * this.state.pontuacaoFicha.outros[outro[0]].custoPontoBonus;
            else if (!(outro[1] instanceof Array) && outro[1] instanceof Object)
                return this.getPontosBonusGastosBySubcategoria(outro[1]) * this.state.pontuacaoFicha.outros[outro[0]].custoPontoBonus;
            else
                return 0;
        }).reduce((total, pontuacao) => total + pontuacao);
    }

    getTotalPontos(campoDaFicha) {
        return campoDaFicha.normal + campoDaFicha.bonus;
    }

    getTotalPontosHumanidade(campoDaFicha) {
        const ficha = this.state.ficha;
        const outros = ficha.outros;
        outros.humanidade.pontos.normal = this.getTotalPontos(ficha.vantagens.virtudes.consciencia) + this.getTotalPontos(ficha.vantagens.virtudes.autocontrole);
        return this.getTotalPontos(outros.humanidade.pontos);
    }

    getTotalPontosForcaDeVontade(campoDaFicha) {
        const ficha = this.state.ficha;
        const outros = ficha.outros;
        outros.forcaDeVontade.pontos.normal = this.getTotalPontos(ficha.vantagens.virtudes.coragem);
        return this.getTotalPontos(outros.forcaDeVontade.pontos);
    }

    adicionaPonto(categoria, subcategoria, campo, valor) {
        debugger;
        const prioridade = this.state.ficha[categoria][subcategoria].prioridade;
        const ficha = this.state.ficha;
        let custoPontoBonus = 0;
        
        if (this.state.pontuacaoFicha[categoria].custoPontoBonus > 0)
            custoPontoBonus = this.state.pontuacaoFicha[categoria].custoPontoBonus;
        else
            custoPontoBonus = this.state.pontuacaoFicha[categoria][subcategoria].custoPontoBonus;
            
        if (this.getPontosRestantesSecaoFicha(categoria, subcategoria, prioridade) > 0)
            ficha[categoria][subcategoria][campo].normal = valor;
        else if (this.getTotalPontosBonusRestantes() >= custoPontoBonus)
            ficha[categoria][subcategoria][campo].bonus = valor - ficha[categoria][subcategoria][campo].normal;

        this.setState({ ficha });
        console.log(ficha);
    }

    removePonto(categoria, subcategoria, campo, valor) {
        const prioridade = this.state.ficha[categoria][subcategoria].prioridade;
        const ficha = this.state.ficha;

        if (this.getPontosRestantesSecaoFicha(categoria, subcategoria, prioridade) === 0) {
            if (this.state.ficha[categoria][subcategoria][campo].bonus > 0)
                ficha[categoria][subcategoria][campo].bonus--;
            else {
                Object.keys(this.state.ficha[categoria][subcategoria]).some(campoPesquisado => {
                    let ponto = this.state.ficha[categoria][subcategoria][campoPesquisado];
                    if (ponto.hasOwnProperty('bonus') && ponto.bonus > 0) {
                        ponto.normal++;
                        ponto.bonus--;
                        return true;
                    }
                });
                ficha[categoria][subcategoria][campo].normal = valor;
            }
        } else {
            ficha[categoria][subcategoria][campo].normal = valor;
        }
        this.setState({ ficha });
        console.log(ficha);
    }

    adicionaVantagem(vantagem, valor) {
        if (this.state.ficha.vantagens[vantagem].some(vantagem => vantagem.nome === valor))
            return;
        const vantagens = this.state.ficha.vantagens;
        vantagens[vantagem] = vantagens[vantagem].concat([{ nome: valor, normal: 0, bonus: 0 }]);
        this.setState({ ...this.state.ficha, vantagens });
    }

    adicionaCampo(categoria, campo, valor) {
        if (categoria[campo].some(obj => obj.nome === valor.nome))
            return;
        if ((this.getTotalPontosBonusRestantes() - valor.pontos) >= 0) {
            categoria[campo] = categoria[campo].concat([{ nome: valor.nome, pontos: valor.pontos}]);
            this.setState({ ...this.state.ficha, categoria });
            console.log(this.state.ficha);
        }
    }

    removeCampo(categoria, campo, valor) {
        categoria[campo] = (categoria[campo].filter(obj => obj.nome !== valor.nome));
        this.setState({ ...this.state.ficha, categoria });
        console.log(this.state.ficha);
    }

    componentDidMount() {
        this.setState({ mesas: [{ label: 'Mesa 1', value: 1 }, { label: 'Mesa 2', value: 2 }] });

        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa('user:password'));

        fetch('https://vampiroamascaraservice.herokuapp.com/antecedente', { headers }).then(res => res.json())
        .then(json => json.map(obj => ({label: obj.nome, value: obj.nome}))).then(antecedentes =>  this.setState({antecedentes}));

        fetch('https://vampiroamascaraservice.herokuapp.com/disciplina', { headers }).then(res => res.json())
        .then(json => json.map(obj => ({label: obj.nome, value: obj.nome}))).then(disciplinas =>  this.setState({disciplinas}));

        fetch('https://vampiroamascaraservice.herokuapp.com/qualidadedefeito', { headers }).then(res => res.json())
        .then(json => json.map(obj => ({label: `${obj.nome} (${obj.pontos})`, value: obj}))).then(qualidadesDefeitos =>  this.setState({qualidadesDefeitos}));

        fetch('https://vampiroamascaraservice.herokuapp.com/cla', { headers }).then(res => res.json())
        .then(json => json.map(obj => ({label: obj.nome, value: obj.nome}))).then(clas =>  this.setState({clas}));

        fetch('https://vampiroamascaraservice.herokuapp.com/arquetipo', { headers }).then(res => res.json())
        .then(json => json.map(obj => ({label: obj.nome, value: obj.nome}))).then(arquetipos =>  this.setState({arquetipos}));

        if (this.props.location.state != null) {
            const pontuacaoFicha = this.state.pontuacaoFicha;
            this.setState({ pontuacaoFicha: { ...pontuacaoFicha, pontosBonus: this.props.location.state.pontos } });
        } else
            this.props.history.push('/home');
    }

    updateProperty(property, subproperty, value) {
        debugger;
        let ficha = this.state.ficha;
        ficha[property][subproperty] = value;
        this.setState({ficha});
        console.log(this.state.ficha);
    }

    enviarFicha(event) {
        event.preventDefault();

        if (!this.validarFicha())
            this.messages.show({severity: 'error', summary: 'ERRO', detail: 'Ficha inválida! Preencha as informações solicitadas.'});
        else {
            console.log(this.state.ficha);
        }
        window.scrollTo(0, 0);
    }

    validarFicha() {
        debugger;
        return this.isPontosGastos() & !this.isCamposNaoPreenchidos();
    }

    isCamposNaoPreenchidos() {
        return Object.values(this.state.ficha.conceito).some(campo => !campo) || !this.state.ficha.outros.humanidade.nome;
    }

    isPontosGastos() {
        return (this.getTotalPontosBonusRestantes() + this.getTotalPontosNormaisRestantes()) === 0;
    }

    getTotalPontosNormaisRestantes() {
        return this.getPontosRestantesSecaoFicha('atributos', 'fisicos', this.state.ficha.atributos.fisicos.prioridade) + 
        this.getPontosRestantesSecaoFicha('atributos', 'sociais', this.state.ficha.atributos.sociais.prioridade) +
        this.getPontosRestantesSecaoFicha('atributos', 'mentais', this.state.ficha.atributos.mentais.prioridade) +
        this.getPontosRestantesSecaoFicha('habilidades', 'talentos', this.state.ficha.habilidades.talentos.prioridade) +
        this.getPontosRestantesSecaoFicha('habilidades', 'pericias', this.state.ficha.habilidades.pericias.prioridade) +
        this.getPontosRestantesSecaoFicha('habilidades', 'conhecimentos', this.state.ficha.habilidades.conhecimentos.prioridade) +
        this.getPontosRestantesSecaoFicha('vantagens', 'antecedentes') + this.getPontosRestantesSecaoFicha('vantagens', 'disciplinas') +
        this.getPontosRestantesSecaoFicha('vantagens', 'virtudes');
    }

    render() {
        return (
            <form>
            <Messages id="mensagens" ref={(el) => this.messages = el}></Messages>
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Dados Gerais</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="nomeInput">Nome:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="nomeInput" value={this.state.ficha.conceito.nome} onChange={event => this.updateProperty('conceito', 'nome', event.target.value)}/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="jogadorInput">Jogador:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="jogadorInput" value={this.state.ficha.conceito.jogador} onChange={event => this.updateProperty('conceito', 'jogador', event.target.value)}/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="cronicaInput">Crônica:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="cronicaInput" value={this.state.ficha.conceito.cronica} onChange={event => this.updateProperty('conceito', 'cronica', event.target.value)}/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="naturezaInput">Natureza:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Dropdown id="naturezaInput" placeholder="Selecione..." options={this.state.arquetipos} 
                                value={this.state.ficha.conceito.natureza.nome} onChange={event => this.updateProperty('conceito', 'natureza', {nome: event.value})} autoWidth={false} />
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="comportamentoInput">Comportamento:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Dropdown id="comportamentoInput" placeholder="Selecione..." options={this.state.arquetipos} 
                                value={this.state.ficha.conceito.comportamento.nome} onChange={event => this.updateProperty('conceito', 'comportamento', {nome: event.value})} autoWidth={false} />
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="claInput">Clã:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Dropdown id="claInput" placeholder="Selecione..." options={this.state.clas} value={this.state.ficha.conceito.cla.nome} onChange={event => this.updateProperty('conceito', 'cla', {nome: event.value})} autoWidth={false} />
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="geracaoInput">Geração:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="geracaoInput" readOnly={true} value={this.state.ficha.conceito.geracao}/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="refugioInput">Refúgio:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="refugioInput" value={this.state.ficha.conceito.refugio} onChange={event => this.updateProperty('conceito', 'refugio', event.target.value)}/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="conceitoInput">Conceito:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="conceitoInput" value={this.state.ficha.conceito.conceito} onChange={event => this.updateProperty('conceito', 'conceito', event.target.value)}/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="mesaInput">Mesa:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Dropdown id="mesaInput" options={this.state.mesas} placeholder="Selecione..." value={this.state.ficha.conceito.mesa} onChange={event => this.updateProperty('conceito', 'mesa', event.value)} autoWidth={false} />
                            </div>
                        </div>
                    </div>
                    <div className="card card-w-title">
                        <h1>Atributos</h1>
                        <div className="card card-w-title">
                            <h1>Físicos</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.atributos.fisicos.prioridade} onChange={event => this.updatePrioridade(event, 'atributos', 'fisicos')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('atributos', 'fisicos', this.state.ficha.atributos.fisicos.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="forcaInput">Força:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="forcaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.forca)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.fisicos.forca)) this.adicionaPonto('atributos', 'fisicos', 'forca', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.fisicos.forca)) this.removePonto('atributos', 'fisicos', 'forca', event.value); }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="destrezaInput">Destreza:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="destrezaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.destreza)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.fisicos.destreza)) this.adicionaPonto('atributos', 'fisicos', 'destreza', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.fisicos.destreza)) this.removePonto('atributos', 'fisicos', 'destreza', event.value); }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="vigorInput">Vigor:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="vigorInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.vigor)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.fisicos.vigor)) this.adicionaPonto('atributos', 'fisicos', 'vigor', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.fisicos.vigor)) this.removePonto('atributos', 'fisicos', 'vigor', event.value); }} />
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Sociais</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.atributos.sociais.prioridade} onChange={event => this.updatePrioridade(event, 'atributos', 'sociais')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('atributos', 'sociais', this.state.ficha.atributos.sociais.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="carismaInput">Carisma:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="carismaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.sociais.carisma)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.sociais.carisma)) this.adicionaPonto('atributos', 'sociais', 'carisma', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.sociais.carisma)) this.removePonto('atributos', 'sociais', 'carisma', event.value); }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="manipulacaoInput">Manipulação:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="manipulacaoInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.sociais.manipulacao)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.sociais.manipulacao)) this.adicionaPonto('atributos', 'sociais', 'manipulacao', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.sociais.manipulacao)) this.removePonto('atributos', 'sociais', 'manipulacao', event.value); }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="aparenciaInput">Aparência:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="aparenciaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.sociais.aparencia)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.sociais.aparencia)) this.adicionaPonto('atributos', 'sociais', 'aparencia', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.sociais.aparencia)) this.removePonto('atributos', 'sociais', 'aparencia', event.value); }} />
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Mentais</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.atributos.mentais.prioridade} onChange={event => this.updatePrioridade(event, 'atributos', 'mentais')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('atributos', 'mentais', this.state.ficha.atributos.mentais.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="percepcaoInput">Percepção:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="percepcaoInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.mentais.percepcao)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.mentais.percepcao)) this.adicionaPonto('atributos', 'mentais', 'percepcao', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.mentais.percepcao)) this.removePonto('atributos', 'mentais', 'percepcao', event.value); }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="inteligenciaInput">Inteligência:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="inteligenciaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.mentais.inteligencia)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.mentais.inteligencia)) this.adicionaPonto('atributos', 'mentais', 'inteligencia', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.mentais.inteligencia)) this.removePonto('atributos', 'mentais', 'inteligencia', event.value); }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="raciocinioInput">Raciocínio:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="raciocinioInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.mentais.raciocinio)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.mentais.raciocinio)) this.adicionaPonto('atributos', 'mentais', 'raciocinio', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.mentais.raciocinio)) this.removePonto('atributos', 'mentais', 'raciocinio', event.value); }} />
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Habilidades</h1>
                        <div className="card card-w-title">
                            <h1>Talentos</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.habilidades.talentos.prioridade} onChange={event => this.updatePrioridade(event, 'habilidades', 'talentos')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('habilidades', 'talentos', this.state.ficha.habilidades.talentos.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="prontidaoInput">Prontidão:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="prontidaoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.prontidao)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.prontidao)) this.adicionaPonto('habilidades', 'talentos', 'prontidao', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.prontidao)) this.removePonto('habilidades', 'talentos', 'prontidao', event.value); }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="esportesInput">Esportes:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="esportesInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.esportes)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.esportes))
                                                    this.adicionaPonto('habilidades', 'talentos', 'esportes', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.esportes))
                                                    this.removePonto('habilidades', 'talentos', 'esportes', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="brigaInput">Briga:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="brigaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.briga)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.briga))
                                                    this.adicionaPonto('habilidades', 'talentos', 'briga', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.briga))
                                                    this.removePonto('habilidades', 'talentos', 'briga', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="esquivaInput">Esquiva:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="esquivaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.esquiva)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.esquiva))
                                                    this.adicionaPonto('habilidades', 'talentos', 'esquiva', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.esquiva))
                                                    this.removePonto('habilidades', 'talentos', 'esquiva', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="empatiaInput">Empatia:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="empatiaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.empatia)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.empatia))
                                                    this.adicionaPonto('habilidades', 'talentos', 'empatia', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.empatia))
                                                    this.removePonto('habilidades', 'talentos', 'empatia', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="expressaoInput">Expressão:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="expressaoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.expressao)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.expressao))
                                                    this.adicionaPonto('habilidades', 'talentos', 'expressao', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.expressao))
                                                    this.removePonto('habilidades', 'talentos', 'expressao', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="intimidacaoInput">Intimidação:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="intimidacaoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.intimidacao)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.intimidacao))
                                                    this.adicionaPonto('habilidades', 'talentos', 'intimidacao', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.intimidacao))
                                                    this.removePonto('habilidades', 'talentos', 'intimidacao', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="liderancaInput">Liderança:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="liderancaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.lideranca)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.lideranca))
                                                    this.adicionaPonto('habilidades', 'talentos', 'lideranca', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.lideranca))
                                                    this.removePonto('habilidades', 'talentos', 'lideranca', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="manhaInput">Manha:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="manhaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.manha)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.manha))
                                                    this.adicionaPonto('habilidades', 'talentos', 'manha', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.manha))
                                                    this.removePonto('habilidades', 'talentos', 'manha', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="labiaInput">Lábia:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="labiaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.labia)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.labia))
                                                    this.adicionaPonto('habilidades', 'talentos', 'labia', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.labia))
                                                    this.removePonto('habilidades', 'talentos', 'labia', event.value);
                                            }} />
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Perícias</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.habilidades.pericias.prioridade} onChange={event => this.updatePrioridade(event, 'habilidades', 'pericias')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('habilidades', 'pericias', this.state.ficha.habilidades.pericias.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="empatiaComAnimaisInput">Empatia c/ Animais:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="empatiaComAnimaisInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.empatiaComAnimais)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.empatiaComAnimais))
                                                    this.adicionaPonto('habilidades', 'pericias', 'empatiaComAnimais', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.empatiaComAnimais))
                                                    this.removePonto('habilidades', 'pericias', 'empatiaComAnimais', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="oficiosInput">Ofícios:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="oficiosInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.oficios)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.oficios))
                                                    this.adicionaPonto('habilidades', 'pericias', 'oficios', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.oficios))
                                                    this.removePonto('habilidades', 'pericias', 'oficios', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="conducaoInput">Condução:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="conducaoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.conducao)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.conducao))
                                                    this.adicionaPonto('habilidades', 'pericias', 'conducao', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.conducao))
                                                    this.removePonto('habilidades', 'pericias', 'conducao', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="etiquetaInput">Etiqueta:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="etiquetaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.etiqueta)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.etiqueta))
                                                    this.adicionaPonto('habilidades', 'pericias', 'etiqueta', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.etiqueta))
                                                    this.removePonto('habilidades', 'pericias', 'etiqueta', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="armasDeFogoInput">Armas de Fogo:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="armasDeFogoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.armasDeFogo)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.armasDeFogo))
                                                    this.adicionaPonto('habilidades', 'pericias', 'armasDeFogo', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.armasDeFogo))
                                                    this.removePonto('habilidades', 'pericias', 'armasDeFogo', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="armasBrancasInput">Armas Brancas:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="armasBrancasInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.armasBrancas)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.armasBrancas))
                                                    this.adicionaPonto('habilidades', 'pericias', 'armasBrancas', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.armasBrancas))
                                                    this.removePonto('habilidades', 'pericias', 'armasBrancas', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="performanceInput">Performance:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="performanceInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.performance)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.performance))
                                                    this.adicionaPonto('habilidades', 'pericias', 'performance', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.performance))
                                                    this.removePonto('habilidades', 'pericias', 'performance', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="segurancaInput">Segurança:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="segurancaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.seguranca)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.seguranca))
                                                    this.adicionaPonto('habilidades', 'pericias', 'seguranca', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.seguranca))
                                                    this.removePonto('habilidades', 'pericias', 'seguranca', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="furtividadeInput">Furtividade:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="furtividadeInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.furtividade)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.furtividade))
                                                    this.adicionaPonto('habilidades', 'pericias', 'furtividade', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.furtividade))
                                                    this.removePonto('habilidades', 'pericias', 'furtividade', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="sobrevivenciaInput">Sobrevivência:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="sobrevivenciaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.sobrevivencia)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.sobrevivencia))
                                                    this.adicionaPonto('habilidades', 'pericias', 'sobrevivencia', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.sobrevivencia))
                                                    this.removePonto('habilidades', 'pericias', 'sobrevivencia', event.value);
                                            }} />
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Conhecimentos</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.habilidades.conhecimentos.prioridade} onChange={event => this.updatePrioridade(event, 'habilidades', 'conhecimentos')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('habilidades', 'conhecimentos', this.state.ficha.habilidades.conhecimentos.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="academicosInput">Acadêmicos:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="academicosInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.academicos)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.academicos))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'academicos', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.academicos))
                                                    this.removePonto('habilidades', 'conhecimentos', 'academicos', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="computadorInput">Computador:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="computadorInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.computador)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.computador))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'computador', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.computador))
                                                    this.removePonto('habilidades', 'conhecimentos', 'computador', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="financasInput">Finanças:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="financasInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.financas)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.financas))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'financas', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.financas))
                                                    this.removePonto('habilidades', 'conhecimentos', 'financas', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="investigacaoInput">Investigação:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="investigacaoInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.investigacao)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.investigacao))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'investigacao', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.investigacao))
                                                    this.removePonto('habilidades', 'conhecimentos', 'investigacao', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="direitoInput">Direito:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="direitoInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.direito)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.direito))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'direito', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.direito))
                                                    this.removePonto('habilidades', 'conhecimentos', 'direito', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="linguisticaInput">Linguística:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="linguisticaInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.linguistica)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.linguistica))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'linguistica', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.linguistica))
                                                    this.removePonto('habilidades', 'conhecimentos', 'linguistica', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="medicinaInput">Medicina:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="medicinaInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.medicina)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.medicina))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'medicina', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.medicina))
                                                    this.removePonto('habilidades', 'conhecimentos', 'medicina', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="ocultismoInput">Ocultismo:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="ocultismoInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ocultismo)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ocultismo))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'ocultismo', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ocultismo))
                                                    this.removePonto('habilidades', 'conhecimentos', 'ocultismo', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="politicaInput">Política:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="politicaInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.politica)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.politica))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'politica', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.politica))
                                                    this.removePonto('habilidades', 'conhecimentos', 'politica', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="cienciaInput">Ciência:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="cienciaInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ciencia)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ciencia))
                                                    this.adicionaPonto('habilidades', 'conhecimentos', 'ciencia', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ciencia))
                                                    this.removePonto('habilidades', 'conhecimentos', 'ciencia', event.value);
                                            }} />
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Vantagens</h1>
                        <div className="card card-w-title">
                            <h1>Antecedentes</h1>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('vantagens', 'antecedentes')}</span>
                            <div className="p-inputgroup">
                                <Dropdown value={this.state.antecedente} options={this.state.antecedentes} onChange={event => this.setState({ antecedente: event.value })}
                                    style={{ width: '150px' }} placeholder="Selecione..." />
                                <Button icon="pi pi-plus" label="Add" onClick={event => this.adicionaVantagem('antecedentes', this.state.antecedente)} />
                            </div>
                            <br />
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    {
                                        this.state.ficha.vantagens.antecedentes.map((antecedente, index) => {
                                            return <div key={antecedente.nome}>
                                                <div className="p-col-6 p-md-2">
                                                    <label htmlFor={antecedente.nome}>{antecedente.nome}:</label>
                                                </div>
                                                <div className="p-col-6 p-md-4">
                                                    <Spinner id={antecedente.nome} readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.vantagens.antecedentes[index])}
                                                        onChange={event => {
                                                            if (event.value > this.getTotalPontos(this.state.ficha.vantagens.antecedentes[index]))
                                                                this.adicionaPonto('vantagens', 'antecedentes', index, event.value);
                                                            else if (event.value < this.getTotalPontos(this.state.ficha.vantagens.antecedentes[index]))
                                                                this.removePonto('vantagens', 'antecedentes', index, event.value);
                                                        }} />
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Disciplinas</h1>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('vantagens', 'disciplinas')}</span>
                            <div className="p-inputgroup">
                                <Dropdown value={this.state.disciplina} options={this.state.disciplinas} onChange={event => this.setState({ disciplina: event.value })}
                                    style={{ width: '150px' }} placeholder="Selecione..." />
                                <Button icon="pi pi-plus" label="Add" onClick={event => this.adicionaVantagem('disciplinas', this.state.disciplina)} />
                            </div>
                            <br />
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    {
                                        this.state.ficha.vantagens.disciplinas.map((disciplina, index) => {
                                            return <div key={disciplina.nome}>
                                                <div className="p-col-6 p-md-2">
                                                    <label htmlFor={disciplina.nome}>{disciplina.nome}:</label>
                                                </div>
                                                <div className="p-col-6 p-md-4">
                                                    <Spinner id={disciplina.nome} readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.vantagens.disciplinas[index])}
                                                        onChange={event => {
                                                            if (event.value > this.getTotalPontos(this.state.ficha.vantagens.disciplinas[index]))
                                                                this.adicionaPonto('vantagens', 'disciplinas', index, event.value);
                                                            else if (event.value < this.getTotalPontos(this.state.ficha.vantagens.disciplinas[index]))
                                                                this.removePonto('vantagens', 'disciplinas', index, event.value);
                                                        }} />
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Virtudes</h1>
                            <span className="w3-badge w3-green">{this.getPontosRestantesSecaoFicha('vantagens', 'virtudes')}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="forcaInput">Consciência:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} min={1} value={this.getTotalPontos(this.state.ficha.vantagens.virtudes.consciencia)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.vantagens.virtudes.consciencia))
                                                    this.adicionaPonto('vantagens', 'virtudes', 'consciencia', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.vantagens.virtudes.consciencia))
                                                    this.removePonto('vantagens', 'virtudes', 'consciencia', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="destrezaInput">Autocontrole:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} min={1} value={this.getTotalPontos(this.state.ficha.vantagens.virtudes.autocontrole)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.vantagens.virtudes.autocontrole))
                                                    this.adicionaPonto('vantagens', 'virtudes', 'autocontrole', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.vantagens.virtudes.autocontrole))
                                                    this.removePonto('vantagens', 'virtudes', 'autocontrole', event.value);
                                            }} />
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Coragem:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} min={1} value={this.getTotalPontos(this.state.ficha.vantagens.virtudes.coragem)}
                                            onChange={event => {
                                                if (event.value > this.getTotalPontos(this.state.ficha.vantagens.virtudes.coragem))
                                                    this.adicionaPonto('vantagens', 'virtudes', 'coragem', event.value);
                                                else if (event.value < this.getTotalPontos(this.state.ficha.vantagens.virtudes.coragem))
                                                    this.removePonto('vantagens', 'virtudes', 'coragem', event.value);
                                            }} />
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Qualidades e Defeitos</h1>
                        <div className="p-inputgroup">
                            <Dropdown value={this.state.qualidadeDefeito} options={this.state.qualidadesDefeitos} onChange={event => this.setState({ qualidadeDefeito: event.value })}
                                style={{ width: '150px' }} placeholder="Selecione..." />
                            <Button icon="pi pi-plus" label="Add" onClick={event => this.adicionaCampo(this.state.ficha.outros, 'qualidadesDefeitos', this.state.qualidadeDefeito)} />
                        </div>
                        <br />
                        <Fieldset toggleable={true}>
                            {
                                this.state.ficha.outros.qualidadesDefeitos.map((qualidadeDefeito, index) => {
                                    return <div key={qualidadeDefeito.nome}>
                                        <div className="p-grid">
                                            <div className="p-col-12 p-md-12">
                                                <Card>
                                                    <label htmlFor={qualidadeDefeito.nome}>{`${qualidadeDefeito.nome} (${qualidadeDefeito.pontos})`}</label>
                                                    <span><Button icon="pi pi-times" className="p-button-secondary" style={{float: 'right'}} onClick={event => this.removeCampo(this.state.ficha.outros, 'qualidadesDefeitos', qualidadeDefeito)}/></span>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </Fieldset>
                    </div>
                    <div className="card card-w-title">
                        <h1>Humanidade/Trilha</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="humanidadeNomeInput">Nome:</label>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText id="humanidadeNomeInput" value={this.state.ficha.outros.humanidade.nome} onChange={event => this.updateProperty('outros', 'humanidade', {nome: event.target.value, pontos: this.state.ficha.outros.humanidade.pontos})}/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="humanidadeInput">Pontos:</label>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <Spinner id="humanidadeInput" readonly={true} min={2} value={this.getTotalPontosHumanidade(this.state.ficha.outros.humanidade.pontos)}
                                    onChange={event => {
                                        if (event.value > this.getTotalPontos(this.state.ficha.outros.humanidade.pontos))
                                            this.adicionaPonto('outros', 'humanidade', 'pontos', event.value);
                                        else if (event.value < this.getTotalPontos(this.state.ficha.outros.humanidade.pontos))
                                            this.removePonto('outros', 'humanidade', 'pontos', event.value);
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="card card-w-title">
                        <h1>Força de Vontade</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="forcaDeVontadeInput">Pontos:</label>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <Spinner id="forcaDeVontadeInput" readonly={true} min={1} value={this.getTotalPontosForcaDeVontade(this.state.ficha.outros.forcaDeVontade.pontos)}
                                    onChange={event => {
                                        if (event.value > this.getTotalPontos(this.state.ficha.outros.forcaDeVontade.pontos))
                                            this.adicionaPonto('outros', 'forcaDeVontade', 'pontos', event.value);
                                        else if (event.value < this.getTotalPontos(this.state.ficha.outros.forcaDeVontade.pontos))
                                            this.removePonto('outros', 'forcaDeVontade', 'pontos', event.value);
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="card card-w-title">
                        <h1>Prelúdio</h1>
                        <Editor style={{ height: '320px' }} />
                    </div>
                    {(this.state.show) &&
                        <div className="card card-w-title">
                        <h1>Vitalidade</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1" />
                                <label htmlFor="cb1" className="p-checkbox-label">Escoriado</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1" />
                                <label htmlFor="cb1" className="p-checkbox-label">Machucado (-1)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1" />
                                <label htmlFor="cb1" className="p-checkbox-label">Ferido (-1)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1" />
                                <label htmlFor="cb1" className="p-checkbox-label">Ferido Gravemente (-2)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1" />
                                <label htmlFor="cb1" className="p-checkbox-label">Espancado (-2)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1" />
                                <label htmlFor="cb1" className="p-checkbox-label">Aleijado (-5)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1" />
                                <label htmlFor="cb1" className="p-checkbox-label">Incapacitado</label>
                            </div>
                        </div>
                        </div>
                    }
                </div>
                <Button label="Enviar Ficha" onClick={event => this.enviarFicha(event)}/>
                <Pontos pontos={this.getTotalPontosBonusRestantes()} />
            </div>
            </form>
        );
    }
}