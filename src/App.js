import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Template from './components/template';
import HelloWorld from './components/content';
import HomePage from './views/home';
import './App.css';

class App extends Component {

   render() {

      return (

         <Router>
            
            <div>
            
               <Template>

                  <Switch>
                     
                     <Route exact path="/" component={HomePage} />
                     <Route exact path="/hello" component={HelloWorld} />

                  </Switch>

               </Template>

            </div>

         </Router>
      );
   }
}

export default App;