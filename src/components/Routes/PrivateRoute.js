import React from 'react';
import Page404 from '../layout/Page404';
import {Route, Switch, Redirect} from 'react-router-dom';

const PrivateRoute = ({component, path, token, setToken}) => {
    let condition;
    let redirectTo;
    if(path === '/calendar') {
        condition = token
        redirectTo = '/login'
    } else {
        condition = !token
        redirectTo='/calendar'
    }

    return (
        <Route path={path} render={(props) => {
            if(condition) {
                return (
                    <Switch>
                        <Route exact path={path} component={component}/>
                        <Route render={() => (
                            <Page404
                                location={props.location.pathname}
                                correctLocation={path}
                            />
                        )}/>
                    </Switch>
                )
            } else {
                if(setToken) {
                    return setToken === 'SUCCESS' ? ( //Remember to remove setToken property in reducer when the user log out
                        <Route exact path={path} component={component}/>
                    ) : (
                        <Redirect 
                            to={{
                                pathname: redirectTo,
                                state: {from: props.location.pathname}
                            }}
                    />
                    )
                }
                return (
                    <Redirect 
                        to={{
                            pathname: redirectTo,
                            state: {from: props.location.pathname}
                        }}
                    />
                )
            }
        }} />
    )
};

export default PrivateRoute;