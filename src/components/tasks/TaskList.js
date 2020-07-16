import React from 'react';
import TaskForm from './TaskForm';

class TaskList extends React.Component {
    state = {
        openTaskForm: false,
    }

    openTaskForm = () => {
        this.setState({openTaskForm: true})
    }

    render() {
        return(
            <div className='task-list-container container-short'>
                <div className='task-list-overflow'>
                </div>
                <div className='task-button-container' onClick={this.openTaskForm}>
                    <span className='button'>
                        <span className="material-icons icon">
                            add
                        </span>
                        Add Task
                    </span>
                </div>
                {
                    this.state.openTaskForm ? <TaskForm
                                                month={this.props.month}
                                                year={this.props.year}
                                                day={this.props.day}
                                                taskList={this.props.taskList}
                                              /> : null
                }
            </div>
        );
    }

}

export default TaskList;