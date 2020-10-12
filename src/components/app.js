import React from 'react';
import Header from './Header';
import WrappedCalendar from './Containers/WrappedCalendar';
import TaskDisplay from './Containers/TaskDisplay';

const App = (props) => {
        return(
            <div className='container'>
                <Header/>
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