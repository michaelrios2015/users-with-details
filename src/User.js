import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyUser } from './store';

const User = ({ user, destroy })=> {
    //does this just litterally stop the page from trying to get the name again
    if (!user.id){
        return '...loading user';
    }
    return(
    <div>
        User details for { user.name }
        <br />
        <button onClick = {()=> destroy(user) }>Destroy</button>
        <br />
        <Link to={`/users/${user.id}/update`}>Update</Link>
        
    </div>
    ); 
}


export default connect( 
    (state, otherProps) => {
        //console.log(otherProps);
        const user = state.users.find(user => user.id === otherProps.match.params.id*1) || {};
        return {
            user
        };
    },
    (dispatch, { history })=> {
        return {
            destroy: (user)=> dispatch(destroyUser(user, history))
        }
    }
)(User);