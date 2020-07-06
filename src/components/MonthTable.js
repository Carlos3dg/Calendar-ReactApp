import React from 'react';
import MonthDay from './MonthDay';

const MonthTable = (props) => {
    
    return (
        <table className='container-short calendar-table'>
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
                  props.fullMonth === null ? null : props.fullMonth.map((week) => (
                    <tr>
                        {
                            week.week.map((day) => (
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