import React from 'react';
import {setTokenRequest} from '../../actions/index';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

class Login extends React.Component {
    state= {
        fields: {
            email: ''
        },
        fieldErrors: {}
    }

    onInputChange = (e) => {
        const fields = Object.assign({}, this.state.fields);
        fields[e.target.name] = e.target.value;
        this.setState({fields});
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate(this.state.fields);
        this.setState({fieldErrors: errors});

        const errorKeys = Object.keys(errors);
        if(errorKeys.length) return;

        const user = this.state.fields.email
        this.setState({
            fields: {
                email: '',
            },
        });
        this.props.setTokenRequest(user);
    }

    validate = ({email}) => {
        const errors = {};
        if(!email) errors.email = '*Email required'
        if(email && !isEmail(email)) errors.email = '*Please enter a valid email';
        return errors;
    }

    getPathname = () => {
        const stateLocation = this.props.location.state;
        //console.log(stateLocation);
        if(stateLocation) return stateLocation.from;
        return '/calendar'
    }

    render() {

        return(
            <div className='login-container'>
                <form className='login-form' onSubmit={this.onFormSubmit}>
                    <h3>Log in to your account</h3>
                    <div>
                        <span>Enter your email address</span>
                        <input type="text" name='email' value={this.state.fields.email} placeholder='example@email.com' onChange={this.onInputChange}/>
                        <span>{this.state.fieldErrors.email}</span>
                    </div>
                    {  
                        {
                            PENDING: (
                            <span>Loading...</span>
                            ),
                            FAILURE: (
                                <span>Fail to get token</span>
                            ),
                            SUCCESS: (
                                <Redirect
                                    to={this.getPathname()}
                                />
                            )

                        }[this.props.setTokenStatus]
                    }
                    <div>
                        <button className='button' type='submit' disabled={this.props.setTokenStatus === 'PENDING'}>Sign in</button>
                    </div>
                </form>
            </div>
            
        )
    }
}

const mapStateToLoginProps = (state) => {
    return {
        setTokenStatus : state.appStatus.setToken,
    }
}

const mapDispatchToLoginProps = (dispatch) => {
    return {
        setTokenRequest: (user) => dispatch(setTokenRequest(user)),
    }
}

export default connect(
    mapStateToLoginProps,
    mapDispatchToLoginProps
)(Login);