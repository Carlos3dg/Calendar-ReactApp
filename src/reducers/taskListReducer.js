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
            const newTask = {
                id: uuidv4(),
                title: action.task.title,
                startTime: action.task.startTime,
                endTime: action.task.endTime,
                repeat: action.task.repeat
            };

            const oldState = [...state];
            const newState = getNewTask(newTask, oldState, action);

            return newState;
        }
        default: {
            return state
        }
    }
};

function getNewTask(newTask, oldState, action) {
    let taskDate = {
        year: action.task.year,
        month: action.task.month,
        day: action.task.day
    };

    let newState = [...oldState];

    switch(action.task.repeat) {
        case 'Does not repeat': {
            const newState = getYearTask(newTask, oldState, taskDate);
            return newState;
        }
        case 'Daily': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, action.task.day);
            let days = []
            action.fullMonth.forEach((element, index) => {
                if(index >= dayPosition.week) {
                    const newDays = element.week.filter((day) => (
                        day >= taskDate.day
                    ));
                    days = [...days, ...newDays];
                }
            });

            days.forEach((day) => {
                taskDate.day = day;
                newState = getYearTask(newTask, newState, taskDate);
            });

            return newState;
        } 
        case 'Weekly': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, action.task.day);

            let weeklyDay = taskDate.day;
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
                taskDate.day = day;
                newState = getYearTask(newTask, newState, taskDate);
            });

            return newState;
        }
        case 'Monthly': {
            if(taskDate.day === 31) {
                for(let month=taskDate.month; month<=11; month++) {
                    const fullMonth = getMonth(month, taskDate.year);
                    const {week} = fullMonth[fullMonth.length - 1];
                    let day;
                    day = week.find((day, index) => {
                        if(week[week.length - 1] === null) {
                            return day > week[index+1];
                        } else {
                            return day === week[week.length - 1]
                        }
                    });
                    taskDate.month = month;
                    taskDate.day = day;
                    newState = getYearTask(newTask, newState, taskDate);
                }

                return newState;
            } else {
                for(let month=taskDate.month; month<=11; month++) {
                    taskDate.month = month;
                    newState = getYearTask(newTask, newState, taskDate);
                }

                return newState
            }

        }
        case 'Anually': {
            for(let year = taskDate.year; year<=2040; year++) {
                taskDate.year = year;
                newState = getYearTask(newTask, newState, taskDate);
            }
            
            return newState
        }
        case 'Weekends': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, action.task.day);
            let days = [];
            action.fullMonth.forEach((element, index) => {
                if(index >= dayPosition.week) {
                    if(taskDate.day === element.week[element.week.length - 1]) {
                        days = [...days, element.week[element.week.length - 1]];
                    } else {
                        days = [...days, element.week[0]];
                        if(element.week[element.week.length - 1] !== null) days = [...days, element.week[element.week.length - 1]]
                    }
                }
            });

            days.forEach((day) => {
                taskDate.day = day;
                newState = getYearTask(newTask, newState, taskDate);
            });

            return newState;
        }
        case 'Every weekday (Monday to Friday)': {
            const dayPosition = getIndexWeekAndDay(action.fullMonth, action.task.day);
            let days = [];
            action.fullMonth.forEach(function(element, index) {
                if(index >= dayPosition.week) {
                    const newDays = element.week.filter((day, index) => {
                        if(index !== 0 && index!==6 && day !== null && day >= taskDate.day) {
                            return day;
                        }
                    });

                    days = [...days, ...newDays];
                }
            });

            days.forEach((day) => {
                taskDate.day = day;
                newState = getYearTask(newTask, newState, taskDate);
            });

            return newState;
        }
    }
}

function getYearTask(newTask, oldState, taskDate) {
    const yearIndex = oldState.findIndex((task)=>(
        task.year === taskDate.year
    ));

    if(yearIndex === -1) {
        const newYear = {
            year: taskDate.year,
            months: [
                {
                    month: taskDate.month,
                    days: [
                        {
                            day: taskDate.day,
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
            months: getMonthTask(newTask, oldState[yearIndex].months, taskDate)
        }

        return [
            ...oldState.slice(0, yearIndex),
            updatedYear,
            ...oldState.slice(yearIndex+1, oldState.length)
        ];
    }
}

function getMonthTask(newTask, oldMonths, taskDate) {
    const monthIndex = oldMonths.findIndex((task) => (
        task.month === taskDate.month
    ));

    if(monthIndex === -1) {
        const newMonth = {
            month: taskDate.month,
            days: [
                {
                    day: taskDate.day,
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
            days: getDayTask(newTask, oldMonths[monthIndex].days, taskDate)
        }

        return [
            ...oldMonths.slice(0, monthIndex),
            updatedMonth,
            ...oldMonths.slice(monthIndex+1, oldMonths.length)
        ];
    }
}

function getDayTask(newTask, oldDays, taskDate) {
    const dayIndex = oldDays.findIndex((task) => (
        task.day === taskDate.day
    ));

    if(dayIndex === -1) {
        const newDay = {
            day: taskDate.day,
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


