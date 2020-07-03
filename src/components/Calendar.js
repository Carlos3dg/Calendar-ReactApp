import React from 'react';
import MonthHeader from './MonthHeader';
import MonthTable from './MonthTable';

class Calendar extends React.Component {
    render() {
        return(
            <div>
                <MonthHeader
                    months={this.props.months}
                    month={this.props.month}
                    year={this.props.year}
                />
                <MonthTable
                    month={this.props.month}
                    year={this.props.year}
                    weeks={this.props.weeks}
                />
            </div>
        );
    };
};

export default Calendar;