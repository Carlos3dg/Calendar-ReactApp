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
            month={props.month}
            year={props.year}
            day={props.day}
            fullMonth={props.fullMonth}
            taskList={props.taskList}
            saveTask={props.saveTask}
            removeCurrentTask={props.removeCurrentTask}
            removeFollowTasks={props.removeFollowTasks}
            removeAllTasks={props.removeAllTasks}
            removeStatus={props.removeStatus}
            taskStatus={props.taskStatus}
        />
    </aside>
);

export default Tasks;