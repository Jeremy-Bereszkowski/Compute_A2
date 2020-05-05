import React, { Component } from 'react'

class Header extends Component {

    render() {
        return (
            <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
                <a href="/dashboard" class="navbar-brand col-sm-3 col md 2 mr-0">{process.env.REACT_APP_NAME}</a>
                <ul class="navbar-nav px-3">
                    {this.props.items.map((item, index) => (
                        <li class="nav-item text-nowrap" id={index}>
                            <a href={item.link} class="nav-link" onClick={item.onClick}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

export default Header
