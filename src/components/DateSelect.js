import React from 'react';
import Months from '../api/months.json';
import Years from '../api/years.json';

class DateSelect extends React.Component {
    state = {
        month: this.props.month,
        year: this.props.year,
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            month: nextProps.month,
            year: nextProps.year
        }
    }

    onMonthChange = (e) => {
        const month = parseInt(e.target.value);
        this.setState({month: month});
        this.props.showCalendar(month, this.state.year);
    }

    onYearChange = (e) => {
        const year = parseInt(e.target.value);
        this.setState({year: year});
        this.props.showCalendar(this.state.month, year);
    }

    renderMonthSelect = () => {
        return(
            <select value={this.state.month} onChange={this.onMonthChange}>
                {
                    Months.map((month, index) => (
                        <option value={index} key={index}>{month}</option>
                    ))
                }
            </select>
        );
    }

    renderYearSelect = () => {
        return(
            <select value={this.state.year} onChange={this.onYearChange}>
                {
                    Years.map((year, index) => (
                    <option value={year} key={index}>{year}</option>
                    ))
                }
            </select>
        )
    }

    render() {
        return (
                <div>
                    {this.renderMonthSelect()}
                    {this.renderYearSelect()}
                </div>
        )
    }
}

export default DateSelect;
