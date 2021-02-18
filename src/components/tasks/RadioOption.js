import React from 'react';

class RadioOption extends React.Component {
    state = {
        selectedOption: 'thisTask',
    }

    closeForm = (e) => {
        if(e.target.className.match('close-form')) {
            this.props.closeForm();
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onFormSubmit(this.state.selectedOption);
    }

    onChangeRadio = (e) => {
        const selectedOption = e.target.value;
        this.setState({
            selectedOption
        });
    }

    render() {
        return (
            <div className='close-form popup-container' onClick={this.closeForm}>
                <div className='radio-option-container'>
                    <span className="close-form material-icons close-icon">
                            close
                    </span>
                    <div className='radio-option-header'>
                        <h3>Do you want to delete?</h3>
                    </div>
                    <form className='radio-option-form' onSubmit={this.onFormSubmit}>
                        <div>
                            <input 
                                type="radio" 
                                id='thisTask' 
                                value='thisTask' 
                                checked={this.state.selectedOption === 'thisTask'}
                                onChange={this.onChangeRadio}
                            />
                            <label htmlFor="thisTask">This task</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id='followTasks'
                                value='followTasks' 
                                checked={this.state.selectedOption==='followTasks'}
                                onChange={this.onChangeRadio}
                            />
                            <label htmlFor="followTasks">This and following tasks</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id='allTasks'
                                value='allTasks' 
                                checked={this.state.selectedOption==='allTasks'}
                                onChange={this.onChangeRadio}
                            />
                            <label htmlFor="allTasks">All tasks</label>
                        </div>
                        <div className='button-container'>
                            <input className='button save-button' type="submit" value='Delete'/>
                            <input className='close-form button cancel-button' type="button" value='Cancel'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RadioOption;