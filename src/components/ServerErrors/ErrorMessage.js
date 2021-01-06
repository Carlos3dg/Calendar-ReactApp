import React from 'react';

const ErrorMessage = (props) => (
    <div className={`error-message-container ${props.class}`}>
        <span className="material-icons icon icon-error">
            error
        </span>
        <span className='message-text'>{props.text}</span>
    </div>
);

export default ErrorMessage;