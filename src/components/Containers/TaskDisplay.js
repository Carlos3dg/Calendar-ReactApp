import Tasks from '../tasks/Tasks';
import {connect} from 'react-redux';
import {
    saveTaskRequest,
    jumpDate,
} from '../../actions/index';

const mapStateToTasksProps = (state) => {
    let taskList = []; //Variable to store the tasks inside the current day

    const {currentYear, currentMonth, currentDay} = state.date.mainCalendar;
    state.taskList.forEach((task) => {
        //Get item task if the codition fullfil
        const item = task.items.find((item) => (
            (item.year === currentYear) && (item.month === currentMonth) && (item.day === currentDay)
        ));

        if (item) {
            const itemWithId = {
                ...item,
                id: task.id,
            }

            taskList = [...taskList, itemWithId];
        }
    });

    if (taskList.length) {
        //Order tasks by hour
        let aux;
        for (let i = 0; i < taskList.length; i++) {
            for (let j = i + 1; j < taskList.length; j++) {
                if (taskList[i].startTime.jsTime >= taskList[j].startTime.jsTime) {
                    aux = taskList[i];
                    taskList[i] = taskList[j];
                    taskList[j] = aux;
                }
            }
        }
    }

    return {
        day: currentDay,
        month: currentMonth,
        year: currentYear,
        smallCalendar: state.date.smallCalendar,
        taskList: taskList,
        taskStatus: state.appStatus.saveTask,
        removeStatus: state.appStatus.removeTask,
    }
};

const mapDispatchToTaskProps = (dispatch) => {
    return {
        saveTask: (task, fullMonth) => dispatch(saveTaskRequest(task, fullMonth)),
        jumpDate: (month, year, day)=>dispatch(jumpDate(month, year, day)),
    }
};

const TaskDisplay = connect(
    mapStateToTasksProps,
    mapDispatchToTaskProps
)(Tasks);

export default TaskDisplay;