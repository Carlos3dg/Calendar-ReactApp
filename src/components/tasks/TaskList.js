import React from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import ErrorMessage from '../ServerErrors/ErrorMessage';

class TaskList extends React.Component {
    state = {
        openTaskForm: false,
        task: null,
        showErrorMessage: false,
    }

    openTaskForm = () => {
        this.setState({
            openTaskForm: true, 
            task: null
        })
    }

    closeTaskForm = (task)=> {
        const showErrorMessage = !task ? false : true;
        this.setState({
            openTaskForm: false,
            task: task,
            showErrorMessage,
        })
    }

    editTaskForm = (task) => {
        this.setState({
            openTaskForm: true,
            task: task,
        });
    }

    closeErrorWarning = (e) => {
        if(e.target.className.match('close-warning')) {
            this.setState({
                openTaskForm: true,
                showErrorMessage: false
            });
        }
    }

    render() {
        return(
            <div className='task-list-container container-short'>
                <div className='task-list-overflow'>
                    {
                        !this.props.taskList ? null : this.props.taskList.map((task, index) => (
                            //Determine if the task has a mod different from 0 to add a different dot color
                            index%2 !== 0 ? <Task task={task} key={task.id} dotLightColor={true} />
                                : <Task task={task} key={task.id} />
                        ))
                    }
                </div>
                <div className='task-button-container' onClick={this.openTaskForm}>
                    <span className='button-task button'>
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
                                                fullMonth={this.props.fullMonth}
                                                closeTaskForm={this.closeTaskForm}
                                                saveTask={this.props.saveTask}
                                                task= {this.state.task}
                                              /> : null
                }
                {
                    {
                        PENDING: (
                            <div className="spinner popup-container">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div> 
                        ),
                        SUCCESS: null,
                        FAILURE: (
                            this.state.showErrorMessage ? (
                                <ErrorMessage
                                    closeError={this.closeErrorWarning}
                                    errorMessage={`Failed to save task: server is not working. Please save again or try it later.`}
                                />
                            ) : (
                                null
                            )
                        )
                    }[this.props.taskStatus]
                }
            </div>
        );
    }

}

export default TaskList;