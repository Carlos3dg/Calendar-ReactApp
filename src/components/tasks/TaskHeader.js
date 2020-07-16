import React from 'react';

const TaskHeader = (props) => (
    <div className='task-header container-short'>
        <h4>Tasks</h4>
        <h5>{`${props.month+1}/${props.day}/${props.year}`}</h5>
    </div>
);

export default TaskHeader;