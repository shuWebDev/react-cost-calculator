import React from 'react';
import Intro from './components/intro';
import AppCore from './components/appcore';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disclaimerAccepted: false,
      currentStep: 0,
      stepData: {},
      efc: {},
      poa: {},
      pell: [],
      tag: [],
      // NOTE: userInputData: object to capture all the user input for the calculations
      userInputData: {}
    };
  }

  componentWillMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    try {
      Promise.all([
        fetch("/efc.json").then(response => response.json()),
        fetch("/poa.json").then(response => response.json()),
        fetch("/pell.json").then(response => response.json()),
        fetch("/tag.json").then(response => response.json()),
        fetch("/merit.json").then(response => response.json())
      ]).then(([efc, poa, pell, tag, merit]) => {
        this.setState({
          efc: efc,
          poa: poa,
          pell: pell,
          tag: tag,
          merit: merit
        }, () => {console.log("data loaded");});
      });  
    } catch(e) {
      console.log(e);
    }
  }

  handleDisclaimerClick = (event) => {
    event.preventDefault();
    this.setState({
      disclaimerAccepted: true,
      currentStep: 1
    });
  }

  saveStepData = (stepNumber, data) => {
    this.setState({
      userInputData: {
        [`step${stepNumber}`]: data
      }
    }, () => { console.log(`step ${stepNumber} data saved.`)});
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
      return <AppCore saveStepData={this.saveStepData} currentStep={this.state.currentStep} handlePreviousButtonClick={this.handlePreviousButtonClick} changeHandler={this.changeHandler} />
    }
  }
}

export default App;
