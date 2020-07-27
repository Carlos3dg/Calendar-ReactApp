import React from 'react';
import WrappedCalendar from './Containers/WrappedCalendar';
import TaskDisplay from './Containers/TaskDisplay';

const App = (props) => {
        return(
            <div className='container'>
                <header>
                    <h1>Calendar App</h1>
                </header>
                <main className='main-container'>
                    <WrappedCalendar
                        date={props.date}
                    />
                    <TaskDisplay/>
                </main>
            </div>
        );
}

export default App;