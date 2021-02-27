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
            const newState = removeAllTasks(oldState, action.task);
            return newState;
        }
        case 'REMOVE_TASK_FAILURE': {
            const newState = action.taskList;
            return newState;
        }
        case 'EDIT_CURRENT_TASK': {
            return getEditedState(state, action, removeCurrentTask, editCurrentTask);
        }
        case 'EDIT_FOLLOW_TASKS': {
            return getEditedState(state, action, removeFollowTasks, editFollowTasks);
        }
        case 'EDIT_ALL_TASKS': {
            return getEditedState(state, action, removeAllTasks, editAllTasks);
        }
        case 'EDIT_TASK_FAILURE': {
            const newState = action.taskList;
            return newState;
        }
        default: {
            return state
        }
    }
};

function getNewTask(newTask, oldState, action, id) {
    let newState = [...oldState];

    switch(newTask.repeat) {
        case 'Does not repeat': {
            const newState = addNewItem(newTask, id, oldState);
            return newState;
        }
        case 'Daily': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, newTask.day);
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
            const dayPosition = getIndexWeekAndDay(action.fullMonth, newTask.day);

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
            const dayPosition = getIndexWeekAndDay(action.fullMonth, newTask.day);
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
            const dayPosition = getIndexWeekAndDay(action.fullMonth, newTask.day);
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

function getEditedState(state, action, removeTask, editTask) {
    const olderState = [...state];
    let {editedTask, oldTask} = action; //Both objects has an id, and are the same, but one has the edited values and the other one the values before edited.
    delete editedTask.id; //Remove id from editedTask object, due to this object represent an item.

    //When the user edit the repeat option we remove the edited task and create a new one.
    if(editedTask.repeat !== oldTask.repeat) {
        if(action.type === 'EDIT_ALL_TASKS'){
            //Change the date of the edited task to the first date of the items list, in order to edit the task since that date.
            editedTask = changeTaskDate(editedTask, oldTask, olderState);
        }
        //Remove the task (before being edited)
        const oldState = removeTask(olderState, oldTask);
        //Remember to delete this action object later (We need to refactor getNewTask)
        const newAction = {
            fullMonth: getMonth(editedTask.month, editedTask.year)
        }
        const newId = uuidv4()
        //Edit the task (Although we're creating a new one, based on the edited one)
        const newState = getNewTask(editedTask, oldState, newAction, newId);
        return newState;
    } else {
        const newState = editTask(editedTask, oldTask, olderState);
        return newState;
    }
}

function changeTaskDate(editedTask, oldTask, olderState) {
    //If the user didn't change the date, there's a chance that he could've been editing a task different from the first position. That's why we need to make the change
    if(editedTask.year === oldTask.year && editedTask.month === oldTask.month && editedTask.day === oldTask.day) {
        const task = olderState.find((task) => (
            task.id === oldTask.id
        ));
        const firstItem = task.items.find((item, index) => (
            index === 0
        ));
        return {
            ...editedTask,
            year: firstItem.year,
            month: firstItem.month,
            day: firstItem.day,
        };
    }
    //If the user change the date, we just take that point to edit the task and we don't do any change
    return editedTask;
}

function editCurrentTask(editedItem, oldTask, oldState) {
    const task = oldState.find((task) => (
        task.id === oldTask.id
    ));

    const itemIndex = task.items.findIndex((item) => (
        (item.year === oldTask.year) && (item.month === oldTask.month) && (item.day === oldTask.day)
    ));

    const newState = oldState.map((task) => {
        if(task.id === oldTask.id) {
            return {
                ...task,
                items: task.items.map((item, index) => {
                    if(index === itemIndex) {
                        return Object.assign({}, item, editedItem)
                    }
                    return item;
                })
            }
        }

        return task;
    });

    return newState;
}

function editFollowTasks(editedItem, oldTask, oldState) {
    //1.Find task that has been edited
    const task = oldState.find((task) => (
        task.id === oldTask.id
    ));
    //2.Find the Date position    
    const itemIndex = task.items.findIndex((item) => (
        (item.year === oldTask.year) && (item.month === oldTask.month) && (item.day === oldTask.day)
    ));
    //3.Create a new Task based on the edited one    
    const action = {
        fullMonth: getMonth(editedItem.month, editedItem.year) 
    }    
    const editedTask = getNewTask(editedItem, [], action, oldTask.id);

    const length = task.items.length - itemIndex; //3.1 Get number of tasks that are followed (tasks that are going to be edited)
    const editedItems = editedTask[0].items.slice(0, length); //3.2 From the new Task, get elements until that number

    const newState = oldState.map((task) => {
        if(task.id === oldTask.id) {
            return {
                ...task,
                items: [
                    ...task.items.slice(0, itemIndex), //Get tasks that were not edited
                    ...editedItems // Get edited tasks
                ]
            };
        }

        return task;
    });

    return newState;
}

function editAllTasks(editedItem, oldTask, oldState) {
    //1.Find task that has been edited
    const task = oldState.find((task) => (
        task.id === oldTask.id
    ));
    //2.Create a new Task based on the edited one  
    const action = {
        fullMonth: getMonth(editedItem.month, editedItem.year),
    };
    const editedTask = getNewTask(editedItem, [], action, oldTask.id);

    const editedItems = editedTask[0].items.slice(0, task.items.length); //If editedTask has more items that the original task, reduce them to the original size

    const newState = oldState.map((task) => {
        if(task.id === oldTask.id) {
            return {
                ...task,
                items: [...editedItems]
            }
        }

        return task;
    });

    return newState;
}