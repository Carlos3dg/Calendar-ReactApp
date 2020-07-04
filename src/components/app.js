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
        fullMonth: null,
    }

    showCalendar = (month, year) => {
        let weeks=[];
        const firstDayIndexWeek = (new Date(year, month)).getDay();//3
        const lastDay = new Date(year, month+1, 0); //31 as string
        const numDays = lastDay.getDate(); //31
        const lastDayIndexWeek = new Date(year, month, numDays).getDay();
        const firstNullDays = (7 - ((6 - firstDayIndexWeek) + 1));
        const lastNullDays = (6 - lastDayIndexWeek);
        const nullDays = firstNullDays + lastNullDays;
        const numWeeks = (numDays + nullDays)/7;

        for(let i = 0; i<numWeeks; i++) {
            weeks.push({week: []});
        }

        let startDayWeek = 1;
        let daysWeek = 7 - firstNullDays;

        const fullMonth = weeks.map((week, index) => {
            if(index === 0) {
                for(let i = 0; i<firstNullDays; i++) {
                    week.week.push(null);
                }
                
                for(let j = startDayWeek; j<=daysWeek; j++) {
                    week.week.push(j);
                }
                startDayWeek = daysWeek + 1;
                daysWeek = daysWeek + 7;
                return week;

            } else if(index === weeks.length - 1) {
                for(let i = startDayWeek; i<=daysWeek; i++) {
                    week.week.push(i);
                }
                for(let j = 0; j<lastNullDays; j++) {
                    week.week.push(null);
                }
                return week;

            } else {
                for(let j = startDayWeek; j<=daysWeek; j++) {
                    week.week.push(j);
                }
                startDayWeek = daysWeek + 1;
                daysWeek = daysWeek + 7;
                daysWeek = daysWeek>numDays ? numDays : daysWeek;
                return week;
            }
        });

        this.setState({fullMonth: fullMonth});
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
                    fullMonth={this.state.fullMonth}
                />
            </div>
        );
    }
}

export default App;