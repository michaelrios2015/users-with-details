import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from './store';


class Create extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            error: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    async onSave(ev){
        ev.preventDefault();
        try{
            await this.props.create(this.state.name);
        }
        catch(ex){
            this.setState({ error: ex.response.data.error.errors[0].message});
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
    null,
    (dispatch, { history })=>{
        return {
            create: (name)=> dispatch(createUser(name, history))

        }
    }
)(Create);