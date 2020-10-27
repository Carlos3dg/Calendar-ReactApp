import React from 'react';

class Task extends React.Component {
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
                        <span className="material-icons delete-button">
                            delete
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;