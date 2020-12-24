import React from 'react';
import { connect } from 'react-redux';
import { destroyUser } from './store';

const User = ({ user, destroy })=> {
    //does this just litterally stop the page from trying to get the name again
    if (!user.id){
        return null;
    }
    return(
    <div>
        User details for { user.name }
        <button onClick = {()=> destroy(user) }>Destroy</button>
    </div>
    ); 
}


export default connect( 
    (state, otherProps) => {
        console.log(otherProps);
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