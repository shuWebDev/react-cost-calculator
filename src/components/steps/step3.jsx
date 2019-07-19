import React from 'react';

class Step3 extends React.Component {
  submitStepHandler = (event) => {
    //console.log("submitStepHandler");
    event.preventDefault();
    // NOTE: this will get the data off the form submitted
    const formData = new FormData(event.target);
    //console.log(formData);
    //let stepNumber = formData.get("stepNumber");
    let stepData = {
      familyMembers: Number(formData.get("familyMembers")),
      familyInCollege: Number(formData.get("familyInCollege")),
      householdIncome: Number(formData.get("householdIncome"))
    };
    this.props.saveStepData(stepData);
  }

  render() {
    return( 
      <section>
        <div className="row">
          <div className="medium-12 columns">
            <h3>Step 3</h3>
            <p>Based on the information you provided in previous steps, your dependency status is estimated to be <strong>{(this.props.dependency === 0)? "a Dependent" : "Not a Dependent"}</strong>.</p>
          </div>
          <hr />
          <form onSubmit={this.submitStepHandler}>
          <input type="hidden" id="stepNumber" name="stepNumber" value="3" />
            <div className="grid-container">
              <div className="grid-x grid-padding-x">
                <div className="medium-6 cell">
                  <label>
                    <strong>Number in family</strong>
                    <p>How many people are in your family&apos;s household? (Count yourself, your parent(s), and your parent(s)' other children who are under the age of 24)</p>
                    <fieldset name="familyMembers">
                      <input type="radio" name="familyMembers" value="2" id="familyMembersTwo" ref={this.input} defaultChecked /><label htmlFor="familyMembersTwo">Two</label><br />
                      <input type="radio" name="familyMembers" value="3" id="familyMembersThree" ref={this.input} /><label htmlFor="familyMembersThree">Three</label><br />
                      <input type="radio" name="familyMembers" value="4" id="familyMembersFour" ref={this.input} /><label htmlFor="familyMembersFour">Four</label><br />
                      <input type="radio" name="familyMembers" value="5" id="familyMembersFive" ref={this.input} /><label htmlFor="familyMembersFive">Five</label><br />
                      <input type="radio" name="familyMembers" value="6" id="familyMembersSixOrMore" ref={this.input} /><label htmlFor="familyMembersSixOrMore">Six Or More</label><br />
                    </fieldset>
                  </label>
                </div>
                <div className="medium-6 cell">
                  <label>
                    <strong>Number in college</strong>
                    <p>
                      Of the number in your family in the previous question, how many will be in college next year?<br />
                      (Count yourself and your siblings, but do not count your parents)
                    </p>
                    <fieldset name="familyInCollege">
                      <input type="radio" name="familyInCollege" value="1" id="familyInCollegeOne" ref={this.input} defaultChecked /><label htmlFor="familyInCollegeOne">One child</label><br />
                      <input type="radio" name="familyInCollege" value="2" id="familyInCollegeTwo" ref={this.input} /><label htmlFor="familyInCollegeTwo">Two children</label><br />
                      <input type="radio" name="familyInCollege" value="3" id="familyInCollegeThreePlus" ref={this.input} /><label htmlFor="familyInCollegeThreePlus">Three or more children</label><br />
                    </fieldset>
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="grid-container">
              <div className="grid-x grid-padding-x">
                <div className="medium-12 cell">
                  <label>
                    <strong>Household Income</strong>
                    <p>What is your household income?</p>
                    <ul>
                      <li>Include income earned by yourself and your parent(s).</li>
                      <li>Include income from work, child support, and other sources.</li>
                      <li>If your parent is single, separated, or divorced, include the income for the parent with whom you live.</li>
                      <li>If the parent with whom you live is remarried, include both your parent's income and his/her spouse's income.</li>
                    </ul>
                    <fieldset name="householdIncome">
                      <input type="radio" name="householdIncome" value="0" id="householdIncomeLT30k" ref={this.input} defaultChecked /><label htmlFor="householdIncomeLT30k">Less than $30,000</label><br />
                      <input type="radio" name="householdIncome" value="1" id="householdIncome30kTo40k" ref={this.input} /><label htmlFor="householdIncome30kTo40k">Between $30,000 - $39,999</label><br />
                      <input type="radio" name="householdIncome" value="2" id="householdIncome40kTo50k" ref={this.input} /><label htmlFor="householdIncome40kTo50k">Between $40,000 - $49,999</label><br />
                      <input type="radio" name="householdIncome" value="3" id="householdIncome50kTo60k" ref={this.input} /><label htmlFor="householdIncome50kTo60k">Between $50,000 - $59,999</label><br />
                      <input type="radio" name="householdIncome" value="4" id="householdIncome60kTo70k" ref={this.input} /><label htmlFor="householdIncome60kTo70k">Between $60,000 - $69,999</label><br />
                      <input type="radio" name="householdIncome" value="5" id="householdIncome70kTo80k" ref={this.input} /><label htmlFor="householdIncome70kTo80k">Between $70,000 - $79,999</label><br />
                      <input type="radio" name="householdIncome" value="6" id="householdIncome80kTo90k" ref={this.input} /><label htmlFor="householdIncome80kTo90k">Between $80,000 - $89,999</label><br />
                      <input type="radio" name="householdIncome" value="7" id="householdIncome90kTo100k" ref={this.input} /><label htmlFor="householdIncome90kTo100k">Between $90,000 - $99,999</label><br />
                      <input type="radio" name="householdIncome" value="8" id="householdIncomeAbove100k" ref={this.input} /><label htmlFor="householdIncomeAbove100k">Above $99,999</label><br />
                    </fieldset>
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="grid-container">
              <div className="grid-x grid-padding-x">
              <div className="medium-3 cell medium-offset-1">
                <button className="button" onClick={() => {this.props.handlePreviousButtonClick(3)}}>Previous Screen</button>
                </div>
                <div className="medium-3 cell medium-offset-3">
                <input type="submit" className="button" value="Save and Continue" />
                </div> 
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Step3;