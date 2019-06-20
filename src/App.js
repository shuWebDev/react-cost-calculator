import React from 'react';
import Intro from './components/intro';
import AppCore from './components/appcore';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disclaimerAccepted: false,
      currentStep: 0,
      stepData: {
        step1: {}
      }
    };
  }

  handleDisclaimerClick = (event) => {
    event.preventDefault();
    this.setState({
      disclaimerAccepted: true,
      currentStep: 1
    });
  }

  // NOTE: handles submissions of updated data
  // from the individual Step components
  // stepNumber: currently active step, increment on
  // save to state to trigger rendering the next step
  // value: the data saved for the step
  submitStepDataUpdate = (stepNumber, value) => {
    this.setState(prevState => ({
      currentStep: this.state.currentStep + 1,
      stepData: {
        ...prevState.stepData,
        [`step${stepNumber}`]: value
      }
    }), () => { console.log(`step ${stepNumber} data updated.`); });
  }

  // NOTE: handle clicking the Previous button on a
  // Step, fromStepNumber is the step screen in the  
  // process the click came from. 
  // If we are coming from Step 1, we can't go back
  // further, stay there.
  handlePreviousButtonClick = (fromStepNumber) => {
    if(fromStepNumber > 1) {
      this.setState({
        currentStep: fromStepNumber--
      }, () => { console.log(`Going back to Step ${fromStepNumber - 1}`)});
    } else {
      console.log("Previous screen navigation canceled, we are at the first screen.");
    }
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  render() {
    //console.log(this.state.disclaimerAccepted);
    if(!this.state.disclaimerAccepted) {
      // first screen: user must click "accept"
      return (
        <Intro disclaimerButtonClick={this.handleDisclaimerClick} />
      )
    } else {
      // User has clicked "accept", move control to the rest of app
      return <AppCore currentStep={this.state.currentStep} submitStepDataUpdate={this.submitStepDataUpdate} handlePreviousButtonClick={this.handlePreviousButtonClick} />
    }
  }
}

export default App;
