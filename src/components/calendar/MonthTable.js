import React from 'react';

class MonthTable extends React.Component {
    state = {
        selectedDay: null,
    }

    onClickDay = (day) => {
        if(day) {
            const selectedDay = `${this.props.year}-${this.props.month}-${day}`;
            this.setState({
                selectedDay: selectedDay
            });
            this.props.selectDay(day);
            if(this.props.mincalendar) this.props.closeCalendar()
        }
    }

    getActualDay = () => {
        const actualYear = this.props.date.getFullYear();
        const actualMonth = this.props.date.getMonth();
        const actualDay = this.props.date.getDate();
        return `${actualYear}-${actualMonth}-${actualDay}`
    }

    componentDidMount() {
        const actualDay = this.getActualDay();
        this.setState({
            selectedDay: actualDay
        });
        this.props.selectDay(this.props.date.getDate());
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