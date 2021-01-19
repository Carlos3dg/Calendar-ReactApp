import React from 'react';
import Page404 from '../layout/Page404';
import {Route, Switch, Redirect} from 'react-router-dom';

const PrivateRoute = ({component, path, token}) => {
    console.log('hi there!');
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