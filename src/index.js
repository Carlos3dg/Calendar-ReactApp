import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import reducer from './reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './styles/styles.css';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(    
    <Provider store={store}>
        <App date={new Date()}/>
    </Provider>,
    document.querySelector('#root')
);