import Tasks from '../tasks/Tasks';
import {connect} from 'react-redux';
import {saveTaskRequest} from '../../actions/index';
import {removeCurrentTask} from '../../actions/index';

const mapStateToTasksProps = (state) => {
    const tasksInYear = state.taskList.find(task => (
        task.year === state.date.currentYear
    ));

    let taskList; //Variable to store the tasks inside the current day

    if(tasksInYear) {
        let tasksInMonth;
        tasksInMonth = tasksInYear.months.find(task => (
            task.month === state.date.currentMonth
        ));

        if(tasksInMonth) {
            let tasksInDay;
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
        taskList: taskList,
        taskStatus: state.appStatus.saveTask,
    }
};

const mapDispatchToTaskProps = (dispatch) => {
    return {
        saveTask: (task, fullMonth) => dispatch(saveTaskRequest(task, fullMonth)),
        removeCurrentTask: (taskDate, task) => dispatch(removeCurrentTask(taskDate, task)),
    }
};

const TaskDisplay = connect(
    mapStateToTasksProps,
    mapDispatchToTaskProps
)(Tasks);

export default TaskDisplay;