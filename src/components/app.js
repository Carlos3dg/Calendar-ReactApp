import React from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Login from './layout/Login';
import ErrorMessage from './ServerErrors/ErrorMessage';
import Landing from './layout/Landing';
import PrivateRoute from './Routes/PrivateRoute';
import {fetchTokenRequest, removeToken} from '../actions/index';
import {connect} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';

class App extends React.Component {
    state = {
        showMessage: true,
    }
    //Change this to a state
    closeErrorWarning = (e) => {
        if(e.target.className.match('close-warning')) {
            this.setState({showMessage: false});
        }
    }

    getHeader = (token) => (
        <Header
            token={token}
            removeToken={this.props.removeToken}
        />
    )

    getRoutes = (token) => {
        return(
            <Switch>
                <PrivateRoute
                    path='/calendar'
                    component={Main}
                    token={token}
                />
                <PrivateRoute
                    path='/login'
                    component={Login}
                    token={token}
                    setToken={this.props.setTokenStatus}
                />
                <Route exact path='/' render={() => {
                    if(token) return <Redirect to='/calendar'/>
                    return <Route path='/' component={Landing} />
                }}/>
            </Switch>
        )
    }


    componentDidMount() {
        this.props.fetchTokenRequest();
    }

    render() {
        const {token} = this.props;
        return(((tokenStatus) => {
            if(tokenStatus === 'PENDING') {
                return (
                    <div style={{width: '100vw', height: '100vh', backgroundColor: 'white'}}></div>
                )
            } else if(tokenStatus === 'FAILURE') {
                return(
                    <div className='container'>
                        {
                            this.state.showMessage ? (
                                <ErrorMessage
                                    closeError={this.closeErrorWarning}
                                    errorMessage='400: Bad Request. Token could not be verified, the site is going to be only in read mode.'
                                />
                            ) : (
                                null
                            )
                        }
                        {this.getHeader(token)}
                        {this.getRoutes(token)}
                    </div> 
                )
            } else if(tokenStatus === 'SUCCESS') {
                return (
                    <div className='container'>
                        {this.getHeader(token)}
                        {this.getRoutes(token)}
                    </div> 
                )
            } else {
                return null
            }
          })(this.props.tokenStatus)
        );
    }
}

const mapStateToAppProps = (state) => {
    return {
        token: state.fakeToken,
        tokenStatus: state.appStatus.loadToken,
        setTokenStatus : state.appStatus.setToken
    }
}

const mapDispatchToAppProps = (dispatch) => {
    return {
        fetchTokenRequest: () => dispatch(fetchTokenRequest()),
        removeToken: () => dispatch(removeToken()),
    }
}

export default connect(
    mapStateToAppProps,
    mapDispatchToAppProps
)(App);