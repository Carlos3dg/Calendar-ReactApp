import React from 'react';
import RadioOption from './RadioOption';
import TaskForm from './TaskForm';
import {connect} from 'react-redux';
import {
    removeCurrentTaskRequest,
    removeFollowTasksRequest,
    removeAllTasksRequest,
    editCurrentTask,
    editFollowTasks,
    editAllTasks,
    jumpDate,
} from '../../actions/index';

class Task extends React.Component {
    state = {
        _repeatValue: 'Does not repeat',
        _openRadio: false,
        clickedButton: '',
        _openTaskForm: false,
        editedTask: null,
    }

    closeRadioOption = () => {
        this.setState({
            _openRadio: false,
            clickedButton: ''
        })
    }

    closeTaskForm = () => {
        this.setState({
            _openTaskForm: false
        })
    }

    onEditOptionSubmit = (edit) => {
        switch(edit) {
            case 'thisTask': {
                this.props.editCurrentTask(this.state.editedTask, this.props.task);
                //Update our main calendar with the selected dates values
                this.props.jumpDate(this.props.month, this.props.year, this.props.day);
                break;
            }
            case 'followTasks': {
                this.props.editFollowTasks(this.state.editedTask, this.props.task);
                this.props.jumpDate(this.props.month, this.props.year, this.props.day);
                break;
            }
            case 'allTasks': {
                this.props.editAllTasks(this.state.editedTask, this.props.task);
                this.props.jumpDate(this.props.month, this.props.year, this.props.day);
                break;
            }
            default: {
                break;
            }
        }
        //Close radio option
        this.setState({
            _openRadio: false,
            clickedButton: '',
        });
    }

    onEditFormSubmit = (editedTask) => {
        const { repeat } = this.props.task;
        if (repeat === this.state._repeatValue) {
            this.props.editCurrentTask(editedTask, this.props.task);
        } else {
            this.setState({
                _openRadio: true,
                clickedButton: 'edit',
                editedTask,
            });
        }  
    }

    onEditIconClick = () => {
        this.setState({
            _openTaskForm: true,
        })
    }

    onDeleteOptionSubmit = (remove) => {
        switch(remove) {
            case 'thisTask': {
                this.props.removeCurrentTask(this.props.task);
                break;
            }
            case 'followTasks': {
                this.props.removeFollowTasks(this.props.task);
                break;
            }
            case 'allTasks': {
                this.props.removeAllTasks(this.props.task)
                break;
            }
            default: {
                break;
            }
        }
        //Close radio option
        this.setState({
            _openRadio: false,
            clickedButton: '',
        });
        //To change the error message state to true in TaskList component
        this.props.onDeleteSubmit();
    }

    onDeleteIconClick = () => {
        const { repeat } = this.props.task;
        if (repeat === this.state._repeatValue) {
            this.props.removeCurrentTask(this.props.task);
        } else {
            this.setState({
                _openRadio: true,
                clickedButton: 'delete'
            });
        }
    }

    render() {
        return (
            <div className='task-description-container'>
                <div className='dot-container'>
                    <span className='dot-icon' style={this.props.dotLightColor ? { backgroundColor: 'var(--lightblue)' } : null}></span>
                </div>
                <div className='task-details-container'>
                    <h5>{this.props.task.title}</h5>
                    <span>{this.props.task.startTime.time} - {this.props.task.endTime.time}</span>
                    <div className="edit-delete-buttons">
                        <span className="material-icons edit-button" onClick={this.onEditIconClick}>
                            edit
                        </span>
                        <span className="material-icons delete-button" onClick={this.onDeleteIconClick}>
                            delete
                        </span>
                    </div>
                </div>
                {
                    this.state._openRadio ? (
                        this.state.clickedButton === 'delete' ? (
                            <RadioOption
                                onFormSubmit={this.onDeleteOptionSubmit}
                                closeForm={this.closeRadioOption}
                                action={this.state.clickedButton}
                            />
                        ) : (
                            <RadioOption
                                onFormSubmit={this.onEditOptionSubmit}
                                closeForm={this.closeRadioOption}
                                action={this.state.clickedButton}
                            />
                        )
                    ) : null
                }
                {
                    this.state._openTaskForm ? (
                        <TaskForm
                            month={this.props.month}
                            year={this.props.year}
                            day={this.props.day}
                            fullMonth={this.props.fullMonth} 
                            task={this.props.task}
                            closeTaskForm={this.closeTaskForm}
                            editTask={this.onEditFormSubmit}
                            jumpDate={this.props.jumpDate}
                        />
                    ) : null
                }
            </div>
        )
    }
}

const mapStateToTaskProps = (state, ownProps) => {
    const {currentYear, currentMonth, currentDay, fullMonth} = state.date.smallCalendar;

    return {
        ...ownProps,
        day: currentDay,
        month: currentMonth,
        year: currentYear,
        fullMonth: fullMonth,
    }
}

const mapDispatchToTaskProps = (dispatch) => {
    return {
        removeCurrentTask: (task) => dispatch(removeCurrentTaskRequest(task)),
        removeFollowTasks: (task) => dispatch(removeFollowTasksRequest(task)),
        removeAllTasks: (task) => dispatch(removeAllTasksRequest(task)),
        editCurrentTask: (editedTask, oldTask) => dispatch(editCurrentTask(editedTask, oldTask)),
        editFollowTasks: (editedTask, oldTask) => dispatch(editFollowTasks(editedTask, oldTask)),
        editAllTasks: (editedTask, oldTask) => dispatch(editAllTasks(editedTask, oldTask)),
        jumpDate: (month, year, day)=>dispatch(jumpDate(month, year, day)),
    }
};

export default connect(
    mapStateToTaskProps,
    mapDispatchToTaskProps,
)(Task);