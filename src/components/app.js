import React from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Login from './layout/Login';
import Logout from './layout/Logout';
import ErrorMessage from './ServerErrors/ErrorMessage';
import Landing from './layout/Landing';
import Page404 from './layout/Page404';
import PrivateLogin from './Routes/PrivateLogin';
import PrivateCalendar from './Routes/PrivateCalendar';
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

    getHeader = (token, user) => (
        <Header
            token={token}
            user={user}
        />
    )

    getRoutes = (token) => {
        return(
            <Switch>
                <PrivateCalendar
                    path='/calendar'
                    component={Main}
                    token={token}
                />
                <PrivateLogin
                    path='/login'
                    component={Login}
                    token={token}
                    setToken={this.props.setTokenStatus}
                />
                <Route exact path='/logout' render={() => (
                    <Logout
                        token={token}
                        removeToken={this.props.removeToken}
                    />
                )}/>
                <Route exact path='/' render={() => {
                    if(token) return <Redirect to='/calendar'/>
                    return <Route path='/' component={Landing} />
                }}/>
                <Route render={(props) => (
                    <Page404
                        location={props.location.pathname}
                    />
                )}/>
            </Switch>
        )
    }


    componentDidMount() {
        this.props.fetchTokenRequest();
    }

    render() {
        const {token, user} = this.props;
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
                        {this.getHeader(token, user)}
                        {this.getRoutes(token)}
                    </div> 
                )
            } else if(tokenStatus === 'SUCCESS') {
                return (
                    <div className='container'>
                        {this.getHeader(token, user)}
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
        user: state.user,
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