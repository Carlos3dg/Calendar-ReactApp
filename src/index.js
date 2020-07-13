import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import reducer from './reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './styles/styles.css';

const store = createStore(reducer);

ReactDOM.render(    
    <Provider store={store}>
        <App date={new Date()}/>
    </Provider>,
    document.querySelector('#root')
);