import React from 'react';
import Step1 from './steps/step1';
import Step2 from './steps/step2';

class AppCore extends React.Component {
  
  render() {
    switch(this.props.currentStep) {
      case 1: return <Step1 submitStepDataUpdate={this.props.submitStepDataUpdate} handlePreviousButtonClick={this.props.handlePreviousButtonClick} />; 
      case 2: return <Step2 submitStepDataUpdate={this.props.submitStepDataUpdate} handlePreviousButtonClick={this.props.handlePreviousButtonClick} />; 
      default: return null; 
    } 
  }
}

export default AppCore;