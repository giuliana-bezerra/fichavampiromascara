import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

class AppInlineProfile extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  (
            <div className="profile">
                <div>
                    <img src="assets/layout/images/vamp.png" alt="" />
                </div>
                <button className="p-link profile-link" onClick={this.onClick}>
                    <span className="username">Claire Williams</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'profile-expanded': this.state.expanded})}>
                    <li><button className="p-link" onClick={e => this.props.history.push('/conta')}><i className="pi pi-fw pi-user"/><span>Conta</span></button></li>
                    {/* <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notificações</span><span className="menuitem-badge">2</span></button></li> */}
                    <li><button className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}

export default withRouter(AppInlineProfile);