import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import {Checkbox} from 'primereact/checkbox';
import { PontoDataTableCrud } from './PontoDataTableCrud';
import {Editor} from 'primereact/editor';
import {Dropdown} from 'primereact/dropdown';
import {Spinner} from 'primereact/spinner';
import Pontos from './Pontos';


export default class Ficha extends Component {
    constructor(props) {
        super(props);
        this.prioridades = [{label: 'Primária', value: 1}, {label: 'Secundária', value: 2}, {label: 'Terciária', value: 3}];
        this.state = {
            pontuacaoFicha: {
                atributos: {
                    primaria: 10,
                    secundaria: 8,
                    terciaria: 6
                },
                habilidades: {
                    primaria: 13,
                    secundaria: 9,
                    terciaria: 5
                },
                vantagens: {
                    antecedentes: 5,
                    disciplinas: 3,
                    virtudes: 8
                },
                pontosBonus: 0
            },
            mesaSelecionada: null, 
            mesas: [],
            ficha: {
                conceito: '',
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
                    },
                    custoPontoBonus: 5
                },
                habilidades: {
                    talentos: {
                        prontidao: {normal: 0, bonus: 0},
                        esportes: {normal: 0, bonus: 0},
                        briga: {normal: 0, bonus: 0},
                        esquiva: {normal: 0, bonus: 0},
                        empatia: {normal: 0, bonus: 0},
                        expressao: {normal: 0, bonus: 0},
                        intimidacao: {normal: 0, bonus: 0},
                        lideranca: {normal: 0, bonus: 0},
                        manha: {normal: 0, bonus: 0},
                        labia: {normal: 0, bonus: 0},
                        prioridade: 1
                    },
                    pericias: {
                        empatiaComAnimais: {normal: 0, bonus: 0},
                        oficios: {normal: 0, bonus: 0},
                        conducao: {normal: 0, bonus: 0},
                        etiqueta: {normal: 0, bonus: 0},
                        armasDeFogo: {normal: 0, bonus: 0},
                        armasBrancas: {normal: 0, bonus: 0},
                        performance: {normal: 0, bonus: 0},
                        seguranca: {normal: 0, bonus: 0},
                        furtividade: {normal: 0, bonus: 0},
                        sobrevivencia: {normal: 0, bonus: 0},
                        prioridade: 2
                    },
                    conhecimentos: {
                        academicos: {normal: 0, bonus: 0},
                        computador: {normal: 0, bonus: 0},
                        financas: {normal: 0, bonus: 0},
                        investigacao: {normal: 0, bonus: 0},
                        direito: {normal: 0, bonus: 0},
                        linguistica: {normal: 0, bonus: 0},
                        medicina: {normal: 0, bonus: 0},
                        ocultismo: {normal: 0, bonus: 0},
                        politica: {normal: 0, bonus: 0},
                        ciencia: {normal: 0, bonus: 0},
                        prioridade: 3
                    },
                    custoPontoBonus: 2
                },
                outros: {
                    forcaDeVontade: {normal: 0, bonus: 0},
                    humanidade: {normal: 0, bonus: 0},
                    qualidadesDefeitos: []
                },
                vantagens: {
                    antecedentes: [],
                    disciplinas: [],
                    virtudes: {
                        consciencia: {normal: 1, bonus: 0},
                        autocontrole: {normal: 1, bonus: 0},
                        coragem: {normal: 1, bonus: 0},
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
        this.setState({ficha});
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

    getPontosPrioridade(propriedade, prioridade) {
        if (prioridade === 1) return this.state.pontuacaoFicha[propriedade].primaria;
        else if (prioridade === 2) return this.state.pontuacaoFicha[propriedade].secundaria;
        else return this.state.pontuacaoFicha[propriedade].terciaria;
    }

    getPontosRestantesSecaoFicha(categoria, subcategoria, prioridade) {
        const pontosPrioridade = this.getPontosPrioridade(categoria, prioridade);
        return pontosPrioridade - this.getPontosNormaisGastosBySubcategoria(this.state.ficha[categoria][subcategoria]);
    }

    getPontosNormaisGastosBySubcategoria(camposFicha) {
        return Object.values(camposFicha)
        .filter(ponto => ponto.hasOwnProperty('normal') === true)
        .map(ponto => ponto.normal)
        .reduce((total, pontuacao) => total + pontuacao);
    }

    getPontosBonusGastosBySubcategoria(camposFicha) {
        debugger;
        return Object.values(camposFicha)
        .filter(ponto => ponto.hasOwnProperty('bonus') === true)
        .map(ponto => ponto.bonus)
        .reduce((total, pontuacao) => total + pontuacao);
    }

    getTotalPontosBonusRestantes() {
        console.log(this.state.pontuacaoFicha.pontosBonus - this.getPontosBonusGastos());
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
        }).reduce((total, pontuacao) => total + pontuacao) * this.state.ficha.atributos.custoPontoBonus;
    }

    getPontosBonusHabilidades() {
        return Object.values(this.state.ficha.habilidades).map(habilidade => {
            if (habilidade instanceof Object)
                return this.getPontosBonusGastosBySubcategoria(habilidade)
            else
                return 0;
        }).reduce((total, pontuacao) => total + pontuacao) * this.state.ficha.habilidades.custoPontoBonus;
    }

    getPontosBonusVantagens() {
        return 0;
    }

    getPontosBonusOutros() {
        return 0;
    }

    getTotalPontos(campoDaFicha) {
        return campoDaFicha.normal + campoDaFicha.bonus;
    }

    adicionaPonto(categoria, subcategoria, campo, valor) {
        debugger;
        const prioridade = this.state.ficha[categoria][subcategoria].prioridade;
        const ficha = this.state.ficha;
        
        if (this.getPontosRestantesSecaoFicha(categoria, subcategoria, prioridade) > 0)
            ficha[categoria][subcategoria][campo].normal = valor;
        else if (this.getTotalPontosBonusRestantes() >= ficha[categoria].custoPontoBonus)
            ficha[categoria][subcategoria][campo].bonus = valor - ficha[categoria][subcategoria][campo].normal;

        this.setState({ficha});
    }

    removePonto(categoria, subcategoria, campo, valor) {
        debugger;
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
        this.setState({ficha});
    }

    componentDidMount() {
        this.setState({mesas: [{label: 'Mesa 1', value: 1}, {label: 'Mesa 2', value: 2}]});
        if (this.props.location.state != null) {
            const pontuacaoFicha = this.state.pontuacaoFicha;
            this.setState({pontuacaoFicha: {...pontuacaoFicha, pontosBonus: this.props.location.state.pontos}});
        } else
            this.props.history.push('/home');
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Dados Gerais</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="nomeInput">Nome:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="nomeInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="jogadorInput">Jogador:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="jogadorInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="cronicaInput">Crônica:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="cronicaInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="naturezaInput">Natureza:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="naturezaInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="comportamentoInput">Comportamento:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="comportamentoInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="claInput">Clã:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="claInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="geracaoInput">Geração:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="geracaoInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="refugioInput">Refúgio:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="refugioInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="conceitoInput">Conceito:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <InputText id="conceitoInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="conceitoInput">Mesa:</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.state.mesas} value={this.state.mesaSelecionada} onChange={event => this.setState({mesaSelecionada: event.value})} autoWidth={false} />
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
                                    <Spinner readonly={true} id="forcaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.forca)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.fisicos.forca)) this.adicionaPonto('atributos','fisicos','forca', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.fisicos.forca)) this.removePonto('atributos','fisicos','forca', event.value);}}/>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="destrezaInput">Destreza:</label>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <Spinner readonly={true} id="destrezaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.destreza)} onChange={event => { if (event.value > this.getTotalPontos(this.state.ficha.atributos.fisicos.destreza)) this.adicionaPonto('atributos','fisicos','destreza', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.fisicos.destreza)) this.removePonto('atributos','fisicos','destreza', event.value);}}/>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="vigorInput">Vigor:</label>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <Spinner readonly={true} id="vigorInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.vigor)} onChange={event => {if (event.value > this.getTotalPontos(this.state.ficha.atributos.fisicos.vigor)) this.adicionaPonto('atributos','fisicos','vigor', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.fisicos.vigor)) this.removePonto('atributos','fisicos','vigor', event.value);}}/>
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
                                        <Spinner readonly={true} id="carismaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.sociais.carisma)} onChange={event => {if (event.value > this.getTotalPontos(this.state.ficha.atributos.sociais.carisma)) this.adicionaPonto('atributos','sociais','carisma', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.sociais.carisma)) this.removePonto('atributos','sociais','carisma', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="manipulacaoInput">Manipulação:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="manipulacaoInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.sociais.manipulacao)} onChange={event => {if (event.value > this.getTotalPontos(this.state.ficha.atributos.sociais.manipulacao)) this.adicionaPonto('atributos','sociais','manipulacao', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.sociais.manipulacao)) this.removePonto('atributos','sociais','manipulacao', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="aparenciaInput">Aparência:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="aparenciaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.sociais.aparencia)} onChange={event => {if (event.value > this.getTotalPontos(this.state.ficha.atributos.sociais.aparencia)) this.adicionaPonto('atributos','sociais','aparencia', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.sociais.aparencia)) this.removePonto('atributos','sociais','aparencia', event.value);}}/>
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
                                        <Spinner readonly={true} id="percepcaoInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.mentais.percepcao)} onChange={event => {if (event.value > this.getTotalPontos(this.state.ficha.atributos.mentais.percepcao)) this.adicionaPonto('atributos','mentais','percepcao', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.mentais.percepcao)) this.removePonto('atributos','mentais','percepcao', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="inteligenciaInput">Inteligência:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="inteligenciaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.mentais.inteligencia)} onChange={event => {if (event.value > this.getTotalPontos(this.state.ficha.atributos.mentais.inteligencia)) this.adicionaPonto('atributos','mentais','inteligencia', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.mentais.inteligencia)) this.removePonto('atributos','mentais','inteligencia', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="raciocinioInput">Raciocínio:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="raciocinioInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.mentais.raciocinio)} onChange={event => {if (event.value > this.getTotalPontos(this.state.ficha.atributos.mentais.raciocinio)) this.adicionaPonto('atributos','mentais','raciocinio', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.atributos.mentais.raciocinio)) this.removePonto('atributos','mentais','raciocinio', event.value);}}/>
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
                                        <Spinner readonly={true} id="prontidaoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.prontidao)} onChange={event => {if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.prontidao)) this.adicionaPonto('habilidades','talentos','prontidao', event.value); else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.prontidao)) this.removePonto('habilidades','talentos','prontidao', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="esportesInput">Esportes:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="esportesInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.esportes)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.esportes)) 
                                                this.adicionaPonto('habilidades','talentos','esportes', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.esportes)) 
                                                this.removePonto('habilidades','talentos','esportes', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="brigaInput">Briga:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="brigaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.briga)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.briga)) 
                                                this.adicionaPonto('habilidades','talentos','briga', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.briga)) 
                                                this.removePonto('habilidades','talentos','briga', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="esquivaInput">Esquiva:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="esquivaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.esquiva)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.esquiva)) 
                                                this.adicionaPonto('habilidades','talentos','esquiva', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.esquiva)) 
                                                this.removePonto('habilidades','talentos','esquiva', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="empatiaInput">Empatia:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="empatiaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.empatia)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.empatia)) 
                                                this.adicionaPonto('habilidades','talentos','empatia', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.empatia)) 
                                                this.removePonto('habilidades','talentos','empatia', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="expressaoInput">Expressão:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="expressaoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.expressao)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.expressao)) 
                                                this.adicionaPonto('habilidades','talentos','expressao', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.expressao)) 
                                                this.removePonto('habilidades','talentos','expressao', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="intimidacaoInput">Intimidação:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="intimidacaoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.intimidacao)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.intimidacao)) 
                                                this.adicionaPonto('habilidades','talentos','intimidacao', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.intimidacao)) 
                                                this.removePonto('habilidades','talentos','intimidacao', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="liderancaInput">Liderança:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="liderancaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.lideranca)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.lideranca)) 
                                                this.adicionaPonto('habilidades','talentos','lideranca', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.lideranca)) 
                                                this.removePonto('habilidades','talentos','lideranca', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="manhaInput">Manha:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="manhaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.manha)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.manha)) 
                                                this.adicionaPonto('habilidades','talentos','manha', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.manha)) 
                                                this.removePonto('habilidades','talentos','manha', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="labiaInput">Lábia:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="labiaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.talentos.labia)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.talentos.labia)) 
                                                this.adicionaPonto('habilidades','talentos','labia', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.talentos.labia)) 
                                                this.removePonto('habilidades','talentos','labia', event.value);}}/>
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
                                                this.adicionaPonto('habilidades','pericias','empatiaComAnimais', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.empatiaComAnimais)) 
                                                this.removePonto('habilidades','pericias','empatiaComAnimais', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="oficiosInput">Ofícios:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                    <Spinner readonly={true} id="oficiosInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.oficios)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.oficios)) 
                                                this.adicionaPonto('habilidades','pericias','oficios', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.oficios)) 
                                                this.removePonto('habilidades','pericias','oficios', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="conducaoInput">Condução:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="conducaoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.conducao)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.conducao)) 
                                                this.adicionaPonto('habilidades','pericias','conducao', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.conducao)) 
                                                this.removePonto('habilidades','pericias','conducao', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="etiquetaInput">Etiqueta:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="etiquetaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.etiqueta)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.etiqueta)) 
                                                this.adicionaPonto('habilidades','pericias','etiqueta', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.etiqueta)) 
                                                this.removePonto('habilidades','pericias','etiqueta', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="armasDeFogoInput">Armas de Fogo:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="armasDeFogoInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.armasDeFogo)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.armasDeFogo)) 
                                                this.adicionaPonto('habilidades','pericias','armasDeFogo', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.armasDeFogo)) 
                                                this.removePonto('habilidades','pericias','armasDeFogo', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="armasBrancasInput">Armas Brancas:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="armasBrancasInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.armasBrancas)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.armasBrancas)) 
                                                this.adicionaPonto('habilidades','pericias','armasBrancas', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.armasBrancas)) 
                                                this.removePonto('habilidades','pericias','armasBrancas', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="performanceInput">Performance:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="performanceInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.performance)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.performance)) 
                                                this.adicionaPonto('habilidades','pericias','performance', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.performance)) 
                                                this.removePonto('habilidades','pericias','performance', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="segurancaInput">Segurança:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="segurancaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.seguranca)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.seguranca)) 
                                                this.adicionaPonto('habilidades','pericias','seguranca', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.seguranca)) 
                                                this.removePonto('habilidades','pericias','seguranca', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="furtividadeInput">Furtividade:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="furtividadeInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.furtividade)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.furtividade)) 
                                                this.adicionaPonto('habilidades','pericias','furtividade', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.furtividade)) 
                                                this.removePonto('habilidades','pericias','furtividade', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="sobrevivenciaInput">Sobrevivência:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner readonly={true} id="sobrevivenciaInput" min={0} value={this.getTotalPontos(this.state.ficha.habilidades.pericias.sobrevivencia)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.pericias.sobrevivencia)) 
                                                this.adicionaPonto('habilidades','pericias','sobrevivencia', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.pericias.sobrevivencia)) 
                                                this.removePonto('habilidades','pericias','sobrevivencia', event.value);}}/>
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
                                                this.adicionaPonto('habilidades','conhecimentos','academicos', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.academicos)) 
                                                this.removePonto('habilidades','conhecimentos','academicos', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="computadorInput">Computador:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="computadorInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.computador)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.computador)) 
                                                this.adicionaPonto('habilidades','conhecimentos','computador', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.computador)) 
                                                this.removePonto('habilidades','conhecimentos','computador', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="financasInput">Finanças:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="financasInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.financas)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.financas)) 
                                                this.adicionaPonto('habilidades','conhecimentos','financas', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.financas)) 
                                                this.removePonto('habilidades','conhecimentos','financas', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="investigacaoInput">Investigação:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="investigacaoInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.investigacao)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.investigacao)) 
                                                this.adicionaPonto('habilidades','conhecimentos','investigacao', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.investigacao)) 
                                                this.removePonto('habilidades','conhecimentos','investigacao', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="direitoInput">Direito:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="direitoInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.direito)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.direito)) 
                                                this.adicionaPonto('habilidades','conhecimentos','direito', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.direito)) 
                                                this.removePonto('habilidades','conhecimentos','direito', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="linguisticaInput">Linguística:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="linguisticaInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.linguistica)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.linguistica)) 
                                                this.adicionaPonto('habilidades','conhecimentos','linguistica', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.linguistica)) 
                                                this.removePonto('habilidades','conhecimentos','linguistica', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="medicinaInput">Medicina:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="medicinaInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.medicina)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.medicina)) 
                                                this.adicionaPonto('habilidades','conhecimentos','medicina', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.medicina)) 
                                                this.removePonto('habilidades','conhecimentos','medicina', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="ocultismoInput">Ocultismo:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="ocultismoInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ocultismo)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ocultismo)) 
                                                this.adicionaPonto('habilidades','conhecimentos','ocultismo', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ocultismo)) 
                                                this.removePonto('habilidades','conhecimentos','ocultismo', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="politicaInput">Política:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="politicaInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.politica)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.politica)) 
                                                this.adicionaPonto('habilidades','conhecimentos','politica', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.politica)) 
                                                this.removePonto('habilidades','conhecimentos','politica', event.value);}}/>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <label htmlFor="cienciaInput">Ciência:</label>
                                    </div>
                                    <div className="p-col-6 p-md-2">
                                        <Spinner id="cienciaInput" readonly={true} min={0} value={this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ciencia)} 
                                        onChange={event => {
                                            if (event.value > this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ciencia)) 
                                                this.adicionaPonto('habilidades','conhecimentos','ciencia', event.value); 
                                            else if (event.value < this.getTotalPontos(this.state.ficha.habilidades.conhecimentos.ciencia)) 
                                                this.removePonto('habilidades','conhecimentos','ciencia', event.value);}}/>
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
                            <span className="w3-badge w3-green">5</span>
                            <PontoDataTableCrud title="Antecedente"/>
                        </div>
                        <div className="card card-w-title">
                            <h1>Disciplinas</h1>
                            <span className="w3-badge w3-green">3</span>
                            <PontoDataTableCrud title="Disciplina"/>
                        </div>
                        <div className="card card-w-title">
                            <h1>Virtudes</h1>
                            <span className="w3-badge w3-green">8</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="forcaInput">Consciência:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="forcaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="destrezaInput">Autocontrole:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="destrezaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Coragem:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <div className="card card-w-title">
                        <h1>Qualidades e Defeitos</h1>
                        <div className="p-grid">
                            <PontoDataTableCrud title="Qualidade/Defeito"/>
                        </div>
                    </div>
                    <div className="card card-w-title">
                        <h1>Humanidade/Trilha</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="destrezaInput">Nome:</label>
                            </div>
                            <div className="p-col-12 p-md-6">
                                <InputText id="forcaInput"/>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <label htmlFor="destrezaInput">Pontos:</label>
                            </div>
                            <div className="p-col-12 p-md-2">
                                <InputText id="forcaInput" keyfilter="pnum"/>
                            </div>
                        </div>
                    </div>
                    <div className="card card-w-title">
                        <h1>Vitalidade</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1"/>
                                <label htmlFor="cb1" className="p-checkbox-label">Escoriado</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1"/>
                                <label htmlFor="cb1" className="p-checkbox-label">Machucado (-1)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1"/>
                                <label htmlFor="cb1" className="p-checkbox-label">Ferido (-1)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1"/>
                                <label htmlFor="cb1" className="p-checkbox-label">Ferido Gravemente (-2)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1"/>
                                <label htmlFor="cb1" className="p-checkbox-label">Espancado (-2)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1"/>
                                <label htmlFor="cb1" className="p-checkbox-label">Aleijado (-5)</label>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <Checkbox value="Ultima" inputId="cb1"/>
                                <label htmlFor="cb1" className="p-checkbox-label">Incapacitado</label>
                            </div>
                        </div>
                    </div>
                    <div className="card card-w-title">
                        <h1>Prelúdio</h1>
                        <Editor style={{height:'320px'}} />
                    </div>
                </div>
                <Pontos pontos={this.state.pontuacaoFicha.pontosBonus}/>
            </div>
        );
    }
}