import React from 'react';
import Intro from './components/intro';
import AppCore from './components/appcore';
import * as EFCData from "./data/efc.json";
import * as POAData from "./data/poa.json";
import * as PellData from "./data/pell.json";
import * as TAGData from "./data/tag.json";
import * as MeritData from "./data/merit.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disclaimerAccepted: false,
      currentStep: 0,
      efc: {},
      poa: {},
      pell: [],
      tag: [],
      merit: [],
      // NOTE: userInputData: object to capture all the user input for the calculations
      userInputData: {},
    };
  }

  loadData = () => {
    this.setState({
      efc: EFCData.default,
      poa: POAData.default,
      pell: PellData.default,
      tag: TAGData.default,
      merit: MeritData.default
    });
    return;
  }

  /*fetchAllData = () => {
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
  }*/

  componentWillMount() {
    this.loadData();
  }

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
    let PellValue = this.calculatePell(EFCValue);
    let NeedsBasedEFC = this.calculateNeedsBasedEFC(EFCValue);
    let Merit = this.calculateMerit();
    let totalGrant = TAGValue + PellValue + NeedsBasedEFC + Merit;
    
    let calculationReport = {
      EFC: EFCValue,
      TAG: TAGValue,
      POA: POAValue,
      Pell: PellValue,
      NeedsBasedEFC: NeedsBasedEFC,
      Merit: Merit,
      Total: totalGrant
    };
    return calculationReport;
  }

  // NOTE: calculate Pell grant amount
  calculatePell = (efc) => {
    let pell = this.state.pell; // NOTE: values from pell.json
    let calculatedPell = 0;

    for(let i=0; i<pell.length; i++) {
      if((efc >= pell[i][0]) && efc <= pell[i][1]) {
        calculatedPell = pell[i][2];
        break;
      }
    }
    return calculatedPell;
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
              //console.log(`FOUND: ${this.state.efc.efcDependent[i][j].incomeRanges[this.state.userInputData.householdIncome]}`);
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
        //console.log("user is NOT dependent, but HAS dependent(s)");
        for(let i=0; i<this.state.efc.efcNotDependentButHasDependent.length; i++) {
          for(let j=0; j<this.state.efc.efcNotDependentButHasDependent[i].length; j++) {
            if(this.state.efc.efcNotDependentButHasDependent[i][j].numberInCollege === this.state.userInputData.familyInCollege) {
              if(this.state.efc.efcNotDependentButHasDependent[i][j].numberInFamily === this.state.userInputData.familyMembers) {
                //console.log(`FOUND: ${this.state.efc.efcNotDependentButHasDependent[i][j].incomeRanges[this.state.userInputData.householdIncome]}`);
                efc = this.state.efc.efcNotDependentButHasDependent[i][j].incomeRanges[this.state.userInputData.householdIncome];
                break; // NOTE: break out of the loop, we found the figure we need
              }
            }
          } 
        } 
      } else {
        //console.log("user is NOT dependent, and HAS NO dependents");
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

  calculateNeedsBasedEFC = (efc) => {
    let SATrange = {
      lower: 1120,
      upper: 1310
    };

    let ACTrange = {
      lower: 22,
      upper: 27
    };

    let needTestMode = (this.state.userInputData.scores.act) ? "act" : "sat";
    let residencyStatus = (this.state.userInputData.state === "New Jersey") ? "resident" : "non-resident";
    let HSorTransfer = this.state.userInputData.studentStatus;
    let calculatedNeedsEFC; // NOTE: our final needs EFC calculation result
    
    let satScore = 0, actScore = 0;
    // NOTE: get whichever score we need. 
    if(needTestMode === "sat") {
      satScore = this.state.userInputData.scores.erwsat + this.state.userInputData.scores.mathsat; 
    } else {
      actScore = this.state.userInputData.scores.act;
    }
    
    let GPA = this.state.userInputData.currentGPA;
    let needsData; // NOTE: will hold the data we look up on based on combination of residency status and HS student or transfer
    // NOTE: determine HS or Transfer
    if(HSorTransfer === "highschool") {
      // NOTE: determine residency
      if(residencyStatus === "New Jersey") {
      // NOTE: determine if we have ACT or SAT data to work with
        needsData = (needTestMode === "act") ? this.state.efc.needsBasedEFC.efcactnjresident : this.state.efc.needsBasedEFC.efcsatnonresident;
      } else {
        // NOTE: user is highschool but non-resident
        needsData = (needTestMode === "act") ? this.state.efc.needsBasedEFC.efcactnonresident : this.state.efc.needsBasedEFC.efcsatnonresident;
      }
    } else {
      // NOTE: user is transfer
      if (residencyStatus === "New Jersey") {
        // NOTE: user is transfer AND NJ resident
        needsData = this.state.efc.needsBasedTransfer.efcGPATransferResident;
      } else {
        // NOTE: user is transfer and non-resident
        needsData = this.state.efc.needsBasedTransfer.efcGPATransferNonResident;
      }
    }

    // NOTE: now using the proper table we determined above, look up the values
    // Based on GPA: [efc-range-lower, efc-range-upper, (gpa < 2.999)value, (gpa 3.0 - 3.499) value, (gpa 3.5+) value]
    // Based on SAT/ACT (combine SAT scores first): [efc-range-lower, efc-range-upper, (ACT/SAT <= lower bound) value, (ACT/SAT between lower and upper bounds)value (inclusive), (ACT/SAT > upper bound)value]
    
    for(let i=0; i<needsData.length; i++) {
      // NOTE: find the row we need, based on if efc is between the range of first 2 values in array. the 3rd-5th values are needs values based on test score range
      if((efc >= needsData[i][0]) && (efc <= needsData[i][1])) {
        if(HSorTransfer === "highschool") {
          // NOTE: freshmen are based on SAT/ACT score, transfers based on GPA
          if(needTestMode === "act") {
            if((actScore <= ACTrange.lower)) {
              calculatedNeedsEFC = needsData[i][2];
              return calculatedNeedsEFC;
            }
            if((actScore > ACTrange.lower) && (actScore < ACTrange.upper)) {
              calculatedNeedsEFC = needsData[i][3];
              return calculatedNeedsEFC;
            }
            if((actScore >= ACTrange.upper)) {
              calculatedNeedsEFC = needsData[i][4];
              return calculatedNeedsEFC;
            }
          } else {
            // NOTE: user provided SAT score so we're using that instead of ACT to determine
            if((satScore <= SATrange.lower)) {
              calculatedNeedsEFC = needsData[i][2];
              return calculatedNeedsEFC;
            }
            if((satScore > SATrange.lower) && (satScore < SATrange.upper)) {
              calculatedNeedsEFC = needsData[i][3];
              return calculatedNeedsEFC;
            }
            if((satScore >= SATrange.upper)) {
              calculatedNeedsEFC = needsData[i][4];
              return calculatedNeedsEFC;
            }
          }
        }
      } else {
        // NOTE: user is a transfer student, this data uses incoming GPA instead of test scores
        for(let i=0; i<needsData.length; i++) {
          if((efc >= needsData[i][0]) && (efc <= needsData[i][1])) {
            if(GPA <= 2.999) {
              calculatedNeedsEFC = needsData[i][2];
              return calculatedNeedsEFC;
            }
            if((GPA >= 3.0) && (GPA < 3.499)) {
              calculatedNeedsEFC = needsData[i][3];
              return calculatedNeedsEFC;
            }
            if(GPA >= 3.5) {
              calculatedNeedsEFC = needsData[i][4];
              return calculatedNeedsEFC;
            }
          }
        } 
      }
    }
  }

  calculateMerit = () => {
    let meritData;
    let meritAwardValue = 0; // NOTE: this is our award amount we return
    let GPA = this.state.userInputData.currentGPA;

    // NOTE: first determine if user is freshman/current HS student or tansfer
    if(this.state.userInputData.studentStatus === "highschool") {
      // NOTE: user is current HS/incoming freshman, now determine if we are going by SAT or ACT
      let meritTestMode = (this.state.userInputData.scores.act) ? "act" : "sat";
      let satScore = 0, actScore = 0;
      
      // NOTE: get whichever score we need. 
      if(meritTestMode === "sat") {
        satScore = this.state.userInputData.scores.erwsat + this.state.userInputData.scores.mathsat;
        meritData = this.state.merit.meritsat;
        console.log(`MERIT SAT Score: ${satScore}`);
      } else {
        // NOTE: use ACT instead of SAT
        actScore = this.state.userInputData.scores.act;
        meritData = this.state.merit.meritact;
        console.log(`MERIT ACT Score: ${actScore}`);
      }
      console.log(`MERIT GPA: ${GPA}`);
      // NOTE: based on which test score we have, find the row of data we need
      // NOTE: first compare test score to range of [i][0]-[i][1], then compare GPA to range of [i][2]-[i][3] and if both check out, [i][4] is your merit value
      if(meritTestMode === "sat") {
        for(let i=0; i<meritData.length; i++) {
          if((satScore >= meritData[i][0]) && (satScore <= meritData[i][1])) {
            if((GPA >= meritData[i][2]) && (GPA <= meritData[i][3])) {
              meritAwardValue = meritData[i][4];
              return meritAwardValue;
            }
          }
        }
      } else {
        // NOTE: we're using ACT to determine instead
        for(let i=0; i<meritData.length; i++) {
          if((actScore >= meritData[i][0]) && (actScore <= meritData[i][1])) {
            if((GPA >= meritData[i][2]) && (GPA <= meritData[i][3])) {
              meritAwardValue = meritData[i][4];
              return meritAwardValue;
            }
          }
        }
      }
    } else {
      // NOTE: user is transfer student, go by GPA
      meritData = this.state.merit.merittransfer;
      for(let i=0; i<meritData.length; i++) {
        if((GPA >= meritData[i][0]) && (GPA <= meritData[i][1])) {
          meritAwardValue = meritData[i][2];
          return meritAwardValue;
        }
      }
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
      return <AppCore dependency={this.state.dependency} generateReport={this.generateReport} saveStepData={this.saveStepData} currentStep={this.state.currentStep} handlePreviousButtonClick={this.handlePreviousButtonClick} changeHandler={this.changeHandler} userInputData={this.state.userInputData} />
    }
  }
}

export default App;
