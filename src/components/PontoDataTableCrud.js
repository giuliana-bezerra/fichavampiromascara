import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Spinner } from 'primereact/spinner';

export class PontoDataTableCrud extends Component {
    constructor() {
        super();
        this.state = {};
        //this.carservice = new CarService();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onPontoSelect = this.onPontoSelect.bind(this);
        this.addNovo = this.addNovo.bind(this);
    }

    componentDidMount() {
        this.setState({pontos: []});
        //this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    save() {
        let pontos = [...this.state.pontos];
        if(this.novoPonto)
            pontos.push(this.state.ponto);
        else
            pontos[this.findSelectedPontoIndex()] = this.state.ponto;

        this.setState({pontos, selectedPonto: null, ponto: null, displayDialog:false});
    }

    delete() {
        let index = this.findSelectedPontoIndex();
        this.setState({
            pontos: this.state.pontos.filter((val,i) => i !== index),
            selectedPonto: null,
            ponto: null,
            displayDialog: false});
    }

    findSelectedPontoIndex() {
        return this.state.pontos.indexOf(this.state.selectedPonto);
    }

    updateProperty(property, value) {
        let ponto = this.state.ponto;
        ponto[property] = value;
        this.setState({ponto});
    }

    onPontoSelect(event){
        this.novoPonto = false;
        this.setState({
            displayDialog:true,
            ponto: Object.assign({}, event.data)
        });
    }

    addNovo() {
        this.novoPonto = true;
        this.setState({
            ponto: {nome:'', pontos: 1},
            displayDialog: true
        });
    }

    render() {
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>Listagem</div>;

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNovo}/>
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                <Button icon="pi pi-times" onClick={this.delete}/>
                <Button icon="pi pi-check" onClick={this.save}/>
            </div>;

        return (
            <div>
                <DataTable value={this.state.pontos} rows={15} header={header} footer={footer}
                            selectionMode="single" selection={this.state.selectedPonto} 
                            onSelectionChange={e => this.setState({selectedPonto: e.value})}
                            onRowSelect={this.onPontoSelect} 
                            emptyMessage="Nenhum registro encontrado.">
                    <Column field="nome" header="Nome" sortable={true} />
                    <Column field="pontos" header="Pontos" sortable={true} />
                </DataTable>

                <Dialog visible={this.state.displayDialog} width="300px"
                header={this.props.title} modal={false} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
                    {
                        this.state.ponto && 
                        
                        <div className="p-grid p-fluid">
                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="nome">Nome</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="nome" onChange={(e) => {this.updateProperty('nome', e.target.value)}} value={this.state.ponto.nome}/>
                            </div>

                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="pontos">Pontos</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <Spinner id="pontos" readonly={true} min={1} onChange={(e) => {this.updateProperty('pontos', e.target.value)}} value={this.state.ponto.pontos}/>
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}
