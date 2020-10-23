import React from 'react';

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
                      this.props.fullMonth === null ? null : this.props.fullMonth.map((week, index) => (
                        <tr key={index}>
                            {
                                week.week.map((day, index) => {
                                    //Variable to compare every date in a month with the selected day state value and the actual day value
                                    const date = `${this.props.year}-${this.props.month}-${day}`;
                                    return(
                                        <td key={index} className={this.state.selectedDay === date ? 'active-day' : null} onClick={()=>this.onClickDay(day)}>
                                            <div className='day-box'>
                                                <span 
                                                    className={date===this.getActualDay() ? 'today' : null} 
                                                    style={this.props.mincalendar ? {width: '40%', marginRight: '60%'} : null}
                                                >
                                                    {day}
                                                </span>
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