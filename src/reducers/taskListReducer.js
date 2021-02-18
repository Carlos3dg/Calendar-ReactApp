import {v4 as uuidv4} from 'uuid';
import {getIndexWeekAndDay} from '../helpers/calendarHelpers';
import {getMonth} from '../helpers/calendarHelpers';

export default function taskListReducer(
    state=[],
    action
) {
    switch(action.type) {
        case 'FETCH_TASK_SUCCESS': {
            const newState = action.taskList;
            return newState;
        }
        case 'ADD_TASK': {
            const id = uuidv4();
            const newTask = {
                title: action.task.title,
                startTime: action.task.startTime,
                endTime: action.task.endTime,
                repeat: action.task.repeat,
                year: action.task.year,
                month: action.task.month,
                day: action.task.day
            };

            const oldState = [...state];
            const newState = getNewTask(newTask, oldState, action, id);

            return newState;
        }
        case 'SAVE_TASK_FAILURE': {
            const newState = action.taskList;
            return newState;
        }
        case 'REMOVE_CURRENT_TASK': {
            const oldState = [...state];
            const newState = removeCurrentTask(oldState, action.task);
            return newState;
        }
        case 'REMOVE_FOLLOW_TASKS': {
            const oldState = [...state];
            const newState = removeFollowTasks(oldState, action.task);
            return newState;
        }
        case 'REMOVE_ALL_TASKS': {
            const oldState = [...state];
            console.log('all')
            const newState = removeAllTasks(oldState, action.task);
            return newState;
        }
        default: {
            return state
        }
    }
};

function getNewTask(newTask, oldState, action, id) {
    let newState = [...oldState];

    switch(action.task.repeat) {
        case 'Does not repeat': {
            const newState = addNewItem(newTask, id, oldState);
            return newState;
        }
        case 'Daily': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, action.task.day);
            let days = []
            action.fullMonth.forEach((element, index) => {
                if(index >= dayPosition.week) {
                    const newDays = element.week.filter((day) => (
                        day >= newTask.day
                    ));
                    days = [...days, ...newDays];
                }
            });

            days.forEach((day) => {
                newTask.day = day;
                newState = addNewItem(newTask, id, newState);
            });

            return newState;
        } 
        case 'Weekly': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, action.task.day);

            let weeklyDay = newTask.day;
            let days = [];
            action.fullMonth.forEach((element, index) => {
                if(index >= dayPosition.week) {
                    const day = element.week.filter((day) => (
                        day === weeklyDay
                    ));
                    days = [...days, ...day];
                    weeklyDay = weeklyDay + 7;
                }
            });
            
            days.forEach((day) => {
                newTask.day = day;
                newState = addNewItem(newTask, id, newState);
            });

            return newState;
        }
        case 'Monthly': {
            if(newTask.day === 31) {
                for(let month=newTask.month; month<=11; month++) {
                    const fullMonth = getMonth(month, newTask.year);
                    const {week} = fullMonth[fullMonth.length - 1];
                    let day;
                    day = week.find((day, index) => {
                        if(week[week.length - 1] === null) {
                            return day > week[index+1];
                        } else {
                            return day === week[week.length - 1]
                        }
                    });
                    newTask.month = month;
                    newTask.day = day;
                    newState = addNewItem(newTask, id, newState);
                }

                return newState;
            } else {
                for(let month=newTask.month; month<=11; month++) {
                    newTask.month = month;
                    newState = addNewItem(newTask, id, newState);
                }

                return newState
            }

        }
        case 'Anually': {
            for(let year = newTask.year; year<=2040; year++) {
                newTask.year = year;
                newState = addNewItem(newTask, id, newState);
            }
            
            return newState
        }
        case 'Weekends': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, action.task.day);
            let days = [];
            action.fullMonth.forEach((element, index) => {
                if(index >= dayPosition.week) {
                    if(newTask.day === element.week[element.week.length - 1]) {
                        days = [...days, element.week[element.week.length - 1]];
                    } else {
                        days = [...days, element.week[0]];
                        if(element.week[element.week.length - 1] !== null) days = [...days, element.week[element.week.length - 1]]
                    }
                }
            });

            days.forEach((day) => {
                newTask.day = day;
                newState = addNewItem(newTask, id, newState);
            });

            return newState;
        }
        case 'Every weekday (Monday to Friday)': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, action.task.day);
            let days = [];
            action.fullMonth.forEach(function(element, index) {
                if(index >= dayPosition.week) {
                    const newDays = element.week.filter((day, index) => {
                        if(index !== 0 && index!==6 && day !== null && day >= newTask.day) {
                            return day;
                        }
                    });

                    days = [...days, ...newDays];
                }
            });

            days.forEach((day) => {
                newTask.day = day;
                newState = addNewItem(newTask, id, newState);
            });

            return newState;
        }
        default: {
            return newState;
        }
    }
}

function addNewItem(newTask, id, oldState) {
    const newItem = Object.assign({}, newTask);
    const taskIndex = oldState.findIndex((task) => (
        task.id === id
    ));

    if(taskIndex === -1) {
        const newTask = {
            id: id,
            items: [newItem],
        }

        return [
            ...oldState,
            newTask
        ];

    } else {
        const oldTask = Object.assign({}, oldState[taskIndex]);
        const newTask = {
            ...oldTask,
            items: oldTask.items.concat(newItem)
        };

        return [
            ...oldState.slice(0, taskIndex),
            newTask,
            ...oldState.slice(taskIndex+1, oldState.length)
        ];
    }
}

function removeCurrentTask(oldState, selectedTask) {
    const task = oldState.find((task) => (
        task.id === selectedTask.id
    ));

    const {items} = task;    
    if(items.length>1) {
        const itemIndex = items.findIndex((item) => (
            (item.year === selectedTask.year) && (item.month === selectedTask.month) && (item.day === selectedTask.day)
        ));

        const newState = oldState.map((task) => {
            if(task.id === selectedTask.id) {
                return {
                    ...task,
                    items: task.items.filter((item, index) => (
                        index !== itemIndex
                    ))
                };
            }
            return task;
        });

        return newState;

    } else {
        const newState = removeAllTasks(oldState, selectedTask);
        return newState
    }
}

function removeFollowTasks(oldState, selectedTask) {
    const task = oldState.find((task) => (
        task.id === selectedTask.id
    ));

    const {items} = task;    
    if(items.length>1) {
        const itemIndex = items.findIndex((item) => (
            (item.year === selectedTask.year) && (item.month === selectedTask.month) && (item.day === selectedTask.day)
        ));

        const newState = oldState.map((task) => {
            if(task.id === selectedTask.id) {
                return {
                    ...task,
                    items: task.items.filter((item, index) => (
                        index < itemIndex
                    ))
                };
            }
            return task;
        });

        return newState;

    } else {
        const newState = removeAllTasks(oldState, selectedTask);
        return newState
    }
}

function removeAllTasks(oldState, selectedTask) {
    const newState = oldState.filter((task) => (
        task.id !== selectedTask.id
    ));
    return newState
}


