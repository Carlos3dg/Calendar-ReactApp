import React from 'react';
import WrappedCalendar from '../Containers/WrappedCalendar';

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
            startHour: !this.props.task ? '' : this.props.task.startHour,
            endHour: !this.props.task ? '' : this.props.task.endHour,
            repeat: !this.props.task ? '' : this.props.task.repear
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            task: {
                month: nextProps.month,
                day: nextProps.day,
                year: nextProps.year
            }
        }
    };


    onClickDateInput = ()=> {
        this.setState({openCalendar: true});
    }

    closeCalendar = ()=>{
        this.setState({openCalendar: false});
    }

    render() {
        console.log(this.state.task)
        return (
            <div className='popup-container'>
                <div className='taskform-container'>
                    <form className='taskform'>
                        <div>
                            <input type='text' placeholder='Add Title' value={this.state.task.title}/>
                        </div>
                        <div>
                            <input type='text' value={`${this.state.task.month}/${this.state.task.day}/${this.state.task.year}`} onClick={this.onClickDateInput}/>
                        </div>
                        {
                            this.state.openCalendar 
                            ? <div className='min-calendar-container'>
                                <WrappedCalendar 
                                    date={new Date()} 
                                    mincalendar={true} 
                                    closeCalendar={this.closeCalendar}
                                />
                              </div> 
                            : null
                        }
                    </form>
                </div>
            </div>
        )
    }
};

export default TaskForm;