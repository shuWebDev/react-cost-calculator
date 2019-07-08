import React from 'react';

class Summary extends React.Component {
  
  resolveIncome = (incomeLevel) => {
    let output = "";
    switch(incomeLevel) {
      case 0: output =  "Less than $30,000"; break;
      case 1: output =  "Between $30,000 and $39,999"; break;
      case 2: output =  "Between $40,000 and $49,999"; break;
      case 3: output =  "Between $50,000 and $59,999"; break;
      case 4: output =  "Between $60,000 and $69,999"; break;
      case 5: output =  "Between $70,000 and $79,999"; break;
      case 6: output =  "Between $80,000 and $89,999"; break;
      case 7: output =  "Between $90,000 and $99,999"; break;
      case 8: output =  "More than $99,999"; break;
      default: output =  "Less than $30,000"; break;
    }

    return output;
  }

  resolveFamilyMembers = (fm) => {
    let output = "";
    switch(fm) {
      case 0: output = "Two"; break;
      case 1: output = "Three";  break;
      case 2: output = "Four"; break;
      case 3: output = "Five"; break;
      case 4: output = "Six or more"; break;
      default: output = "Two"; break;
    }
     return output;
  }

  resolveInCollege = (numInCollege) => {
    let output = "";
    switch(numInCollege) {
      case 0: output = "One";
      case 1: output = "Two";
      case 2: output = "Three or more";
      default: output = "One";
    }
     return output;
  }
  
  render() {
    return (
      <section>
        <div className="row">
          <div className="medium-12 columns">
            <h3>Summary</h3>
            <p>
              Review the information you have provided. You can click Modify to return to Step 1 and edit this information, or if you are happy with the current selections, click Continue to receive your estimated net price.
            </p>
          </div>
          <ul>
            <li>Financial Aid: </li>
            <li>Age: {this.props.userInputData.age}</li>
            <li>Living Arrangement: {this.props.userInputData.living}</li>
            <li>State of residency: {this.props.userInputData.state}</li>
            <li>GPA: {this.props.userInputData.currentGPA}</li>
            <li>ERW SAT: {this.props.userInputData.scores.erwsat || "N/A"}</li>
            <li>Math SAT: {this.props.userInputData.scores.mathsat || "N/A"}</li>
            <li>ACT Score: {this.props.userInputData.scores.act || "N/A"}</li>
            <li>Transfer Status: {this.props.userInputData.studentStatus}</li>
            <li>Martial Status: {this.props.userInputData.marital}</li>
            <li>Supporting Children: {this.props.userInputData.childSupport}</li>
            <li>Number in family: {this.resolveFamilyMembers(this.props.userInputData.familyMembers)}</li>
            <li>Number in college: {this.resolveInCollege(this.props.userInputData.familyInCollege)}</li>
            <li>Household income: {this.resolveIncome(this.props.userInputData.householdIncome)}</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default Summary;