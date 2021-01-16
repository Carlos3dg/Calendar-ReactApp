import React from 'react';
import Header from './Header';
import ErrorMessage from './ServerErrors/ErrorMessage';
import WrappedCalendar from './Containers/WrappedCalendar';
import TaskDisplay from './Containers/TaskDisplay';
import {connect} from 'react-redux';
import {fetchTaskRequest, closeTaskWarning} from '../actions/index';

class App extends React.Component {

    closeErrorWarning = (e) => {
        if(e.target.className.match('close-warning')) {
            this.props.closeWarning(null, 'loadTasks');
        }
    }

    componentDidMount() {
        this.props.fetchTaskRequest()
    }

    render() {
        return(
            <div className='container'>
                <Header/>
                {
                    ((status) => {
                        if(status === 'PENDING') {
                            return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>                               
                            );
                        } else if(status === 'FAILURE') {
                            return (
                                <div>
                                    <ErrorMessage
                                        errorMessage={`Failed to load tasks: the server couldn't find the resource. Try to load later`}
                                        closeError={this.closeErrorWarning}
                                    />
                                    <main className='main-container'>
                                        <WrappedCalendar
                                            date={this.props.date} /* Date Object */
                                        />
                                        <TaskDisplay/>
                                    </main>
                                </div>
                            )
                        } else {
                            return (
                                <main className='main-container'>
                                    <WrappedCalendar
                                        date={this.props.date} /* Date Object */
                                    />
                                    <TaskDisplay/>
                                </main>                            
                            )
                        }
                    })(this.props.taskStatus)    
                }
            </div>
        );
    }
}

const mapStateToAppProps = (state, ownProps) => {
    return {
        taskStatus: state.appStatus.loadTasks,
        date: ownProps.date,
    }
}
const mapDispatchToAppProps = (dispatch) => {
    return {
        fetchTaskRequest: () => dispatch(fetchTaskRequest()),
        closeWarning: (status, warningType) => dispatch(closeTaskWarning(status, warningType))
    }
}

export default connect(
    mapStateToAppProps,
    mapDispatchToAppProps
)(App);