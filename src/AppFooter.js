import React, { Component } from 'react';

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <span className="footer-text" style={{'marginRight': '5px'}}>
                    <a href="https://www.linkedin.com/in/giulianabezerra">&copy; 2019 Giuliana Silva Bezerra</a>
                </span>
            </div>
        );
    }
}