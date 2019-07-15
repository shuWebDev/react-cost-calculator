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

  /*generateReport = () => {
    let SAT = {
      lower: 1120,
      upper: 1310
    };

    let ACT = {
      lower: 22,
      upper: 27
    };
  }*/

  determineDependency = () => {
    let dependent = false;
    // NOTE: check if user's age < 24 
    if(this.state.userInputData.age < 24) {
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


  // NOTE: generate the calculated report
  generateReport = () => {
    let EFCValue = this.getEFC();
    // NOTE: Tuition aid grant value is depenednt on EFC value
    let TAGValue = this.getTAG(EFCValue);
    let POAValue = this.getPOA();
    
    let calculationReport = {
      EFC: EFCValue,
      TAG: TAGValue,
      POA: POAValue
    };
    return calculationReport;
  }

  // NOTE: compute TAG/Tuition Aid Grant value
  getTAG = (efc) => {
    let tag = this.state.tag; // NOTE: values pulled in from data file
    let calculatedTAG = 0;

    for(let i=0; i<tag.length; i++) {
      if((efc >= tag[i][0]) && efc <= tag[i][1]) {
        calculatedTAG = tag[i][2];
        break;
      }
    }
    return calculatedTAG;
  }

  // NOTE: retrieves the Expected Family Contribution figure from the static data based on user inputs
  getEFC = () => {
    let efc = 0;
    
    // NOTE get dependency status of user
    if(this.determineDependency() === true) {
      // NOTE: user is a dependent
      console.log("user is dependent");
      for(let i=0; i<this.state.efc.efcDependent.length; i++) {
        for(let j=0; j<this.state.efc.efcDependent[i].length; j++) {
          if(this.state.efc.efcDependent[i][j].numberInCollege === this.state.userInputData.familyInCollege) {
            if(this.state.efc.efcDependent[i][j].numberInFamily === this.state.userInputData.familyMembers) {
              console.log(`FOUND: ${this.state.efc.efcDependent[i][j].incomeRanges[this.state.userInputData.householdIncome]}`);
              efc = this.state.efc.efcDependent[i][j].incomeRanges[this.state.userInputData.householdIncome];
              break; // NOTE: break out of loop, we found the figure we need
            }
          }
        }
      }
    } else {
      // NOTE: user is not a dependent, determine if they have children as dependents
      if(this.state.userInputData.childSupport === "yes") {
        // NOTE: user has no dependent children
        console.log("user is NOT dependent, but HAS dependent(s)");
        for(let i=0; i<this.state.efc.efcNotDependentButHasDependent.length; i++) {
          for(let j=0; j<this.state.efc.efcNotDependentButHasDependent[i].length; j++) {
            if(this.state.efc.efcNotDependentButHasDependent[i][j].numberInCollege === this.state.userInputData.familyInCollege) {
              if(this.state.efc.efcNotDependentButHasDependent[i][j].numberInFamily === this.state.userInputData.familyMembers) {
                console.log(`FOUND: ${this.state.efc.efcNotDependentButHasDependent[i][j].incomeRanges[this.state.userInputData.householdIncome]}`);
                efc = this.state.efc.efcNotDependentButHasDependent[i][j].incomeRanges[this.state.userInputData.householdIncome];
                break; // NOTE: break out of the loop, we found the figure we need
              }
            }
          } 
        } 
      } else {
        console.log("user is NOT dependent, and HAS NO dependents");
        // NOTE: user is not a dependent and has no dependent children
        for(let i=0; i<this.state.efc.efcNotDependentAndNoDependent.length; i++) {
          for(let j=0; j<this.state.efc.efcNotDependentAndNoDependent[i].length; j++) {
            if(this.state.efc.efcNotDependentAndNoDependent[i][j].numberInCollege === this.state.userInputData.familyInCollege) {
              if(this.state.efc.efcNotDependentAndNoDependent[i][j].numberInFamily === this.state.userInputData.familyMembers) {
                console.log(`FOUND: ${this.state.efc.efcNotDependentAndNoDependent[i][j].incomeRanges[this.state.userInputData.householdIncome]}`);
                efc = this.state.efc.efcNotDependentAndNoDependent[i][j].incomeRanges[this.state.userInputData.householdIncome];
                break; // NOTE: break out of the loop, we found the figure we need
              }
            }
          }
        }
      }
    }
   // NOTE: return the value for EFC that we found
    return efc;
  }

  // NOTE: calculate price of admission cost
  getPOA = () => {
    // NOTE: 0 = on campus, 1 = living on own, 2 = with family
    let livingStatus = this.state.userInputData.living; 
    let residencyState, poaIndexNumber;
    let calculatedPOAValues = {};

    if(this.state.userInputData.state === "New Jersey") {
      residencyState = 0;
    } else {
      residencyState = 1;
    }

    // NOTE: determine whether user is living on campus (NJ resident OR not), or off campus/NJ resident, OR off campus non NJ resident
    if(livingStatus === 0) {
      poaIndexNumber = 0; // the first element in the POA arrays 
    } else {
      if(residencyState === 0) {
        poaIndexNumber = 1;
      } else {
        poaIndexNumber = 2;
      }
    }
    //NOTE pull out the POA values we need to show
    calculatedPOAValues = {
      totalCost: this.state.poa.poatotaladmissioncost[poaIndexNumber],
      tuitionAndFees: this.state.poa.poatuitionfees[poaIndexNumber],
      booksSupplies: this.state.poa.poabookssupplies[poaIndexNumber],
      roomAndBoard: this.state.poa.poaroomboard[poaIndexNumber],
      otherExpenses: this.state.poa.poaotherexpenses[poaIndexNumber]
    };
    return calculatedPOAValues;
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
      return <AppCore generateReport={this.generateReport} saveStepData={this.saveStepData} currentStep={this.state.currentStep} handlePreviousButtonClick={this.handlePreviousButtonClick} changeHandler={this.changeHandler} userInputData={this.state.userInputData} />
    }
  }
}

export default App;
