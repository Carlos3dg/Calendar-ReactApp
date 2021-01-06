import React from 'react';
import Header from './Header';
import ErrorMessage from './ServerErrors/ErrorMessage';
import WrappedCalendar from './Containers/WrappedCalendar';
import TaskDisplay from './Containers/TaskDisplay';
import {connect} from 'react-redux';
import {fetchTaskRequest} from '../actions/index';

class App extends React.Component {

    componentDidMount() {
        this.props.fetchTaskRequest()
    }

    render() {
        return(
            <div className='container'>
                <Header/>
                {
                    {
                        PENDING: (
                            <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>                  
                        ),
                        FAILURE: (
                            <div>
                                <ErrorMessage
                                    text={`Failed to load tasks: the server couldn't find the resource. Try to load later`}
                                    class='error-load-message'
                                />
                                <main className='main-container'>
                                    <WrappedCalendar
                                        date={this.props.date} /* Date Object */
                                    />
                                    <TaskDisplay/>
                                </main>
                            </div>
                        ),
                        SUCCESS: (
                            <main className='main-container'>
                                <WrappedCalendar
                                    date={this.props.date} /* Date Object */
                                />
                                <TaskDisplay/>
                            </main>
                        ),
                    }[this.props.taskStatus]
                }
            </div>
        );
    }
}

const mapStateToAppProps = (state, ownProps) => {
    return {
        taskStatus: state.taskStatus.loadTasks,
        date: ownProps.date,
    }
}

export default connect(
    mapStateToAppProps,
    {fetchTaskRequest}
)(App);