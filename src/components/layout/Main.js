import React from 'react';
import ErrorMessage from '../ServerErrors/ErrorMessage';
import WrappedCalendar from '../Containers/WrappedCalendar';
import TaskDisplay from '../Containers/TaskDisplay';
import {connect} from 'react-redux';
import {fetchTaskRequest} from '../../actions/index';

class Main extends React.Component {
    state = {
        showMessage: true,
    }

    closeErrorWarning = (e) => {
        if(e.target.className.match('close-warning')) {
            this.setState({showMessage: false});
        }
    }

    componentDidMount() {
        this.props.fetchTaskRequest()
    }

    render() {          
        return ((status) => {
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
                        {
                            this.state.showMessage ? (
                                <ErrorMessage
                                    errorMessage={`Failed to load tasks: the server couldn't find the resource. Please try to load again at a later time`}
                                    closeError={this.closeErrorWarning}
                                />
                            ) : (
                                null
                            )
                        }
                        <main className='main-container'>
                            <WrappedCalendar
                                date={this.props.date} /* Date Object */
                            />
                            <TaskDisplay/>
                        </main>
                    </div>
                )
            } else if(status === 'SUCCESS') {
                return (
                     <main className='main-container'>
                        <WrappedCalendar
                            date={this.props.date} /* Date Object */
                        />
                        <TaskDisplay/>
                    </main>                            
                )
            } else {
                return null
            }
        })(this.props.taskStatus)    
    }
}

const mapStateToMainProps = (state) => {
    return {
        taskStatus: state.appStatus.loadTasks,
        date: new Date(),
    }
}
const mapDispatchToMainProps = (dispatch) => {
    return {
        fetchTaskRequest: () => dispatch(fetchTaskRequest()),
    }
}

export default connect(
    mapStateToMainProps,
    mapDispatchToMainProps
)(Main);