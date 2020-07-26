//Get an array of the week in the month and inside every week other array with the corresponding days in that week
export function getMonth(month, year) {
     //Array to store the weeks [week1, week2, week3 ...]
     let weeks=[];
     const firstDayIndexWeek = (new Date(year, month)).getDay(); //Get the index week of the first day of the month
     const lastDay = new Date(year, month+1, 0); //Get the last day of the month as string
     const numDays = lastDay.getDate(); //Get the las day as integer
     const lastDayIndexWeek = new Date(year, month, numDays).getDay(); 
     const firstNullDays = (7 - ((6 - firstDayIndexWeek) + 1));//Get the rest of the days, in a week, that are before the first day
     const lastNullDays = (6 - lastDayIndexWeek); //Get the rest of the days, in a week, that are after the last day
     const nullDays = firstNullDays + lastNullDays;
     const numWeeks = (numDays + nullDays)/7; //With the total days in the month plus the total days that are not in the month but in one of the weeks of the month divided by 7 we get the total weeks for a determined month

     for(let i = 0; i<numWeeks; i++) {
         weeks.push({week: []}); //Add every week to the array as an object
     }

     let startDayWeek = 1;
     let daysWeek = 7 - firstNullDays;

     const fullMonth = weeks.map((week, index) => {
         if(index === 0) {
             for(let i = 0; i<firstNullDays; i++) {
                 week.week.push(null);
             }
             
             for(let j = startDayWeek; j<=daysWeek; j++) {
                 week.week.push(j);
             }
             startDayWeek = daysWeek + 1;
             daysWeek = daysWeek + 7;
             return week;

         } else if(index === weeks.length - 1) {
             for(let i = startDayWeek; i<=daysWeek; i++) {
                 week.week.push(i);
             }
             for(let j = 0; j<lastNullDays; j++) {
                 week.week.push(null);
             }
             return week;

         } else {
             for(let j = startDayWeek; j<=daysWeek; j++) {
                 week.week.push(j);
             }
             startDayWeek = daysWeek + 1;
             daysWeek = daysWeek + 7;
             daysWeek = daysWeek>numDays ? numDays : daysWeek;
             return week;
         }
     });

     return fullMonth;
}

export function getIndexWeekAndDay(fullMonth, day) {
    const index = {
        week: null,
        day: null
    }

    index.week = fullMonth.findIndex((week)=>{
       index.day = week.week.findIndex((dayInWeek)=>{
            return dayInWeek === day
       });
       return index.day !== -1
    });

    return index;
}