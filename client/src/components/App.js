import React from 'react'
import Header from './Header'
import Router from './Routes'
import Footer from './Footer'
import '../css/index.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router />
        <Footer />
      </div>
    )
  }
}

export default App; 