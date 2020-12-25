import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from './store';


class Update extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.id ? this.props.user.name : '',
            error: ''
        };
        //console.log(this.props.user);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    componentDidUpdate(prevProps){
        if(!prevProps.user.id && this.props.user.id){
            this.setState({ name: this.props.user.name });
        }
        //console.log(this.props);
    }
    async onSave(ev){
        ev.preventDefault();
        try{
            await this.props.update(this.props.user.id, this.state.name);
        }
        catch(ex){
            console.log(ex);
            this.setState({ error: ex.response.data.error});
        }
    }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    render(){
        const { name, error } = this.state;
        //using a methid on another method i think
        const { onChange, onSave } = this;
        return (
            <form onSubmit = { onSave }>
                <pre>
                {
                    !!error && JSON.stringify(error, null, 2)
                }
                </pre>
                <input name='name' value={ name } onChange = { onChange }/>
                <button>Save</button>
            </form>
        ) 
    }
}

export default connect(
    (state, otherProps) => {
        //console.log(otherProps);
        const user = state.users.find(user => user.id === otherProps.match.params.id*1) || {};
        return {
            user
        };
    },
    (dispatch, { history })=>{
        return {
            update: (id, name)=> dispatch(updateUser(id, name, history))

        }
    }
)(Update);