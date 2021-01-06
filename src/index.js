import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import './styles/styles.css';

//Setup our store with middleware and redux dev tools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(    
    <Provider store={store}>
        <App date={new Date()}/>
    </Provider>,
    document.querySelector('#root')
);