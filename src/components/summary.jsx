import React from 'react';


class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    // NOTE: compute the EFC amount
    this.setState({
      ...this.state,
      report: this.props.generateReport()
    });
  }

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
      case 0: output = "One"; break;
      case 1: output = "Two"; break;
      case 2: output = "Three or more"; break;
      default: output = "One";
    }
     return output;
  }
  
  render() {
    //console.log(this.state.report);
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
          <h4>Based on the information you have provided, the following calculations represent the average net price of attendance that students similar to you paid in the given year:</h4>
          <h5>Academic Year: 2019-2020</h5>
          <hr />
          <ul>
            <li><strong>Estimated Total Direct Cost: ${this.state.report.POA.totalCost.toFixed(2)}</strong></li>
            <ul>
              <li>Estimated Tuition and Fees: ${this.state.report.POA.tuitionAndFees.toFixed(2)}</li>
              <li>Estimated Room and Board: ${this.state.report.POA.roomAndBoard.toFixed(2)}</li>
            </ul>
            {/*<li>Expected Family Contribution: ${this.state.report.EFC.toFixed(2)}</li>
            <li>Needs Grant Based on EFC: ${this.state.report.NeedsBasedEFC.toFixed(2)}</li>
            <li>Merit Award: ${this.state.report.Merit.toFixed(2)}</li>
            <li>Tuition Aid Grant: ${this.state.report.TAG.toFixed(2)}</li>
            <li>Pell Grant Amount: ${this.state.report.Pell.toFixed(2)}</li>*/}
            <li>Estimated Total Grant Amount: ${this.state.report.Total.toFixed(2)} <br />(Includes both merit and need based aid from all sources - federal, state and institutional)</li>
            <li><strong>Estimated net price: ${(this.state.report.POA.totalCost - this.state.report.Total).toFixed(2)}</strong><br /> (Direct Cost minus grant aid)</li>
            <hr />
            <em>In addition to direct costs, you should plan to cover any additional indirect costs. Here are some approximate costs you should be aware of:</em> 
          </ul>
          <ul>
            <li>Books and Supplies: ${this.state.report.POA.booksSupplies.toFixed(2)}</li>
            <li>Other Expenses: ${this.state.report.POA.otherExpenses.toFixed(2)}</li>
            <li>Room and board (off-campus): $6000.00</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default Summary;