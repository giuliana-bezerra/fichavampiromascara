import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class AppTopbar extends Component {
    constructor() {
        super();
        this.state = { ficha: 'block', logado: false };
    }

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="layout-topbar clearfix">
                <button className="p-link layout-menu-button" onClick={this.props.onToggleMenu} disabled={this.props.autenticado}>
                    <span className="pi pi-bars"/>
                </button>
                <div className="layout-topbar-icons" style={{display: this.state.ficha}}>
                    Bônus: <span className="w3-badge w3-green">6</span>
                    <button className="p-link">
                        <span className="layout-topbar-item-text">Salvar</span>
                        <span className="layout-topbar-icon pi pi-check"/>
                    </button>
                </div>
                {/* <div className="layout-topbar-icons">
                    <span className="layout-topbar-search">
                        <InputText type="text" placeholder="Search" />
                        <span className="layout-topbar-search-icon pi pi-search"/>
                    </span>
                    <button className="p-link">
                        <span className="layout-topbar-item-text">Events</span>
                        <span className="layout-topbar-icon pi pi-calendar"/>
                        <span className="layout-topbar-badge">5</span>
                    </button>
                    <button className="p-link">
                        <span className="layout-topbar-item-text">Settings</span>
                        <span className="layout-topbar-icon pi pi-cog"/>
                    </button>
                    <button className="p-link">
                        <span className="layout-topbar-item-text">User</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                    </button>
                </div> */}
            </div>
        );
    }
}