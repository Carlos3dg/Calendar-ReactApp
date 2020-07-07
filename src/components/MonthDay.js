import React from 'react';

class MonthDay extends React.Component {
    state = {
        today: null,
    }

    componentDidMount() {
        const actualYear = this.props.date.getFullYear();
        const actualMonth = this.props.date.getMonth();
        const actualDay = this.props.date.getDate();
        const today = new Date(actualYear, actualMonth, actualDay);
        const currentDate = new Date(this.props.year, this.props.month, this.props.day)
         if(today === currentDate) {
            this.setState({today: true})
         }
    }

    render() {
        //console.log(this.state.today)
        return (
            <td className={this.state.today ? 'today' : null}>
                <div className='day-box'>
                    <span>{this.props.day}</span>
                </div>
            </td>
        );
    };
};

export default MonthDay;