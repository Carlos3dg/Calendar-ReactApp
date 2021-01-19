import React from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Login from './layout/Login';
import Landing from './layout/Landing';
import PrivateRoute from './Routes/PrivateRoute';
import {connect} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';

const App = ({token}) => {
    return(
        <div className='container'>
            <Header/>
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
                />
                <Route exact path='/' render={() => {
                    if(token) return <Redirect to='/calendar'/>
                    return <Route path='/' component={Landing} />
                }}/>
            </Switch>
        </div>
    );
}

const mapStateToAppProps = (state) => {
    return {
        token: state.fakeToken,
    }
}

export default connect(
    mapStateToAppProps,
    null
)(App);