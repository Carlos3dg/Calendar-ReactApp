import React from 'react';

const ErrorMessage = (props) => (
    <div className='close-warning popup-container' onClick={props.closeError}>
    <div className='warning-container'>
        <span className="close-warning material-icons close-icon">
            close
        </span>
        <div className='warning-message-container'>
            <span className="material-icons icon icon-error">
                error
            </span>
            <span className='warning-text'>
                {props.errorMessage}    
            </span>                                        
        </div>
        <span className='close-warning warning-button button'>
            Accept
        </span>
    </div>
</div>
);

export default ErrorMessage;