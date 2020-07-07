import React from 'react';
import MonthDay from './MonthDay';

const MonthTable = (props) => {
    return(
        <table className='container-short calendar-table'>
            <colgroup>
                <col className='days-col'/>
                <col className='days-col'/>
                <col className='days-col'/>
                <col className='days-col'/>
                <col className='days-col'/>
                <col className='days-col'/>
                <col className='days-col'/>
            </colgroup>
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
               {
                  props.fullMonth === null ? null : props.fullMonth.map((week, index) => (
                    <tr key={index}>
                        {
                            week.week.map((day, index) => (
                                <MonthDay
                                    month={props.month}
                                    year={props.year}
                                    day={day}
                                    date={props.date}
                                    key={index}
                                />
                            ))
                        }
                    </tr>
               ))
            }
            </tbody>
        </table>
    );
}
export default MonthTable;