import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadUsers } from './store';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import Users from './Users';
import Nav from './Nav';
import User from './User';
import Create from './Create';
import Update from './Update';

const Home = ()=> <hr />;

//jsx thingy
class _App extends Component{
  componentDidMount(){
    this.props.bootstrap();
    }
  render(){
    return (
        <Router>
            <div>
                <h1>Acme Users</h1>
                <Route component = { Nav } />
                <Route component = { Home } path = '/' exact/>
                <Route component = { Users } path = '/users' exact/>
                <Switch>
                  <Route component = { Create } path = '/users/create' />
                  <Route component = { User } path = '/users/:id' exact/>
                </Switch>
                <Route component = { Update } path = '/users/:id/update' />
            </div>
        </Router>
    );
  }
}

//connecting to store
const App = connect(
    //state
    ({ users })=> ({ users }),
    //communitacting with state
    (dispatch)=> {
        return {
            bootstrap: ()=> dispatch(loadUsers())
        };
    }
)(_App);

//also connecting with store, need to go over so i understand the diferrence between the two
//really do not at the moment
render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));