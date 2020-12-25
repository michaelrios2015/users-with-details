import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD = 'LOAD';
const CREATE = 'CREATE';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';


//reducer
const usersReducer = (state = [], action)=> {
    if(action.type === LOAD){
        state = action.users;
    }
    if(action.type === CREATE){
        state = [...state, action.user];
    }
    if(action.type === DELETE){
        state = state.filter(user => user.id !== action.user.id);
    }
    if(action.type === UPDATE){
        state = state.map(user => user.id !== action.user.id ? user : action.user);
    }
    return state;
}

//combined reducer
const reducer = combineReducers({
    users: usersReducer
});

//thingy that talks to reducer
const _loadUsers = users => ({ type: LOAD, users });

//thingy that gets called in index
const loadUsers = ()=>{
    return async(dispatch)=> {
        const users = (await axios.get('/api/users')).data;
        dispatch(_loadUsers(users));
    };
};

const _createUser = user => ({ type: CREATE, user });

const createUser = (name, history)=>{
    return async(dispatch)=> {
        const user = (await axios.post('/api/users', { name })).data;
        dispatch(_createUser(user));
        //history is from other props..... not realy sure how this is working
        //I think i get it
        history.push(`/users/${user.id}`);
    };
};

const _destroyUser = user => ({ type: DELETE, user });

const destroyUser = (user, history)=>{
    return async(dispatch)=> {
        await axios.delete(`/api/users/${user.id}`);
        dispatch(_destroyUser(user));
        history.push(`/users`);
    };
};

const _updateUser = user => ({ type: UPDATE, user });

const updateUser = (id, name, history)=>{
    return async(dispatch)=> {
        const user = (await axios.put(`/api/users/${id}`, { name })).data;
        dispatch(_updateUser(user));
        history.push(`/users`);
    };
};


//making store
const store = createStore(reducer, applyMiddleware(thunk));

//exporting
export default store;
export { loadUsers, createUser, destroyUser, updateUser };