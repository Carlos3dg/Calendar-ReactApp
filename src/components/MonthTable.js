import React from 'react';
import MonthDay from './MonthDay';

const MonthTable = (props) => {
    console.log(props.weeks);
    return (
        <table>
            <thead>
                <tr>
                    <td>Sun</td>
                    <td>Mon</td>
                    <td>Tue</td>
                    <td>Wed</td>
                    <td>Thu</td>
                    <td>Fri</td>
                    <td>Sat</td>
                </tr>
            </thead>
            <tbody>
               {
                   props.weeks===null ? null : props.weeks.map((week) => (
                    <tr>
                        {
                            week.numWeek.map((day) => (
                                <td>
                                    <MonthDay day={day}/>
                                </td>
                            ))
                        }
                    </tr>
               ))
               }
            </tbody>
        </table>
    );
};

export default MonthTable;