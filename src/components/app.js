import React from 'react';
import Calendar from './Calendar';

const months = [
    'January,', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
];

class App extends React.Component {
    state = {
        currentMonth: this.props.date.getMonth(),
        currentYear: this.props.date.getFullYear(),
        weeks: null,
    }

    showCalendar = (month, year) => {
        let weeks=[];
        const firstDay = (new Date(year, month)).getDay();
        const lastDay = new Date(year, month+1, 0);
        const numDays = lastDay.getDate();

        let startDayWeek = 1;
        let endDayWeek = 7 - firstDay;
        
        while(startDayWeek<=numDays) {
            weeks.push({numWeek: []});
            
            for(let i=startDayWeek; i<=endDayWeek; i++) {
                weeks[weeks.length - 1].numWeek.push(i);
            }

            startDayWeek = endDayWeek + 1;
            endDayWeek = endDayWeek + 7;

            if(endDayWeek>numDays) {
                endDayWeek = numDays;
            }
        }

        this.setState({weeks: weeks});
    }

    componentDidMount() {
        this.showCalendar(this.state.currentMonth, this.state.currentYear);
    }

    render() {
        return(
            <div>
                <Calendar 
                    months={months}
                    month={this.state.currentMonth}
                    year={this.state.currentYear}
                    weeks={this.state.weeks}
                />
            </div>
        );
    }
}

export default App;