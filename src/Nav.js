import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import faker from 'faker';
import { createUser } from './store';

const Nav = ({ create, users, location: { pathname } })=> {
    return(
        <nav>
            <Link to = '/' className = { pathname === '/' ? 'selected' : ''}>Home</Link>
            <Link to = '/users' className = { pathname === '/users' ? 'selected' : ''}>Users ({ users.length })</Link>
            <button onClick={()=> create(faker.name.firstName())}>Create</button>
        </nav>
    ); 
}


export default connect( 
    state => state,
    (dispatch, { history })=> {
        return {
            create: (name)=> {
                dispatch(createUser(name, history));
                //console.log(name);
            }
        }
    }
)(Nav);