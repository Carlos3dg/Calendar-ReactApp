import {v4 as uuidv4} from 'uuid';

export default function taskListReducer(
    state=[],
    action
) {
    switch(action.type) {
        case 'ADD_TASK': {
            const newTask = {
                id: uuidv4(),
                title: action.task.title,
                startTime: action.task.startTime,
                endTime: action.task.endTime,
                repeat: action.task.repeat
            };

            const oldState = [...state];
            
            const yearIndex = oldState.findIndex((task)=>(
                task.year === action.task.year
            ));

            const newState = getYearTask(yearIndex, newTask, oldState, action);

            return newState;
            
        }
        default: {
            return state
        }
    }
};

function getYearTask(yearIndex, newTask, oldState, action) {
    if(yearIndex === -1) {
        const newYear = {
            year: action.task.year,
            months: [
                {
                    month: action.task.month,
                    days: [
                        {
                            day: action.task.day,
                            tasks: [
                                newTask
                            ]
                        }
                    ]
                }
            ]
        };
        
        if(oldState.length === 0) {
            const newYears = oldState.concat(newYear);
            return newYears;
        } else {
            let newYears = [];
            oldState.forEach((task, index) => {
                if(task.year < newYear.year) {
                    newYears[index] = task;
                    newYears[index+1] = newYear;
                } else {
                    if(newYears.length === 0) {
                        newYears[index] = newYear;
                    }
                    newYears[index+1] = task;
                }
            });
            return newYears;
        }

    } else {
        const updatedYear = {
            ...oldState[yearIndex],
            months: getMonthTask(newTask, oldState[yearIndex].months, action)
        }

        return [
            ...oldState.slice(0, yearIndex),
            updatedYear,
            ...oldState.slice(yearIndex+1, oldState.length)
        ];
    }
}

function getMonthTask(newTask, oldMonths, action) {
    const monthIndex = oldMonths.findIndex((task) => (
        task.month === action.task.month
    ));

    if(monthIndex === -1) {
        const newMonth = {
            month: action.task.month,
            days: [
                {
                    day: action.task.day,
                    tasks: [
                        newTask
                    ]
                }
            ]
        }

        if(oldMonths.length === 0) {
            const newMonths = oldMonths.concat(newMonth);
            return newMonths;
        } else {
            let newMonths=[];
            oldMonths.forEach((task, index) => {
                if(task.month < newMonth.month) {
                    newMonths[index] = task;
                    newMonths[index+1] = newMonth;
                } else {
                    if(newMonths.length === 0) {
                        newMonths[index] = newMonth;    
                    }
                    newMonths[index+1] = task;
                }
            });
            return newMonths;
        }

    } else {
        const updatedMonth = {
            ...oldMonths[monthIndex],
            days: getDayTask(newTask, oldMonths[monthIndex].days, action)
        }

        return [
            ...oldMonths.slice(0, monthIndex),
            updatedMonth,
            ...oldMonths.slice(monthIndex+1, oldMonths.length)
        ];
    }
}

function getDayTask(newTask, oldDays, action) {
    const dayIndex = oldDays.findIndex((task) => (
        task.day === action.task.day
    ));

    if(dayIndex === -1) {
        const newDay = {
            day: action.task.day,
            tasks: [
                newTask
            ]
        };

        if(oldDays.length === 0) {
            const newDays = oldDays.concat(newDay);
            return newDays;
        } else {
            let newDays = [];
            oldDays.forEach((task, index) => {
                if(task.day < newDay.day) {
                    newDays[index] = task;
                    newDays[index+1] = newDay;
                } else {
                    if(newDays.length === 0) {
                        newDays[index] = newDay;
                    }
                    newDays[index+1] = task;
                }
            });
            return newDays;
        }

    } else {
        const updatedDay = {
            ...oldDays[dayIndex],
            tasks: getTaskList(newTask, oldDays[dayIndex].tasks)
        }

        return [
            ...oldDays.slice(0, dayIndex),
            updatedDay,
            ...oldDays.slice(dayIndex+1, oldDays.length)
        ];
    }
}

function getTaskList(newTask, oldTasks) {
    if(oldTasks.length === 0) {
        const newTasks = oldTasks.concat(newTask);
        return newTasks;
    } else {
        let newTasks = [];
        oldTasks.forEach((task, index) => {
            if(task.startTime.jsTime <= newTask.startTime.jsTime) {
                newTasks[index] = task;
                newTasks[index+1] = newTask;
            } else {
                if(newTasks.length === 0) {
                    newTasks[index] = newTask;
                }
                newTasks[index+1] = task
            }
        });
        return newTasks;
    }
}


