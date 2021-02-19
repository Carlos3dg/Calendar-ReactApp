import React from 'react';
import ErrorMessage from '../ServerErrors/ErrorMessage';

class TaskStatus extends React.Component {
    state={
        showErrorMessage: this.props.showError
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            showErrorMessage: nextProps.showError
        }
    }

    closeErrorWarning = (e) => {
        if(e.target.className.match('close-warning')) {
            this.setState({
                showErrorMessage: false,
            })
            this.props.closeError()
        }
    }

    render() {
        return((status) => {
            if(status === 'PENDING') {
                return (
                    <div className="spinner popup-container">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div> 
                )
            } else if(status === 'SUCCESS') {
                return null;
            } else if(status === 'FAILURE') {
                return (
                    this.state.showErrorMessage ? (
                        <ErrorMessage
                            closeError={this.closeErrorWarning}
                            errorMessage={this.props.errorMessage}
                        />
                    ) : (
                        null
                    )
                )
            } else {
                return null;
            }
        })(this.props.status)
    }
}

export default TaskStatus;
