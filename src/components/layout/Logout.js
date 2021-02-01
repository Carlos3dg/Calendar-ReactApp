import React from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends React.Component {

    componentDidMount() {
        this.props.removeToken()
    }

    render() {
        if(!this.props.token) {
            return <Redirect
                to='/'
            />
        } else {
            return null
        }
    }
}

export default Logout;