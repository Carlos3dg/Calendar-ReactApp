import React from 'react';
import WrappedCalendar from './Containers/WrappedCalendar';
import Tasks from './tasks/Tasks';
import {connect} from 'react-redux';

const App = (props) => {
        return(
            <div className='container'>
                <header>
                    <h1>Calendar App</h1>
                </header>
                <main className='main-container'>
                    <WrappedCalendar
                        date={props.date}
                    />
                    <TaskDisplay/>
                </main>
            </div>
        );
}

const mapStateToTasksProps = (state) => {
    return {
        day: state.date.currentDay,
        month: state.date.currentMonth,
        year: state.date.currentYear,
        fullMonth: state.date.fullMonth,
        taskList: state.taskList
    }
};

const TaskDisplay = connect(
    mapStateToTasksProps,
    {test: ()=>'hi'}
)(Tasks);

export default App;