import React from 'react';
import Page404 from '../layout/Page404';
import {Route, Switch, Redirect} from 'react-router-dom';

const PrivateCalendar = ({component, path, token}) => {
    return (
        <Route path={path} render={(props) => {
            if(token) {
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
                            pathname: '/login',
                            state: {from: props.location.pathname}
                        }}
                    />
                )
            }
        }} />
    )
};

export default PrivateCalendar;