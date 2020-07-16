import React from 'react';

const startHour = new Date().getHours();
const startMinutes = new Date().getMinutes / 60;
const startTime = startHour + startMinutes;

class TaskForm extends React.Component {
    state={
        openCalendar: false,
        displayStart: false,
        displayEnd: false,
        displayRepeat: false,
        fieldErrors: {},
        task: {
            title: !this.props.task ? '' : this.props.task.title, 
            month: this.props.month,
            day: this.props.day,
            year: this.props.year,
            startHour: !this.props.task ? '' : this.props.task.title,
            endHour: !this.props.task ? '' : this.props.task.title,
            repeat: !this.props.task ? '' : this.props.task.title
        }
    }

    render() {
        return (
            <div className='popup-container'>
                <div className='taskform-container'>
                    <form>
                        <div>
                            <input type='text' placeholder='Add Title' value={this.state.task.title}/>
                        </div>
                        <div>
                            <input type='text' value={`${this.state.task.month}/${this.state.task.day}/${this.state.task.year}`}/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default TaskForm;