import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(    
    <App date={new Date()}/>,
    document.querySelector('#root')
);