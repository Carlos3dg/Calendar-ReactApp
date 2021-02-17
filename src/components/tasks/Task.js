import React from 'react';
import RadioOption from './RadioOption';

class Task extends React.Component {
    state = {
        _repeatValue: 'Does not repeat',
        _openRadio: null,
        clickedButton: '',
    }

    onEditIconClick = () => {
        this.setState({
            _openRadio: true,
            clickedButton: 'edit',
        })
    }

    onRemoveIconClick = () => {
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
                        <span className="material-icons delete-button" onClick={this.onRemoveIconClick}>
                            delete
                        </span>
                    </div>
                </div>
                {
                    this.state._openRadio ? (
                        this.state.clickedButton === 'delete' ? (
                            <RadioOption/>
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