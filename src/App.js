import React from 'react';
import './App.css';
import Nav from './components/nav/nav.jsx';
import HomePage from './components/pages/homePage/homePage.jsx';
import Anime from './components/anime/anime.jsx';
import ErrorPage from './components/pages/error-page/error-page.jsx';
import CatogoriesPage from './components/pages/catogories-page/catogories-page.jsx';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (

    <Router>
        <div className="App">
          <Nav/>
          <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path="/anime/:animeId" component={Anime}/>
          <Route exact path="/catogories/:catogory" component={CatogoriesPage}/>
          <Route path="/" render={()=><ErrorPage/>} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;

