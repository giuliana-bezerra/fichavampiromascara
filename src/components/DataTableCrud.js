import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export class DataTableCrud extends Component {
    constructor() {
        super();
        this.state = {};
        //this.carservice = new CarService();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onCarSelect = this.onCarSelect.bind(this);
        this.addNew = this.addNew.bind(this);
    }

    componentDidMount() {
        this.setState({cars: []});
        //this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    save() {
        let cars = [...this.state.cars];
        if(this.newCar)
            cars.push(this.state.car);
        else
            cars[this.findSelectedCarIndex()] = this.state.car;

        this.setState({cars:cars, selectedCar:null, car: null, displayDialog:false});
    }

    delete() {
        let index = this.findSelectedCarIndex();
        this.setState({
            cars: this.state.cars.filter((val,i) => i !== index),
            selectedCar: null,
            car: null,
            displayDialog: false});
    }

    findSelectedCarIndex() {
        return this.state.cars.indexOf(this.state.selectedCar);
    }

    updateProperty(property, value) {
        let car = this.state.car;
        car[property] = value;
        this.setState({car: car});
    }

    onCarSelect(e){
        this.newCar = false;
        this.setState({
            displayDialog:true,
            car: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newCar = true;
        this.setState({
            car: {vin:'', year: '', brand: '', color: ''},
            displayDialog: true
        });
    }

    render() {
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>Listagem</div>;

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                <Button icon="pi pi-times" onClick={this.delete}/>
                <Button icon="pi pi-check" onClick={this.save}/>
            </div>;

        return (
            <div>
                <DataTable value={this.state.cars} rows={15} header={header} footer={footer}
                            selectionMode="single" selection={this.state.selectedCar} 
                            onSelectionChange={e => this.setState({selectedCar: e.value})}
                            onRowSelect={this.onCarSelect} 
                            emptyMessage="Nenhum registro encontrado.">
                    <Column field="nome" header="Nome" sortable={true} />
                    <Column field="pontos" header="Pontos" sortable={true} />
                </DataTable>

                <Dialog visible={this.state.displayDialog} width="300px" header={this.props.title} modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
                    {
                        this.state.car && 
                        
                        <div className="p-grid p-fluid">
                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="nome">Nome</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="nome" onChange={(e) => {this.updateProperty('nome', e.target.value)}} value={this.state.car.nome}/>
                            </div>

                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="pontos">Pontos</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="pontos" onChange={(e) => {this.updateProperty('pontos', e.target.value)}} value={this.state.car.pontos} keyfilter="pnum"/>
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}
