import React from 'react';
import WrappedCalendar from '../Containers/WrappedCalendar';

const startHour = new Date().getHours();
const startMinutes = new Date().getMinutes / 60;
const startTime = startHour + startMinutes;

class TaskForm extends React.Component {
    state={
        activeElement: null,
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

    static getDerivedStateFromProps(nextProps, state) {
        return {
            task: {
                ...state.task,
                month: nextProps.month,
                day: nextProps.day,
                year: nextProps.year
            }
        }
    };


    openOnClickElement = (element)=> {
        switch(element) {
            case 'div#calendar': {
                this.setState({
                    activeElement: element,
                    openCalendar: true
                });
            }
        }
    }

    closeElement = (element)=>{
        switch(element) {
            case 'div#calendar': {
                this.setState({
                    activeElement: null,
                    openCalendar: false
                });
            }
        }
    }

    hideOnClickOutside = (e, activeElement) => {
        const target = e.target.closest(activeElement);
        if(!target) {
            this.closeElement(activeElement);
        }
            
    }

    closeTaskForm = (e) => {
        if(e.target.className.match('close-taskform')) {
            this.props.closeTaskForm();
        }
    }

    render() {
        return (
            <div className='close-taskform popup-container' onClick={this.closeTaskForm}>
                <div className='taskform-container' onClick={(e)=>this.hideOnClickOutside(e, this.state.activeElement)}>
                    <form className='taskform'>
                        <span className="close-taskform material-icons close-icon">
                            close
                        </span>
                        <div>
                            <input type='text' placeholder='Add Title' value={this.state.task.title}/>
                        </div>
                        <div>
                            <input type='text' value={`${this.state.task.month + 1}/${this.state.task.day}/${this.state.task.year}`} onClick={()=>this.openOnClickElement('div#calendar')}/>
                        </div>
                        {
                            this.state.openCalendar 
                            ? <div className='min-calendar-container' id='calendar'>
                                <WrappedCalendar 
                                    date={new Date()} 
                                    mincalendar={true}
                                    selectedDay={this.state.task.day} 
                                    closeCalendar={this.closeElement}
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