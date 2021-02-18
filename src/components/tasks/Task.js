import React from 'react';
import RadioOption from './RadioOption';

class Task extends React.Component {
    state = {
        _repeatValue: 'Does not repeat',
        _openRadio: false,
        clickedButton: '',
    }

    closeRadioOption = () => {
        this.setState({
            _openRadio: false,
            clickedButton: ''
        })
    }

    onEditIconClick = () => {
        this.setState({
            _openRadio: true,
            clickedButton: 'edit',
        })
    }

    onDeleteFormSubmit = (remove) => {
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
            clickedButton: ''
        });
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
                                onFormSubmit={this.onDeleteFormSubmit}
                                closeForm={this.closeRadioOption}
                            />
                        ) : (
                            console.log('edit radio')
                        )
                    ) : null
                }
            </div>
        )
    }
}

export default Task;