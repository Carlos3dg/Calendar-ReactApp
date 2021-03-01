import React from 'react';

class RadioOption extends React.Component {
    state = {
        radioValues: {
            option1: 'thisTask',
            option2: 'followTasks',
            option3: 'allTasks',
        },
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

    onClickCustomRadio = (e) => {
        const selectedOption = e.target.getAttribute('name');
        this.setState({
            selectedOption
        });
    }

    render() {
        const {option1, option2, option3} = this.state.radioValues;
        return (
            <div className='close-form popup-container' onClick={this.closeForm}>
                <div className='radio-option-container'>
                    <span className="close-form material-icons close-icon">
                            close
                    </span>
                    <div className='radio-option-header'>
                        <h3>Do you want to {this.props.action}?</h3>
                    </div>
                    <form className='radio-option-form' onSubmit={this.onFormSubmit}>
                        <div className='input-radio-container'>           
                            <input 
                                type="radio" 
                                id={option1} 
                                value={option1}
                                checked={this.state.selectedOption === option1}
                                onChange={this.onChangeRadio}
                                className='input-radio'
                            />
                            <span 
                                className='custom-radio' 
                                name={option1} 
                                onClick={this.onClickCustomRadio}>
                            </span>
                            <label htmlFor={option1}>This task</label>
                        </div>
                        <div className='input-radio-container'>
                            <input 
                                type="radio" 
                                id={option2}
                                value={option2}
                                checked={this.state.selectedOption===option2}
                                onChange={this.onChangeRadio}
                                className='input-radio'
                            />
                            <span 
                                className='custom-radio' 
                                name={option2} 
                                onClick={this.onClickCustomRadio}>
                            </span>
                            <label htmlFor={option2}>This and following tasks</label>
                        </div>
                        <div className='input-radio-container'>
                            <input 
                                type="radio" 
                                id={option3}
                                value={option3}
                                checked={this.state.selectedOption===option3}
                                onChange={this.onChangeRadio}
                                className='input-radio'
                            />
                            <span 
                                className='custom-radio' 
                                name={option3} 
                                onClick={this.onClickCustomRadio}>
                            </span>
                            <label htmlFor={option3}>All tasks</label>
                        </div>
                        <div className='button-container'>
                            <input className='button save-button' type="submit" value={this.props.action === 'edit' ? 'Edit' : 'Delete'}/>
                            <input className='close-form button cancel-button' type="button" value='Cancel'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RadioOption;