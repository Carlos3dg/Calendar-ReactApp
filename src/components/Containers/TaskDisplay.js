import Tasks from '../tasks/Tasks';
import {connect} from 'react-redux';
import {saveTaskRequest} from '../../actions/index';
import {removeCurrentTask} from '../../actions/index';

const mapStateToTasksProps = (state) => {
    let taskList = []; //Variable to store the tasks inside the current day

    state.taskList.forEach((task) => {
        //Get item task if the codition fullfil
        const item = task.items.find((item) => (
            (item.year === state.date.currentYear) && (item.month === state.date.currentMonth) && (item.day === state.date.currentDay)
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