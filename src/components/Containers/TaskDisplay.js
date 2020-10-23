import Tasks from '../tasks/Tasks';
import {connect} from 'react-redux';
import {addTask} from '../../actions/index';

const mapStateToTasksProps = (state) => {
    const tasksInYear = state.taskList.find(task => (
        task.year === state.date.currentYear
    ));
    let tasksInMonth;
    let tasksInDay;
    let taskList;

    if(tasksInYear) {
        tasksInMonth = tasksInYear.months.find(task => (
            task.month === state.date.currentMonth
        ));

        if(tasksInMonth) {
            tasksInDay = tasksInMonth.days.find(task => (
                task.day === state.date.currentDay
            ));
            
            if(tasksInDay) {
                taskList = tasksInDay.tasks;
            }
        }
    }

    return {
        day: state.date.currentDay,
        month: state.date.currentMonth,
        year: state.date.currentYear,
        fullMonth: state.date.fullMonth,
        taskList: taskList
    }
};

const mapDispatchToTaskProps = (dispatch) => {
    return {
        addTask: (task, fullMonth) => dispatch(addTask(task, fullMonth))
    }
};

const TaskDisplay = connect(
    mapStateToTasksProps,
    mapDispatchToTaskProps
)(Tasks);

export default TaskDisplay;