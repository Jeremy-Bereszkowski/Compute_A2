import React, { Component } from 'react'
import '../css/Footer.css'

export class Footer extends Component {
    render() {
        return (
            <footer class="footer">
                <div class="container">
                    <span className="text-muted left">Compute A2 - 2020</span>
                    <span className="text-muted right">Ye Wyn Woon, Jeremy Bereszkowski</span>
                </div>
            </footer>
        )
    }
}

export default Footer
