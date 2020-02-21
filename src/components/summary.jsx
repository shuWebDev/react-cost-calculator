import React from 'react';


class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    // NOTE: compute the EFC amount
    let reportData = this.props.generateReport();
    this.setState({
      ...this.state,
      report: reportData
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
      case 2: output = "Two"; break;
      case 3: output = "Three";  break;
      case 4: output = "Four"; break;
      case 5: output = "Five"; break;
      case 6: output = "Six or more"; break;
      default: output = "Two"; break;
    }
     return output;
  }

  resolveInCollege = (numInCollege) => {
    let output = "";
    switch(numInCollege) {
      case 1: output = "One"; break;
      case 2: output = "Two"; break;
      case 3: output = "Three or more"; break;
      default: output = "One";
    }
     return output;
  }

  resolveLivingArrangement = (living) => {
    switch(living) {
      case 1: return "Living with my parents or other family members";
      case 2: return "Living on my own or with a roommate";
      default: return "Living On Campus";
    }
  }
  
  render() {
    if(typeof this.state.report !== "undefined") {
      return (
        <div>
          <section>
            <div className="row">
              <div className="medium-12 columns">
                <h3>Summary</h3>
                <p>
                  Review the information you have provided. You can click Modify to return to Step 1 and edit this information, or if you are happy with the current selections, click Generate Report to receive your estimated net price.
                </p>
                <ul>
                  <li>Age: {this.props.userInputData.age}</li>
                  <li>Living Arrangement: {this.resolveLivingArrangement(this.props.userInputData.living)}</li>
                  <li>State of residency: {this.props.userInputData.state}</li>
                  <li>GPA: {this.props.userInputData.currentGPA}</li>
                  <li>ERW SAT: {this.props.userInputData.scores.erwsat || "N/A"}</li>
                  <li>Math SAT: {this.props.userInputData.scores.mathsat || "N/A"}</li>
                  <li>ACT Score: {this.props.userInputData.scores.act || "N/A"}</li>
                  <li>Transfer Status: {(this.props.userInputData.studentStatus === "highschool")? "High School" : "Transfer Student"}</li>
                  <li>Martial Status: {this.props.userInputData.marital}</li>
                  <li>Supporting Children: {this.props.userInputData.childSupport}</li>
                  <li>Number in family: {this.resolveFamilyMembers(this.props.userInputData.familyMembers)}</li>
                  <li>Number in college: {this.resolveInCollege(this.props.userInputData.familyInCollege)}</li>
                  <li>Household income: {this.resolveIncome(this.props.userInputData.householdIncome)}</li>
                </ul>
              </div>
            </div>
          </section>
          <div className="row">
            <button className="medium-2 columns medium-push-4 button" onClick={() => {document.getElementById("report-output").style.display = "block";}}>Generate Report</button>
          </div>
          <section style={{"display": "none"}} id="report-output">
            <div className="row">
              <div className="medium-12 columns">
                <h4>Based on the information you have provided, the following calculations represent the average net price of attendance that students similar to you paid in the given year:</h4>
                <h5>Academic Year: 2019-2020</h5>
                <hr />
                <ul>
                  <li><strong>Estimated Total Direct Cost: ${this.state.report.POA.totalCost.toFixed(2)}</strong>
                    <ul>
                      <li>Estimated Tuition and Fees: ${this.state.report.POA.tuitionAndFees.toFixed(2)}</li>
                      <li>Estimated Room and Board: ${this.state.report.POA.roomAndBoard.toFixed(2)}</li>
                    </ul>
                  </li>
                  <li><strong>Estimated Total Grant Amount: ${this.state.report.Total.toFixed(2)}</strong> <br />(Includes both merit and need based aid from all sources - federal, state and institutional)</li>
                  <li><strong>Estimated net price: ${(this.state.report.POA.totalCost - this.state.report.Total).toFixed(2)}</strong><br /> (Direct Cost minus grant aid)</li>
                  <hr />
                  <em>In addition to direct costs, you should plan to cover any additional indirect costs. Here are some approximate costs you should be aware of:</em> 
                </ul>
                <ul>
                  <li>Books and Supplies: $1000</li>
                  <li>Other Expenses: $2200</li>
                  <li>Room and board (off-campus): $6000.00</li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="medium-12 columns">
                <p>Please Note: The estimates above apply to full-time, first-time degree/certificate-seeking undergraduate students only. This estimate is based on an expected family contribution (EFC) of <strong>${this.state.report.EFC}</strong>. Your actual EFC will be determined each year by filing the FAFSA.<br />
                These estimates do not represent a final determination, or actual award, of financial assistance or a final net price; they are only estimates based on price of attendance and financial aid provided to students in 2019-2020. Price of attendance and financial aid availability change year to year. These estimates shall not be binding on the Secretary of Education, the institution of higher education, or the State. <br />
                Not all students receive financial aid. In 2019-2020, 92% of our full-time students enrolling for college for the first time received grant/scholarship aid. Students may also be eligible for student loans and work-study. Students must complete the Free Application for Federal Student Aid (FAFSA) in order to determine their eligibility for Federal financial aid that includes Federal grant, loan, or work-study assistance. For more information on applying for Federal student aid, go to http://www.fafsa.ed.gov/</p>
              </div>
            </div>
            <div className="row">
              <div className="medium-2 columns medium-push-4">
                <button className="button" onClick={this.props.returnToStart}>Start Over</button>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default Summary;