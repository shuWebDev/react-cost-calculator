import React from 'react';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Summary from './summary';

class AppCore extends React.Component {
  
  render() {
    switch(this.props.currentStep) {
      case 1: return <Step1 saveStepData={this.props.saveStepData} />; 

      case 2: return <Step2 saveStepData={this.props.saveStepData} />; 

      case 3: return <Step3 saveStepData={this.props.saveStepData} />;

      case 4: return <Summary generateReport={this.props.generateReport} userInputData={this.props.userInputData} />;

      default: return null; 
    } 
  }
}

export default AppCore;