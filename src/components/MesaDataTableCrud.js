import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { AutoComplete } from 'primereact/autocomplete';

export default class MesaDataTableCrud extends Component {
    constructor() {
        super();
        this.state = {
            filteredCountriesMultiple: null,
            countries: []
        };
        //this.carservice = new CarService();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onCarSelect = this.onCarSelect.bind(this);
        this.addNew = this.addNew.bind(this);
        this.countriesData = [];
    }

    componentDidMount() {
        this.setState({cars: []});
        this.countriesData = [ {"name": "Afghanistan", "code": "AF"}, 
        {"name": "Aland Islands", "code": "AX"}];
    }

    save() {
        let cars = [...this.state.cars];
        let car = this.state.car;
        car['countriesStr'] = this.state.car.countries.map(obj => obj.name).toString();
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
        console.log('Aqui: ', e.data);
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

    filterCountryMultiple = event => {
        setTimeout(() => {
            let results = this.countriesData.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
            this.setState({ filteredCountriesMultiple: results });
        }, 250);
    }
    
    render() {
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>Listagem</div>;

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                <Button label="Delete" icon="pi pi-times" onClick={this.delete}/>
                <Button label="Save" icon="pi pi-check" onClick={this.save}/>
            </div>;

        return (
            <div>
                <div className="content-section implementation">
                    <DataTable var="car" value={this.state.cars} rows={15}  header={header} footer={footer}
                               selectionMode="single" selection={this.state.selectedCar} onSelectionChange={e => this.setState({selectedCar: e.value})}
                               onRowSelect={this.onCarSelect} emptyMessage="Nenhum registro encontrado.">
                        <Column field="nome" header="Nome" sortable={true} />
                        <Column field="countriesStr" header="Pontos" sortable={true}/>
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} width="300px" header={this.props.title} modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
                        {
                            this.state.car && 
                            
                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="nome">Nome</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="nome" onChange={(e) => {this.updateProperty('nome', e.target.value)}} value={this.state.car.nome}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label>Jogadores</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <AutoComplete value={this.state.car.countries} suggestions={this.state.filteredCountriesMultiple} completeMethod={this.filterCountryMultiple}
                                    minLength={1} placeholder="Countries" field="name" multiple={true} 
                                    onChange={(e) => {this.updateProperty('countries', e.value); this.setState({countries: e.value})}} />
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>
            </div>
        );
    }
}