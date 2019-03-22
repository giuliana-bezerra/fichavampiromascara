import React, { Component } from 'react';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { CarService } from '../service/CarService';
import { withRouter } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';

class FichaLista extends Component {
    constructor() {
        super();
        this.state = {
            sortOptionsortOptions: [
                {label: 'Newest First', value: '!year'},
                {label: 'Oldest First', value: 'year'},
                {label: 'Brand', value: 'brand'}
            ],
            layout: 'grid',
            pontosBonus: 0
        }
        this.carService = new CarService();
    }

    componentDidMount() {
        let fichas = [{personagem: 'Maria', cla: 'Nosferatu', cronica: 'Sangue e Ouro', foto: ''},
        {personagem: 'João', cla: 'Nosferatu', cronica: 'Sangue e Ouro', foto: ''},
        {personagem: 'José', cla: 'Nosferatu', cronica: 'Sangue e Ouro', foto: ''}];

        this.setState({dataViewValue: fichas});
    }

    dataViewItemTemplate = (ficha,layout) => {
        if (!ficha) {
            return;
        }

        if (layout === 'list') {
            return (
                <div className="p-grid" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                    <div className="p-col-12 p-md-3">
                        <img src="assets/layout/images/avatar_4.png" alt=""/>
                    </div>
                    <div className="p-col-12 p-md-8 car-details">
                        <div className="p-grid">
                            <div className="p-col-2 p-sm-6">Personagem:</div>
                            <div className="p-col-10 p-sm-6">{ficha.personagem}</div>

                            <div className="p-col-2 p-sm-6">Clã:</div>
                            <div className="p-col-10 p-sm-6">{ficha.cla}</div>

                            <div className="p-col-2 p-sm-6">Crônica:</div>
                            <div className="p-col-10 p-sm-6">{ficha.cronica}</div>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
                        <Button icon="pi pi-search"></Button>
                    </div>
                </div>
            );
        }

        if (layout === 'grid') {
            return (
                <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                    <Panel header={ficha.cronica} style={{ textAlign: 'center' }}>
                        <img src="assets/layout/images/avatar_4.png" alt="" />
                        <div className="car-detail">{ficha.personagem} - {ficha.cla}</div>
                        <Button icon="pi pi-search"></Button>
                    </Panel>
                </div>
            );
        }
    }

    render() {
        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button icon="pi pi-times" onClick={e => this.setState({dialogVisible:false})}/>
            <Button icon="pi pi-check" onClick={e => this.props.history.push('/ficha')}/>
        </div>;
        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Criar nova ficha" icon="pi pi-plus" onClick={e => this.setState({dialogVisible:true})}/>

            <Dialog header="Pontos da Ficha" footer={dialogFooter} visible={this.state.dialogVisible} onHide={() => this.setState({dialogVisible:false})}>
                <div className="p-grid">
                    <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="nome">Pontos Bônus:</label></div>
                    <div className="p-col-8" style={{padding:'.5em'}}>
                        <InputText id="nome" value={this.state.pontosBonus} onInput={event => this.setState({pontosBonus: event.target.value})} keyfilter="pnum"/>
                    </div>
                </div>
            </Dialog>
            
        </div>;

        const header = (
            <div className="p-grid">
                <div className="p-col-12 p-md-4" style={{textAlign:'left'}}>
                    <Dropdown options={this.state.sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6 p-md-4">
                    <InputText placeholder="Search by brand" onKeyUp={event => this.dv.filter(event.target.value)} />
                </div>
            </div>
        );

        return (
            <div className="p-col-12">
                <div className="card card-w-title">
                    <h1>Fichas</h1>
                    <DataView value={this.state.dataViewValue} filterBy="personagem" itemTemplate={this.dataViewItemTemplate} layout={this.state.layout}
                    paginatorPosition={'both'} header={header} sortOrder={this.state.sortOrder} 
                    sortField={this.state.sortField} footer={footer}/>
                </div>
            </div>
        );
    }
}

export default withRouter(FichaLista);