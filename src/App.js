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
      userInputData: {},
      calculationOutput: {
        efc: 0
      }
    };
  }

  componentWillMount() {
    this.fetchAllData();
  }

  generateReport = () => {
    let SAT = {
      lower: 1120,
      upper: 1310
    };

    let ACT = {
      lower: 22,
      upper: 27
    };
  }

  determineDependency = () => {
    let dependent = false;
    // NOTE: check if user's age < 23 
    if(this.state.userInputData.age < 23) {
      dependent = true;
    }
    // NOTE: check if user is married
    if(this.state.userInputData.marital === "yes") {
      dependent = false;
    }
    // NOTE: check if user has children
    if(this.state.userInputData.childSupport === "yes") {
      dependent = false;
    }
    return dependent;
  }

  // NOTE: retrieves the Expected Family Contribution figure from the static data based on user inputs
  getEFC = () => {
    let efc = 0;
    
    // NOTE get dependency status of user
    if(this.determineDependency() === true) {
      // NOTE: user is a dependent
      console.log("user is dependent");
      console.log(this.state.efc.efcDependent.length);
      for(let i=0; i<this.state.efc.efcDependent.length; i++) {
        for(let j=0; j<this.state.efc.efcDependent[i].length; j++) {
          if(this.state.efc.efcDependent[i][j].numberInCollege === this.state.userInputData.familyInCollege) {
            if(this.state.efc.efcDependent[i][j].numberInFamily === this.state.userInputData.familyMembers) {
              console.log(`FOUND: ${this.state.efc.efcDependent[i][j].incomeRanges[this.state.userInputData.householdIncome]}`);
              efc = this.state.efc.efcDependent[i][j].incomeRanges[this.state.userInputData.householdIncome];
            }
          }
        }
      }
    } else {
      // NOTE: user is not a dependent, determine if they have children as dependents
      console.log("user is NOT dependent");
      /*if(this.state.userInputData.childSupport === "no") {
        // NOTE: user has no dependent children
        console.log("user is NOT dependent, but HAS dependent(s)");
        for(let i=0; i<this.state.efc.efcIndWithoutDep.length; i++) {
          if((this.state.efc.efcNotDependentButHasDependent[i].numberInCollege === this.state.userInputData.familyInCollege) 
          && (this.state.efc.efcNotDependentButHasDependent[i].numberInFamily === this.state.unserInput.familyMembers)) {
            efc = this.state.efc.efcNotDependentButHasDependent[i].incomeRanges[this.state.userInputData.householdIncome];
            break;
          }
        }
      } else {
        console.log("user is NOT dependent, and HAS NO dependents");
        // NOTE: user has dependent children
        for(let i=0; i<this.state.efc.efcNotDependentAndNoDependent.length; i++) {
          if((this.state.efc.efcNotDependentAndNoDependent[i].numberInCollege === this.state.userInputData.familyInCollege) 
          && (this.state.efc.efcNotDependentAndNoDependent[i].numberInFamily === this.state.unserInput.familyMembers)) {
            efc = this.state.efc.efcNotDependentAndNoDependent[i].incomeRanges[this.state.userInputData.householdIncome];
            break;
          }
        }
      }*/
    }
    return efc; // NOTE: return the value for EFC that we found
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

  saveStepData = (data) => {
    this.setState({
      currentStep: this.state.currentStep + 1,
      userInputData: {
        ...this.state.userInputData,
        ...data
      }
    }, () => { console.log(`step data saved.`)});
  }

  componentDidUpdate() {
    //console.log("Updated");
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
      return <AppCore getEFC={this.getEFC} saveStepData={this.saveStepData} currentStep={this.state.currentStep} handlePreviousButtonClick={this.handlePreviousButtonClick} changeHandler={this.changeHandler} userInputData={this.state.userInputData} />
    }
  }
}

export default App;
