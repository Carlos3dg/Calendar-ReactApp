import React from 'react';

class Task extends React.Component {
    render() {
        return (
            <div>
                <h4>{this.props.task.title}</h4>
                <span>{this.props.task.startTime.time} - {this.props.task.endTime.time}</span>
            </div>
        )
    }
}

export default Task;