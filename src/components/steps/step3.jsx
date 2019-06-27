import React from 'react';

class Step3 extends React.Component {
  
  render() {
    return( 
      <section>
        <div className="row">
          <div className="medium-12 columns">
            <h3>Step 3</h3>
            <p>Based on the information you provided in previous steps, your dependency status is estimated to be <strong>Dependent</strong>.</p>
          </div>
          <hr />
          <form>
            <div className="grid-container">
              <div className="grid-x grid-padding-x">
                <div className="medium-6 cell">
                  <label>
                    <strong>Number in family</strong>
                    <p>How many people are in your family&apos;s household? (Count yourself, your parents(s), and your parents' other children who are under the age of 24)</p>
                    <fieldset name="familyMembers">
                      <input type="radio" name="familyMembersTwo" value="two" id="familyMembersTwo" /><label htmlFor="familyMembersTwo">Two</label><br />
                      <input type="radio" name="familyMembersThree" value="three" id="familyMembersThree" /><label htmlFor="familyMembersThree">Three</label><br />
                      <input type="radio" name="familyMembersFour" value="four" id="familyMembersFour" /><label htmlFor="familyMembersFour">Four</label><br />
                      <input type="radio" name="familyMembersFive" value="five" id="familyMembersFive" /><label htmlFor="familyMembersFive">Five</label><br />
                      <input type="radio" name="familyMembersSixOrMore" value="sixormore" id="familyMembersSixOrMore" /><label htmlFor="familyMembersSixOrMore">Six Or More</label><br />
                    </fieldset>
                  </label>
                </div>
                <div className="medium-6 cell">
                  <label>
                    <strong>Number in college</strong>
                    <p>
                      Of the number in your family int he previous question, how many will be in college next year?<br />
                      (Count yourself and your siblings, but do not count your parents)
                    </p>
                    <fieldset name="familyInCollege">
                      <input type="radio" name="familyInCollegeOne" value="one" id="familyInCollegeOne" /><label htmlFor="familyInCollegeOne">One child</label><br />
                      <input type="radio" name="familyInCollegeTwo" value="two" id="familyInCollegeTwo" /><label htmlFor="familyInCollegeTwo">Two children</label><br />
                      <input type="radio" name="familyInCollegeThreePlus" value="threeplus" id="familyInCollegeThreePlus" /><label htmlFor="familyInCollegeThreePlus">Three or more children</label><br />
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
                      <input type="radio" name="householdIncomeLT30k" value="lessthan30k" id="householdIncomeLT30k" /><label htmlFor="householdIncomeLT30k">Less than $30,000</label><br />
                      <input type="radio" name="householdIncome30kTo40k" value="30kto40k" id="householdIncome30kTo40k" /><label htmlFor="householdIncome30kTo40k">Between $30,000 - $39,999</label><br />
                      <input type="radio" name="householdIncome40kTo50k" value="40kto50k" id="householdIncome40kTo50k" /><label htmlFor="householdIncome40kTo50k">Between $40,000 - $49,999</label><br />
                      <input type="radio" name="householdIncome50kTo60k" value="50kto60k" id="householdIncome50kTo60k" /><label htmlFor="householdIncome50kTo60k">Between $50,000 - $59,999</label><br />
                      <input type="radio" name="householdIncome60kTo70k" value="60kto70k" id="householdIncome60kTo70k" /><label htmlFor="householdIncome60kTo70k">Between $60,000 - $69,999</label><br />
                      <input type="radio" name="householdIncome70kTo80k" value="70kto80k" id="householdIncome70kTo80k" /><label htmlFor="householdIncome70kTo80k">Between $70,000 - $79,999</label><br />
                      <input type="radio" name="householdIncome80kTo90k" value="80kto90k" id="householdIncome80kTo90k" /><label htmlFor="householdIncome80kTo90k">Between $80,000 - $89,999</label><br />
                      <input type="radio" name="householdIncome90kTo100k" value="90kto100k" id="householdIncome90kTo100k" /><label htmlFor="householdIncome90kTo100k">Between $90,000 - $99,999</label><br />
                      <input type="radio" name="householdIncomeAbove100k" value="above100k" id="householdIncomeAbove100k" /><label htmlFor="householdIncomeAbove100k">Above $99,999</label><br />
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
                  <button className="button" onClick={() => { this.props.submitStepDataUpdate(3, {stepData: "my data here."})}}>Save and Continue</button>
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