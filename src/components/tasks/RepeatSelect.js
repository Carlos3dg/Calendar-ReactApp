import React from 'react';

const RepeatSelect = (props) => (
    <div className='repeat-select-options' id='repeat-select'>
    {
        props.repeatValues.map((option, index) => (
            <div className='repeat-option-value' key={index} onClick={() => props.selectRepeatValue(option, 'div#repeat-select')}>
                <span>{option}</span>
            </div>
        ))
    }
    </div>
);

export default RepeatSelect;