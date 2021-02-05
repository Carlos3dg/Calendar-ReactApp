import React from 'react';
import Page404 from '../layout/Page404';
import { Route, Switch, Redirect } from 'react-router-dom';

const PrivateLogin = ({ component, path, token, setToken }) => {
    return (
        <Route path={path} render={(props) => {
            if (!token) {
                return (
                    <Switch>
                        <Route exact path={path} component={component} />
                        <Route render={() => (
                            <Page404
                                location={props.location.pathname}
                            />
                        )} />
                    </Switch>
                )
            } else {
                return (
                    <Switch>
                        <Route exact path={path} render={() => {
                            return setToken === 'SUCCESS' ? (
                                <Route path={path} component={component} />
                            ) : (
                                    <Redirect
                                        to='/calendar'
                                    />
                                );
                        }} />
                        <Route render={() => (
                            <Page404
                                location={props.location.pathname}
                            />
                        )} />
                    </Switch>
                )
            }
        }} />
    )
};

export default PrivateLogin;