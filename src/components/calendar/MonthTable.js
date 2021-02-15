import React from 'react';
import MonthDayTask from './MonthDayTask';

class MonthTable extends React.Component {
    state = {
        selectedDay: null,
    }
    //Select a day in the month and change the state value according with that day
    onClickDay = (day) => {
        if(day) {
            const selectedDay = `${this.props.year}-${this.props.month}-${day}`;
            this.setState({
                selectedDay: selectedDay
            });
            this.props.selectDay(day); //Call dispatch function passing the selected day to the SELECT_DAY action and then invoke reducer with that action as an argument 
            if(this.props.mincalendar) {
                setTimeout(()=>{
                    this.props.closeCalendar('div#calendar')
                }, 300);
            }
        }
    }

    getActualDay = () => {
        //props.date is just the Date javascript object
        const actualYear = this.props.date.getFullYear();
        const actualMonth = this.props.date.getMonth();
        const actualDay = this.props.date.getDate();
        return `${actualYear}-${actualMonth}-${actualDay}`
    }

    //Function to know the number of tasks and according to that number determine if they can display inside day-box or they can just display the first one and the rest put it as a '+' icon
    getTasksInDay = (tasks) => {
        if(tasks.length < 3) {
            return tasks.map((task, index) => (
                <MonthDayTask
                    task={task}
                    index={index}
                    key={task.id}
                />
            ))
        } else {
            return(
                [
                    <MonthDayTask
                        task={tasks[0]}
                        index={0}
                        key={0}
                    />,
                    <MonthDayTask
                        task={tasks[1]}
                        index={1}
                        key={1}
                    />,
                    <span className='plus-remaining-tasks' key={2}>+ {tasks.length - 2}</span>
                ]
            )
            
        }
    }

    componentDidMount() {
        const actualDay = this.getActualDay();
        //Condition to open the mini calendar with the selected day active and not with the actual day as Calendar component does
        if(!this.props.mincalendar) {
            this.props.selectDay(this.props.date.getDate());
            this.setState({
                selectedDay: actualDay
            });
        } else {
            this.setState({
                selectedDay: `${this.props.year}-${this.props.month}-${this.props.selectedDay}`
            })
        }
    }

    render() {
        return(
            <table className='container-short calendar-table' style={this.props.mincalendar ? {height: '86%', fontSize: '10px'} : null}>
                <colgroup>
                    <col className='days-col'/>
                    <col className='days-col'/>
                    <col className='days-col'/>
                    <col className='days-col'/>
                    <col className='days-col'/>
                    <col className='days-col'/>
                    <col className='days-col'/>
                </colgroup>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                   {
                      this.props.fullMonth === null ? null : this.props.fullMonth.map((week, index, array) => (
                        <tr key={index} style={{height: `${100/array.length}%`}}> 
                            {
                                week.week.map((day, index) => {
                                    let taskList = []; //tasks in a day
                                    let orderTasks = []
                                    //If we have tasks in the month, we proceed to get the tasks of the day that we are iterating
                                    if(this.props.tasksInMonth.length) {
                                        this.props.tasksInMonth.forEach((task) => {
                                            const itemInDay = task.items.find((item, index, arr) => {
                                                return item.day === day
                                            })

                                            if(itemInDay) {
                                                const taskInDay = {
                                                    ...itemInDay,
                                                    id: task.id
                                                }

                                                taskList = [...taskList, taskInDay];
                                            }
                                        })
                                        if(taskList.length) {
                                            //Order tasks by hour
                                            let aux;
                                            for(let i=0; i<taskList.length; i++) {
                                                for(let j=i+1; j<taskList.length; j++) {
                                                    if(taskList[i].startTime.jsTime >= taskList[j].startTime.jsTime) {
                                                        aux = taskList[i];
                                                        taskList[i] = taskList[j];
                                                        taskList[j] = aux;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    //Variable to compare every date in a month with the selected day state value and the actual day value
                                    const date = `${this.props.year}-${this.props.month}-${day}`;
                                    return(
                                        <td key={index} className={this.state.selectedDay === date ? 'active-day' : null} onClick={()=>this.onClickDay(day)}>
                                            <div className='day-box'>
                                                <span 
                                                    className={`day-num ${date===this.getActualDay() ? 'today' : ''}`} 
                                                    style={this.props.mincalendar ? {width: '40%', marginRight: '60%'} : null}
                                                >
                                                    {day}
                                                </span>
                                                {//If we don't have any task in the day that we are iterating, we return nothing, if we not we call a function
                                                    !taskList.length ? null : this.getTasksInDay(taskList)
                                                }
                                            </div>
                                        </td>
                                    )}
                                )
                            }
                        </tr>
                   ))
                }
                </tbody>
            </table>
        );
    }
}
export default MonthTable;