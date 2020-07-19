import React from 'react';
import WrappedCalendar from '../Containers/WrappedCalendar';
import time from '../../api/time.json';

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
            startTime: !this.props.task ? {jsTime: '', time: '' } : this.props.task.startTime,
            endTime: !this.props.task ? {jsTime: '', time: ''} : this.props.task.endTime,
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

    getTime() {
        const startHours = new Date().getHours();
        let startMinutes = new Date().getMinutes() / 60;
        if(startMinutes>0.5) {
            startMinutes = Math.ceil(startMinutes);
        } else {
            startMinutes = 0.5;
        }
        let startTime = startHours + startMinutes;
        if(startTime>23.5) startTime=0;
        return startTime; 
    }

    componentDidMount() {
        const jsStartTime = this.getTime();
        //filter time.json api
        const times = time.filter((time) => {
            const jsEndTime = jsStartTime + 0.5;
            if(jsStartTime === time.jsTime || jsEndTime === time.jsTime) {
                return time;
            }
        });
        const task = Object.assign({}, this.state.task);
        task.startTime = times[0];
        task.endTime = times[1];

        this.setState({
            task: task
        });
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
                        <div>
                            <input type='text' value={this.state.task.startTime.time}/>
                            <span> - </span>
                            <input type='text' value={this.state.task.endTime.time}/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default TaskForm;