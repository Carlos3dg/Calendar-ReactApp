import React from 'react';

class MonthDayTask extends React.Component {
    //Determine if the title task has more than 16 characters, if so, then slice it and add '...'
    sliceTitleTask = ({title}, limit) => {
        if(title.length > limit) {
            return title.slice(0, limit) + '...';
        } else {
            return title;
        }
    }

    render() {
        return(
            <div className={`day-task-container ${this.props.index%2 !== 0 ? 'lightblue-task' : 'neonblue-task'}`}>
                <span className='day-task-title'>{this.sliceTitleTask(this.props.task, 16)}</span>
            </div>
        )
    }
}

export default MonthDayTask;