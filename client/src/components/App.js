import React from 'react'
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import '../css/index.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    )
  }
}

export default App; 