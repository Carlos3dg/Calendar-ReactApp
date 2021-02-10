import React from 'react';

let repeatValues = [
    'Does not repeat',
    'Daily',
    'Weekly',
    'Monthly',
    'Anually',
    'Weekends',
    'Every weekday (Monday to Friday)'

];

class Task extends React.Component {
    state = {
        _repeatValue: 'Does not repeat',
        _openOptionBox: false,
        clickedButton: null,
    }

    onRemoveIconClick = () => {
        const {repeat} = this.props.task;
        if(repeat === this.state._repeatValue) {
            const taskDate = {
                day: this.props.day,
                month: this.props.month,
                year: this.props.year,
            }
            this.props.removeCurrentTask(taskDate, this.props.task)
        } else {
            this.setState({
                _openOptionBox: true,
                clickedButton: 'delete'
            });
        }
    }

    render() {
        return (
            <div className='task-description-container'>
                <div className='dot-container'>
                    <span className='dot-icon' style={this.props.dotLightColor ? {backgroundColor: 'var(--lightblue)'} : null}></span>
                </div>
                <div className='task-details-container'>
                    <h5>{this.props.task.title}</h5>
                    <span>{this.props.task.startTime.time} - {this.props.task.endTime.time}</span>
                    <div className="edit-delete-buttons">
                        <span className="material-icons edit-button">
                            edit
                        </span>
                        <span className="material-icons delete-button" onClick={this.onRemoveIconClick}>
                            delete
                        </span>
                    </div>
                </div>
                {
                    this.state._openOptionBox ? console.log('display Radio Options') : null
                }
            </div>
        )
    }
}

export default Task;