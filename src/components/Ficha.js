import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import {Checkbox} from 'primereact/checkbox';
import { DataTableCrud } from './DataTableCrud';
import {Editor} from 'primereact/editor';
import {Dropdown} from 'primereact/dropdown';
import {Spinner} from 'primereact/spinner';


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
                }
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
                    }
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
                    }
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
                usuario: '',
                pontosBonus: 15
            }
        };
    }

    updatePrioridade(event, categoria, subcategoria) {
        const ficha = this.state.ficha;
        const categoriaPrioridade = ficha[categoria];
        Object.keys(categoriaPrioridade).forEach(categoriaKey => {
            if (this._isPrioridadeJaSelecionada(categoriaKey, subcategoria, categoriaPrioridade[categoriaKey].prioridade, event.target.value))
                categoriaPrioridade[categoriaKey].prioridade = categoriaPrioridade[subcategoria].prioridade;
        })
        categoriaPrioridade[subcategoria].prioridade = parseInt(event.value);
        this.setState({ficha});
    }

    _isPrioridadeJaSelecionada(categoriaSelecionada, categoriaChecada, prioridadeSelecionada, prioridadeChecada) {
        return (categoriaSelecionada !== categoriaChecada && prioridadeSelecionada === prioridadeChecada);
    }

    getPontosPrioridade(propriedade, prioridade) {
        if (prioridade === 1) return this.state.pontuacaoFicha[propriedade].primaria;
        else if (prioridade === 2) return this.state.pontuacaoFicha[propriedade].secundaria;
        else return this.state.pontuacaoFicha[propriedade].terciaria;
    }

    getTotalPontosSecaoFicha(categoria, subcategoria, prioridade) {
        const pontosDisponiveis = this.getPontosPrioridade(categoria, prioridade);
        return pontosDisponiveis - this.getTotalPontosNormaisGastosBySubcategoria(this.state.ficha[categoria][subcategoria]);
    }

    getTotalPontosNormaisGastosBySubcategoria(camposFicha) {
        return Object.values(camposFicha)
        .filter(ponto => ponto.hasOwnProperty('normal') === true)
        .map(ponto => ponto.normal)
        .reduce((total, pontuacao) => total + pontuacao);
    }

    getTotalPontosBonusRestantes() {
        return this.state.ficha.pontosBonus;
    }

    getTotalPontos(campoDaFicha) {
        return campoDaFicha.normal + campoDaFicha.bonus;
    }

    adicionaPonto(categoria, subcategoria, campo, valor) {
        const prioridade = this.state.ficha[categoria][subcategoria].prioridade;
        const pontoAlterado = this.state.ficha[categoria][subcategoria][campo].normal + this.state.ficha[categoria][subcategoria][campo].bonus;
        
        if (this.getTotalPontosSecaoFicha(categoria, subcategoria, prioridade) > 0 || pontoAlterado > valor || this.getTotalPontosBonusRestantes() > 0) {
            const ficha = this.state.ficha;
            const categoriaPrioridade = ficha[categoria];
            this.atualizarPontosCampo(categoriaPrioridade[subcategoria], campo, valor, this.getPontosPrioridade(categoria, prioridade), this.getTotalPontosNormaisGastosBySubcategoria(this.state.ficha[categoria][subcategoria]));
            this.setState({ficha});
        }
        console.log('Testes: ', this.state);
    }

    atualizarPontosCampo(subcategoria, campo, valor, pontosPrioridade, pontosNormaisGastos) {
        debugger;
        if (pontosPrioridade === pontosNormaisGastos && valor > subcategoria[campo].normal) {
            subcategoria[campo].bonus = valor - subcategoria[campo].normal;
        } else {
            Object.keys(subcategoria).forEach(campo => {
                if (subcategoria[campo].hasOwnProperty('bonus')) {
                    subcategoria[campo].normal = subcategoria[campo].bonus;
                    subcategoria[campo].bonus = 0;
                }
            });
            subcategoria[campo].normal = valor;
        }
    }

    componentDidMount() {
        this.setState({mesas: [{label: 'Mesa 1', value: 1}, {label: 'Mesa 2', value: 2}]});
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
                            <span className="w3-badge w3-green">{this.getTotalPontosSecaoFicha('atributos', 'fisicos', this.state.ficha.atributos.fisicos.prioridade)}</span>
                            <Fieldset toggleable={true}>
                            <div className="p-grid">
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="forcaInput">Força:</label>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <Spinner readonly={true} id="forcaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.forca)} onChange={event => this.adicionaPonto('atributos','fisicos','forca', event.target.value)}/>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="destrezaInput">Destreza:</label>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <Spinner readonly={true} id="destrezaInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.destreza)} onChange={event => this.adicionaPonto('atributos','fisicos','destreza', event.target.value)}/>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="vigorInput">Vigor:</label>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <Spinner readonly={true} id="vigorInput" min={1} value={this.getTotalPontos(this.state.ficha.atributos.fisicos.vigor)} onChange={event => this.adicionaPonto('atributos','fisicos','vigor', event.target.value)}/>
                                </div>
                            </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Sociais</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.atributos.sociais.prioridade} onChange={event => this.updatePrioridade(event, 'atributos', 'sociais')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getTotalPontosSecaoFicha('atributos', 'sociais', this.state.ficha.atributos.sociais.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="carismaInput">Carisma:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} id="carismaInput" value={this.getTotalPontos(this.state.ficha.atributos.sociais.carisma)}/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="manipulacaoInput">Manipulação:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} id="manipulacaoInput" value={this.getTotalPontos(this.state.ficha.atributos.sociais.manipulacao)}/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="aparenciaInput">Aparência:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} id="aparenciaInput" value={this.getTotalPontos(this.state.ficha.atributos.sociais.aparencia)}/>
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Mentais</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.atributos.mentais.prioridade} onChange={event => this.updatePrioridade(event, 'atributos', 'mentais')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getTotalPontosSecaoFicha('atributos', 'mentais', this.state.ficha.atributos.mentais.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="percepcaoInput">Percepção:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} id="percepcaoInput" value={this.getTotalPontos(this.state.ficha.atributos.mentais.percepcao)}/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="inteligenciaInput">Inteligência:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} id="inteligenciaInput" value={this.getTotalPontos(this.state.ficha.atributos.mentais.inteligencia)}/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="raciocinioInput">Raciocínio:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <Spinner readonly={true} id="raciocinioInput" value={this.getTotalPontos(this.state.ficha.atributos.mentais.raciocinio)}/>
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
                            <span className="w3-badge w3-green">{this.getPontosPrioridade('habilidades', this.state.ficha.habilidades.talentos.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="forcaInput">Prontidão:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="forcaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="destrezaInput">Esportes:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="destrezaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Briga:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Esquiva:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Empatia:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Expressão:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Intimidação:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Liderança:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Manha:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Lábia:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Perícias</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.habilidades.pericias.prioridade} onChange={event => this.updatePrioridade(event, 'habilidades', 'pericias')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getPontosPrioridade('habilidades', this.state.ficha.habilidades.pericias.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="forcaInput">Empatia c/ Animais:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="forcaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="destrezaInput">Ofícios:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="destrezaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Condução:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Etiqueta:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Armas de Fogo:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Armas Brancas:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Performance:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Segurança:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Furtividade:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Sobrevivência:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Conhecimentos</h1>
                            <div className="p-col-12 p-md-4">
                                <Dropdown options={this.prioridades} value={this.state.ficha.habilidades.conhecimentos.prioridade} onChange={event => this.updatePrioridade(event, 'habilidades', 'conhecimentos')} autoWidth={false} />
                            </div>
                            <span className="w3-badge w3-green">{this.getPontosPrioridade('habilidades', this.state.ficha.habilidades.conhecimentos.prioridade)}</span>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="forcaInput">Acadêmicos:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="forcaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="destrezaInput">Computador:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="destrezaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Finanças:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Investigação:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Direito:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Linguística:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Medicina:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Ocultismo:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Política:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="vigorInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="vigorInput">Ciência:</label>
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
                        <h1>Vantagens</h1>
                        <div className="card card-w-title">
                            <h1>Antecedentes</h1>
                            <span className="w3-badge w3-green">5</span>
                            <DataTableCrud title="Antecedente"/>
                        </div>
                        <div className="card card-w-title">
                            <h1>Disciplinas</h1>
                            <span className="w3-badge w3-green">3</span>
                            <DataTableCrud title="Disciplina"/>
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
                            <DataTableCrud title="Qualidade/Defeito"/>
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
            </div>
        );
    }
}