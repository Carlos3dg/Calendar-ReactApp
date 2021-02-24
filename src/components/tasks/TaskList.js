import React from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import TaskStatus from './TaskStatus';

class TaskList extends React.Component {
    state = {
        openTaskForm: false,
        task: null,
        //If the status of saving, removing or editing is failure, we use these properties to show an error message
        showErrorMessage: {
            saveTask: false,
            removeTask: false,
            editTask: false
        },
        errorMessage: {
            saveTask: 'Failed to save task: server is not working. Please save again or try it later.',
            removeTask: 'Failed to delete task: server is not working. Please delete again or try it later.',
            editTask: 'Failed to update task: server is not working. Please update again or try it later.',
        }
    }
    
    openTaskForm = () => {
        this.setState({
            openTaskForm: true, 
            task: null
        })
    }
    //When a task is saved or when the form is just close without being saved:
    closeTaskForm = (task)=> {
        const showErrorMessage = Object.assign({}, this.state.showErrorMessage);
        showErrorMessage.saveTask = !task ? false : true;
        this.setState({
            openTaskForm: false,
            task: task,
            showErrorMessage,
        })
    }
    //When the errorWarning is closed inside TaskStatus component:
    closeSaveErrorWarning = (e) => {
        this.setState({
            openTaskForm: true,
            showErrorMessage: {
                ...this.state.showErrorMessage,
                saveTask: false,
            }
        });
    }
    //When a task is removed:
    onDeleteSubmit = () => {
        this.setState({
            showErrorMessage: {
                ...this.state.showErrorMessage,
                removeTask: true, //Show error just in case that the remove status fail
            }
        });  
    }
    //When the errorWarning is closed inside TaskStatus component:
    closeRemoveErrorWarning = () => {
        this.setState({
            showErrorMessage: {
                ...this.state.showErrorMessage,
                removeTask: false, //Close error message to avoid show it.
            }
        }); 
    }

    render() {
        //Variables used in TaskForm component
        const {currentYear, currentMonth, currentDay, fullMonth} = this.props.smallCalendar
        return(
            <div className='task-list-container container-short'>
                <div className='task-list-overflow'>
                    {
                        !this.props.taskList.length ? null : this.props.taskList.map((task, index) => (
                            //Determine if the task has a mod different from 0 to add a different dot color
                            index%2 !== 0 ? (
                                <Task
                                    task={task} 
                                    key={task.id}
                                    onDeleteSubmit={this.onDeleteSubmit}
                                    dotLightColor={true}
                                />
                            ) : (
                                    <Task
                                        task={task}
                                        onDeleteSubmit={this.onDeleteSubmit}
                                        key={task.id}
                                    />
                                )
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
                                                month={currentMonth}
                                                year={currentYear}
                                                day={currentDay}
                                                fullMonth={fullMonth}
                                                closeTaskForm={this.closeTaskForm}
                                                saveTask={this.props.saveTask}
                                                jumpDate={this.props.jumpDate}
                                                task= {this.state.task}
                                              /> : null
                }
                {/* When task is saved */}
                <TaskStatus
                    showError={this.state.showErrorMessage.saveTask}
                    closeError={this.closeSaveErrorWarning}
                    errorMessage={this.state.errorMessage.saveTask}
                    status={this.props.taskStatus}
                />

                {/* When task is removed */}
                <TaskStatus
                    showError={this.state.showErrorMessage.removeTask}
                    closeError={this.closeRemoveErrorWarning}
                    errorMessage={this.state.errorMessage.removeTask}
                    status={this.props.removeStatus}
                />
            </div>
        );
    }

}

export default TaskList;