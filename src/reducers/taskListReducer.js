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
        case 'SAVE_TASK_FAILURE': {
            const newState = action.taskList;
            return newState;
        }
        case 'REMOVE_CURRENT_TASK': {
            const oldState = [...state];
            const newState = updateTaskList(oldState, action);
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
        default: {
            return newState;
        }
    }
}
//Get the year object where our task is going to be
function getYearTask(newTask, oldState, taskDate) {
    //See if the year of our task already exist in the state of our reducer
    const yearIndex = oldState.findIndex((task)=>(
        task.year === taskDate.year
    )); //If it does, returns the index value that year has in the state, if not, returns -1,
    //If year of the new task does not exist in state
    if(yearIndex === -1) {
        //Create the entire object due to if it does not exist the year in the state, then doesn't exist any month, any day and finally any task.
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
        //See if the state doesn't have other different years in it.
        if(oldState.length === 0) {
            //if it doesn't have, then just add the new year object to a new array based in oldState, and set that new array to newYears. 
            const newYears = oldState.concat(newYear);
            return newYears;
        } else { //If it has other years...
            let newYears = [];
            //Check inside the oldState the years that are in.
            oldState.forEach((task, index) => {
                //If one of the years from state is smaller than the year from our task, 
                if(task.year < newYear.year) {
                    newYears[index] = task; //then add that year before the task year, in the newYears array
                    newYears[index+1] = newYear; //And add the task year after it.
                } else { //But if one of them is greater...
                    if(newYears.length === 0) { //Just add the task year, as first element, in case that there's not any year from state smaller than it, 
                        newYears[index] = newYear;
                    }
                    newYears[index+1] = task; //And add the greater years to the next position in newYears array
                }
            });
            return newYears;
        }
      //Now, if the year from the new task does exist...  
    } else {
        const updatedYear = {
            ...oldState[yearIndex], //Get the year object from oldState
            months: getMonthTask(newTask, oldState[yearIndex].months, taskDate) //Modify the months property
        }

        return [
            ...oldState.slice(0, yearIndex), 
            updatedYear,
            ...oldState.slice(yearIndex+1, oldState.length)
        ];
    }
}
//Repeat the same code from getYearTask but apply to Months array in a year
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


function updateTaskList(oldState, {taskDate, task}) {
    const getIndexYear = oldState.findIndex((task) => (
        task.year === taskDate.year
    ));

    const updatedYear = updateYear(oldState[getIndexYear], taskDate, task);

    return [
        ...oldState.slice(0, getIndexYear),
        updatedYear,
        ...oldState.slice(getIndexYear+1, oldState.length)
    ];
}

function updateYear(yearObject, taskDate, task) {
    return {
        ...yearObject,
        months: yearObject.months.map((month) => {
            if(month.month === taskDate.month) {
                const taskMonth = updateMonth(month, taskDate, task)
                return taskMonth;
            } else {
                return month;
            }
        })
    }
}

function updateMonth(monthObject, taskDate, task) {
    return {
        ...monthObject,
        days: monthObject.days.map((day) => {
            if(day.day === taskDate.day) {
                const dayTask = updateDayInRemoveTask(day, task);
                return dayTask;
            } else {
                return day;
            }
        })
    }
}

function updateDayInRemoveTask(dayObject, task) {
    const id = task.id;
    return {
        ...dayObject,
        tasks: dayObject.tasks.filter((task) => (task.id !== id))
    };
}


