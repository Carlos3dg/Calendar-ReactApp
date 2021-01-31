import React from 'react';
import ErrorMessage from '../ServerErrors/ErrorMessage';
import {setTokenRequest} from '../../actions/index';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

class Login extends React.Component {
    state= {
        fields: {
            email: ''
        },
        fieldErrors: {},
        showErrorMessage: false, //In case that our setTokenStatus property is equal to FAILURE, we want to not display the failure message at the first mount.
    }

    closeErrorWarning = (e) => {
        if(e.target.className.match('close-warning')) {
            this.setState({showErrorMessage: false});
        }
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
            showErrorMessage: true, //Just used if the setTokenStatus property is equal to failure, to enable the display message
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
                    <h3 className='title-login-form'>Log in to your account</h3>
                    <div className='login-input-container'>
                        <span>Enter your email address</span>
                        <input type="text" name='email' value={this.state.fields.email} placeholder='example@email.com' onChange={this.onInputChange}/>
                        <span>{this.state.fieldErrors.email}</span>
                    </div>
                    {  
                        {
                            PENDING: (
                                <div className ='loader'></div>
                            ),
                            FAILURE: (
                                this.state.showErrorMessage ? (
                                    <ErrorMessage
                                        closeError={this.closeErrorWarning}
                                        errorMessage='Fail to access token. There was an error when interfacing with the server'
                                    />
                                ) : (
                                    null
                                )
                            ),
                            SUCCESS: (
                                <Redirect
                                    to={this.getPathname()}
                                />
                            )

                        }[this.props.setTokenStatus]
                    }
                    <div className='login-input-container'>
                        <input className='button' type='submit' value='Sign in' disabled={this.props.setTokenStatus === 'PENDING'}/>
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