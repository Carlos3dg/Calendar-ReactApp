import React from 'react';

const TaskHeader = (props) => (
    <div>
        <h4>Tasks</h4>
        <h4>{`${props.month+1}/${props.day}/${props.year}`}</h4>
    </div>
);

export default TaskHeader;