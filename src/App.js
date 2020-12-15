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
      calculatedEFC: 0,
      disclaimerAccepted: false,
      currentStep: 0,
      efc: {},
      poa: {},
      pell: [],
      tag: [],
      merit: [],
      // NOTE: userInputData: object to capture all the user input for the calculations
      userInputData: {}
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

  returnToStart = () => {
    // NOTE: should retain previously entered values in state, but return user to first step
    this.setState({
      currentStep: 1,
      userInputData: {},
      calculatedEFC: 0
    });
  }

  // NOTE: an alternative way of pulling in all the data if the .json files are not bundled within the app at build time, but are hosted separately
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
    // NOTE: check if user's age <= 24 
    if(this.state.userInputData.age <= 24) {
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
    //console.log(dependent);
    return dependent;
  }

  // NOTE: generate the calculated report
  generateReport = () => {
    let EFCValue = this.getEFC();
    // NOTE: Tuition aid grant value is depenednt on EFC value
    // NOTE: TAG does not apply if student is not NJ resident
    let TAGValue = (this.state.userInputData.state === "New Jersey")? this.getTAG(EFCValue) : 0;
    let POAValue = this.getPOA();
    let PellValue = this.calculatePell(EFCValue);
    let NeedsBasedEFC = this.calculateNeedsBasedEFC(EFCValue, this.state.userInputData.currentGPA);
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
    console.log(`[TAG]: EFC=${efc}`);
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
    
    //console.log(`Number In Family: ${this.state.userInputData.familyMembers}`);
    // NOTE get dependency status of user
    if(this.determineDependency() === true) {
      // NOTE: user is a dependent
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
                //console.log(`FOUND: ${this.state.efc.efcNotDependentAndNoDependent[i][j].incomeRanges[this.state.userInputData.householdIncome]}`);
                efc = this.state.efc.efcNotDependentAndNoDependent[i][j].incomeRanges[this.state.userInputData.householdIncome];
                break; // NOTE: break out of the loop, we found the figure we need
              }
            }
          }
          // NOTE: the supplied data only goes up to 2 in family/2 in college for "Not Dependent/No Dependents", so we treat "2 and 2" as "2 (or more) in family - 2 (or more) in college"
          if((this.state.userInputData.familyInCollege > 2) || (this.state.userInputData.familyMembers > 2)) {
            efc = this.state.efc.efcNotDependentAndNoDependent[i][2].incomeRanges[this.state.userInputData.householdIncome];
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

  calculateNeedsBasedEFC = (efc, gpa) => {
    /* NOTE: Steps
    * - Determine Freshman (direct out of HS) or Transfer
    * - Determine state of current residence (NJ or non-NJ)
    * - the combination of the two will determine the table we look at
    *   - Freshman and NJ:      freshmanNeedsBasedEFCNJResident
    *   - Freshman and NON-NJ:  freshmanNeedsBasedEFCNonNJResident
    *   - Transfer and NJ:      transferNeedsBasedEFCNJResident
    *   - Transfer and NON-NJ:  transferNeedsBasedEFCNonNJResident
    */

    let calculatedNeedsEFC; // NOTE: our final needs EFC calculation result

    let table; // NOTE: the table we are pulling data from

    // NOTE: determine our residency status from user input
    let residencyStatus = (this.state.userInputData.state === "New Jersey") ? "resident" : "non-resident";
    //console.log(`Residency Status: ${residencyStatus}`)

    let hsOrTransfer = (this.state.userInputData.studentStatus === "highschool")? "freshman" : "transfer";
    //console.log(`HSorTransfer: ${hsOrTransfer}`);


    // NOTE: combine residency status and transfer status to determine the correct table

    if(residencyStatus === "resident") {
      if(hsOrTransfer === "freshman") {
        // NOTE: user is Freshman/NJ Resident
        table = this.state.efc.needsBasedEFC.freshmanNeedsBasedEFCNJResident;
        //console.log("freshmanNeedsBasedEFCNJResident");
      } else {
        // NOTE: user is Transfer/NJ Resident
        table = this.state.efc.needsBasedEFC.transferNeedsBasedEFCNJResident;
        //console.log("transferNeedsBasedEFCNJResident");
      }
    } else {
      if(hsOrTransfer === "freshman") {
        // NOTE: user is Freshman/NON-NJ Resident
        table = this.state.efc.needsBasedEFC.freshmanNeedsBasedEFCNonNJResident;
        //console.log("freshmanNeedsBasedEFCNonNJResident");
      } else {
        // NOTE: user is Transfer/NON-NJ Resident
        table = this.state.efc.needsBasedEFC.transferNeedsBasedEFCNonNJResident;
        //console.log("transferNeedsBasedEFCNonNJResident");
      }
    }
    //console.log(table);
    /* NOTE: we have our data table, now look up the value we need
     *
     * Whether the student is Freshman or Transfer determines the way we 
     * find the correct row:
     * 
     * - Freshman: [{EFC lower-bound}, {EFC upper-bound}, {merit amount}]
     * - Transfer: [{EFC lower-bound}, {EFC upper-bound}, 
     *              {merit amount if GPA less than 3.0}, {merit amount if GPA 3.
     *               0-3.49}, {merit amount if GPA >= 3.5}]
     */
    
    if(hsOrTransfer === "freshman") {
      // NOTE: user is Freshman, determine by what range their EFC amount falls in
      console.log("freshman");
      for(let r=0; r<table.length; r++) {
        if((efc >= table[r][0]) && (efc <= table[r][1])) {
          calculatedNeedsEFC = table[r][2];
          //console.log(calculatedNeedsEFC);
          break;
        } 
      }
    } else {
      // NOTE: user is Transfer, determine by EFC range AND GPA
      console.log("transfer student");
      for(let r=0; r<table.length; r++) {
        if((efc >= table[r][0]) && (efc <= table[r][1])) {
          // NOTE: found the row, now get amount based on GPA
          if(gpa < 3) {
            calculatedNeedsEFC = table[r][2];
            //console.log(calculatedNeedsEFC);
            break;
          }
          if((gpa >= 3) && (gpa <= 3.49)) {
            calculatedNeedsEFC = table[r][3];
            //console.log(calculatedNeedsEFC);
            break;
          }
          if(gpa >= 3.5) {
            calculatedNeedsEFC = table[r][4];
            //console.log(calculatedNeedsEFC);
            break;
          }
        }
      }
    }

    // NOTE: return our value
    //console.log(`Calculated Needs EFC: ${calculatedNeedsEFC}`);
    return calculatedNeedsEFC;
  }

  calculateMerit = () => {
    let meritData;
    let meritAwardValue = 0; // NOTE: this is our award amount we return
    let GPA = this.state.userInputData.currentGPA;
  
    // NOTE: first determine if user is freshman/current HS student or tansfer
    if(this.state.userInputData.studentStatus === "highschool") {
      //console.log("High School");
      // NOTE: user is current HS/incoming freshman, now determine if we are going by SAT or ACT
      //console.log(Object.keys(this.state.userInputData.scores));
      let useTestScores = (Object.keys(this.state.userInputData.scores).length)? true : false;
      
      if(useTestScores) {
        //NOTE: We are using SAT/ACT test scores to calculate
        
        let meritTestMode = (this.state.userInputData.scores.act) ? "act" : "sat";
        //console.log(meritTestMode);
    
        let satScore = 0, actScore = 0;
        
        // NOTE: get whichever score we need. 
        if(meritTestMode === "sat") {
          satScore = this.state.userInputData.scores.erwsat + this.state.userInputData.scores.mathsat;
          //console.log(satScore);
          meritData = this.state.merit.meritsat;  
        } else {
          // NOTE: use ACT instead of SAT
          actScore = this.state.userInputData.scores.act;
          meritData = this.state.merit.meritact;
          //console.log(`MERIT ACT Score: ${actScore}`);
        }
        // NOTE: based on which test score we have, find the row of data we need
        // NOTE: first compare test score to range of [i][0]-[i][1], then compare GPA to range of [i][2]-[i][3] and if both check out, [i][4] is your merit value
        if(meritTestMode === "sat") {
          for(let i=0; i<meritData.length; i++) {
            if((satScore >= meritData[i][0]) && (satScore <= meritData[i][1])) {
              if((GPA >= meritData[i][2]) && (GPA <= meritData[i][3])) {
                meritAwardValue = meritData[i][4];
                console.log(`SAT Range: ${meritData[i][0]} - ${meritData[i][1]}, GPA Range: ${meritData[i][2]} - ${meritData[i][3]}...Amount: ${meritData[i][4]}`);
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
              } // End For
            } // End If
          } // End If
        } 
      } else {
        console.log("No test scores, Using GPA")
        meritData = this.state.merit.testoptional;
        for(let i=0; i<meritData.length; i++) {
          if((GPA >= meritData[i][0]) && (GPA <= meritData[i][1])) {
            meritAwardValue = meritData[i][2];
            //console.log(meritAwardValue);
            return meritAwardValue;
          } // End if
        } // End For
      }
    } else {
        // NOTE: user is transfer student, go by GPA
        //console.log("Transfer");
        //console.log(`GPA: ${GPA}`);
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
    }, () => { /*console.log(`step data saved.`)*/});
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
      
      return <AppCore returnToStart={this.returnToStart} dependency={this.state.dependency} generateReport={this.generateReport} saveStepData={this.saveStepData} currentStep={this.state.currentStep} handlePreviousButtonClick={this.handlePreviousButtonClick} changeHandler={this.changeHandler} userInputData={this.state.userInputData} calculatedEFC={this.state.calculatedEFC} />
    }
  }
}

export default App;
