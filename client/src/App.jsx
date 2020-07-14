import React from 'react'
import Login from './components/Login.jsx'
import LandingPage from './components/LandingPage.jsx'
import Register from './components/Register.jsx'
import Secrets from './components/Secrets.jsx'
import './styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <div>
        <Route path='/' exact component={LandingPage} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/secrets' exact component={Secrets} />
      </div>
    </Router>
  )
}
export default App
