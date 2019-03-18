import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import {Checkbox} from 'primereact/checkbox';
import { DataTableCrud } from './DataTableCrud';
import {Editor} from 'primereact/editor';
import Pontos from './Pontos';

export default class Ficha extends Component {
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
                        </div>
                    </div>
                    <div className="card card-w-title">
                        <h1>Atributos</h1>
                        <div className="card card-w-title">
                            <h1>Físicos</h1>
                            <Fieldset toggleable={true}>
                            <div className="p-grid">
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="forcaInput">Força:</label>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <InputText id="forcaInput" keyfilter="pnum"/>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="destrezaInput">Destreza:</label>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <InputText id="destrezaInput" keyfilter="pnum"/>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <label htmlFor="vigorInput">Vigor:</label>
                                </div>
                                <div className="p-col-6 p-md-2">
                                    <InputText id="vigorInput" keyfilter="pnum"/>
                                </div>
                            </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Sociais</h1>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="carismaInput">Carisma:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="carismaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="manipulacaoInput">Manipulação:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="manipulacaoInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="aparenciaInput">Aparência:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="aparenciaInput" keyfilter="pnum"/>
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div className="card card-w-title">
                            <h1>Mentais</h1>
                            <Fieldset toggleable={true}>
                                <div className="p-grid">
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="percepcaoInput">Percepção:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="percepcaoInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="inteligenciaInput">Inteligência:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="inteligenciaInput" keyfilter="pnum"/>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <label htmlFor="raciocinioInput">Raciocínio:</label>
                                    </div>
                                    <div className="p-col-12 p-md-2">
                                        <InputText id="raciocinioInput" keyfilter="pnum"/>
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
                            <h1>Conhecimento</h1>
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
                            <DataTableCrud title="Antecedente"/>
                        </div>
                        <div className="card card-w-title">
                            <h1>Disciplinas</h1>
                            <DataTableCrud title="Disciplina"/>
                        </div>
                        <div className="card card-w-title">
                            <h1>Virtudes</h1>
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
                <Pontos/>
            </div>
        );
    }
}