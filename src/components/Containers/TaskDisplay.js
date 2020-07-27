import Tasks from '../tasks/Tasks';
import {connect} from 'react-redux';
import {addTask} from '../../actions/index';

const mapStateToTasksProps = (state) => {
    return {
        day: state.date.currentDay,
        month: state.date.currentMonth,
        year: state.date.currentYear,
        fullMonth: state.date.fullMonth,
        taskList: state.taskList
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