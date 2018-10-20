import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        contacts: [
            {
                id: 1,
                name: "Jo Do",
                email: "jdo@gmail.com",
                phone: "111 111 111"
            },
            {
                id: 2,
                name: "Tom Do",
                email: "tomdo@gmail.com",
                phone: "222 222 222"
            },
            {
                id: 3,
                name: "Terry Do",
                email: "terrydo@gmail.com",
                phone: "333 333 333"
            }
        ],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }

    async componentDidMount() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.setState({ contacts: res.data })
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    };
};

export const Consumer = Context.Consumer;