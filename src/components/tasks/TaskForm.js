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
            repeat: !this.props.task ? 'Does not repeat' : this.props.task.repeat
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
        setTimeout(()=>{
            switch(element) {
                case 'div#calendar': {
                    this.setState({
                        activeElement: element,
                        openCalendar: true
                    });
                    break;
                }
                case 'div#start-select': {
                    this.setState({
                        activeElement: element,
                        displayStart: true
                    });
                    break;
                }
                case 'div#end-select': {
                    this.setState({
                        activeElement: element,
                        displayEnd: true
                    });
                    break;
                }
                case 'div#repeat-select': {
                    this.setState({
                        activeElement: element,
                        displayRepeat: true
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        }, 200);
    }

    closeElement = (element)=>{
        switch(element) {
            case 'div#calendar': {
                this.setState({
                    activeElement: null,
                    openCalendar: false
                });
                break;
            }
            case 'div#start-select': {
                this.setState({
                    activeElement: null,
                    displayStart: false
                });
                break;
            }
            case 'div#end-select': {
                this.setState({
                    activeElement: null,
                    displayEnd: false
                });
                break;
            }
            case 'div#repeat-select': {
                this.setState({
                    activeElement: null,
                    displayRepeat: false
                });
                break;
            }
            default: {
                break;
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

    selectStartTime = (time, element) => {
        this.getStartTimeAndEndTime(time.jsTime);
        this.closeElement(element);
    }

    getStartSelect = () => {
        return(
            <div className='time-select' id='start-select'>
                {
                    time.map((time, index) => (
                        <div className='start-time-option' id={time.jsTime} key={index} onClick={()=>this.selectStartTime(time, 'div#start-select')}>
                            <span>{time.time}</span>
                        </div>
                    ))
                }
            </div>
        )
    }

    selectEndTime = (time, element) => {
        const task = Object.assign({}, this.state.task);
        task.endTime = time;
        this.setState({task: task});
        this.closeElement(element)
    }

    getEndSelect = () => {
        const startTimeIndex = time.findIndex((time) => (
            time === this.state.task.startTime
        ));
        
        const times = time.filter((time, index) => {
            if(index > startTimeIndex){
                return time
            }      
        });

        return(
            <div className='time-select' id='end-select'>
                {   
                    times.map((time, index) => (
                        <div className='end-time-option' id={time.jsTime} key={index} onClick={() => this.selectEndTime(time, 'div#end-select')}>
                            <span>{time.time}</span>
                        </div>
                    ))
                }
            </div>
        )
    }

    getActualDayPosition = () => {
        let indexDay;
        this.props.fullMonth.findIndex((week)=>{
           indexDay = week.week.findIndex((dayInWeek)=>{
                return dayInWeek === this.props.day
           });
           return indexDay !== -1
        });

        return indexDay
    }

    selectRepeatValue = (option, element) => {
        const task = Object.assign({}, this.state.task);
        task.repeat = option;
        this.setState({ task: task});
        this.closeElement(element)
    }

    getRepeatSelect = () => {
        let repeatValues = [
            'Does not repeat',
            'Daily',
            'Weekly',
            'Monthly',
            'Anually'
        ];

        let indexDay = this.getActualDayPosition();
        
        if(indexDay === 0 || indexDay===6) {
            repeatValues.push('Weekends');
        } else {
            repeatValues.push('Every weekday (Monday to Friday)')
        }

        return(
            <div className='repeat-select-options' id='repeat-select'>
                {
                    repeatValues.map((option, index) => (
                        <div className='repeat-option-value' key={index} onClick={() => this.selectRepeatValue(option, 'div#repeat-select')}>
                            <span>{option}</span>
                        </div>
                    ))
                }
            </div>
        )
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

    getStartTimeAndEndTime = (jsStartTime) => {
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

    componentDidMount() {
        const jsStartTime = this.getTime();
        this.getStartTimeAndEndTime(jsStartTime);
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
                            <input type='text' value={this.state.task.startTime.time} onClick={()=>this.openOnClickElement('div#start-select')}/>
                            <span> - </span>
                            <input type='text' value={this.state.task.endTime.time} onClick={()=>this.openOnClickElement('div#end-select')}/>
                        </div>
                        {
                            this.state.displayStart ? this.getStartSelect() : null
                        }
                        {
                            this.state.displayEnd ? this.getEndSelect() : null
                        }
                        <div className='repeat-select'>
                            <div className='selected-value' onClick={()=>this.openOnClickElement('div#repeat-select')}>
                                <span>{this.state.task.repeat}</span>
                                <span className="material-icons">arrow_drop_down</span>
                            </div>
                            {
                                this.state.displayRepeat ? this.getRepeatSelect() : null
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default TaskForm;