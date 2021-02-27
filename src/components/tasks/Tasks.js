import React from 'react';
import TaskHeader from './TaskHeader';
import TaskList from './TaskList';

const Tasks = (props) => (
    <aside className='task-container'>
        <TaskHeader
            month={props.month}
            year={props.year}
            day={props.day}
        />
        <TaskList
            smallCalendar={props.smallCalendar}
            taskList={props.taskList}
            saveTask={props.saveTask}
            jumpDate={props.jumpDate}
            removeStatus={props.removeStatus}
            editStatus={props.editStatus}
            taskStatus={props.taskStatus}
        />
    </aside>
);

export default Tasks;