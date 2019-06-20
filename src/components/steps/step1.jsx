import React from 'react';

class Step1 extends React.Component {
  
  // NOTE: Send current step's data back to root
  handleStepSaveClick = (event) => {
    event.preventDefault();
    this.props.submitStepDataUpdate(1,{data: "my data here"});
  }

  // NOTE: handle clicking the Previous button (step back a screen)
  /*stepPrevious = (event) => {
    event.preventDefault();
    this.props.handlePreviousButtonClick(1);
  }*/

  render() {
    return( 
      <section>
        <div className="row">
          <div className="medium-12 columns">
            <h3>Step 1</h3>
            <p>
              Please provide the requested information. Your responses will be used to calculate an estimated amount that students like you paid - after grant aid and scholarships but before student loans - to attend this institution in a given year.
            </p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="medium-12 columns">
            <form>
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <div className="medium-2 cell">
                    <label><strong>How old are you?</strong>
                      <input name="age" type="number" min="15" step="1" />
                    </label>
                  </div>
                  <div className="medium-6 cell medium-offset-1">
                    <label>
                      <strong>Living Arrangement</strong><br />
                      <p>Where do you plan to live while attending this institution?</p>
                      <fieldset>
                        <input type="radio" name="living" value="onCampus" id="onCampus"/><label htmlFor="onCampus">On-campus (in a residence hall, dormitory, or on-campus apartment)</label><br />
                        <input type="radio" name="living" value="parentsOrFamily" id="parentsOrFamily" /><label htmlFor="parentsOrFamily">Living with my parents or other family members</label><br />
                        <input type="radio" name="living" value="aloneOrRoommate" id="aloneOrRoommate" /><label htmlFor="aloneOrRoommate">Living on my own or with a roommate</label>
                      </fieldset>
                    </label>
                  </div>
                  <div className="medium-3 cell">
                    <label>
                      <strong>What is your state of residency?</strong><br />
                      <select>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New York">New York</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <div className="medium-6 cell">
                    <label>
                      <strong>Are you a High School or Transfer Student?</strong><br />
                      <p>Are you applying as a current High School Student or transferring from a different college?</p>
                      <fieldset>
                        <input type="radio" name="hsOrTransfer" value="highschool" id="highschool"/><label htmlFor="highschool">Current High School Student</label><br />
                        <input type="radio" name="hsOrTransfer" value="transfer" id="transfer" /><label htmlFor="transfer">Transfer Student</label>
                      </fieldset>
                    </label>
                  </div>
                  <div className="medium-2 cell medium-offset-3">
                    <label>
                      <strong>Current GPA</strong>
                      <p>What is your current GPA?</p>
                      <input name="currentGPA" type="number" step="0.01" min="0.0" />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="grid-container">
                  <h3>Test Scores</h3><small>(if applicable)</small>
                  <p>This cost calculator requires the SAT score based on the New version of the SAT. If your scores are from a test date that is earlier than March 2016, you will need to convert your scores before entering them in this calculator. To do so please go to the <a target="_blank" rel="noopener noreferrer" href="https://collegereadiness.collegeboard.org/sat/scores/understanding-scores/sat-score-converter">college board score converter</a> and use the Old to New Conversion tool.</p>
                  <div className="grid-x grid-padding-x">
                    <div className="medium-6 cell">
                      <label>
                        <strong>What is your ERW SAT score?</strong>
                        <input type="text" name="erwsat" />
                      </label>
                    </div>
                    <div className="medium-6 cell">
                      <label>
                        <strong>What is your Math SAT score?</strong>
                        <input type="text" name="mathsat" />
                      </label>
                      <p>OR</p>
                      <label>
                        <strong>What is your ACT composite score?</strong>
                        <input type="text" name="actcomposite" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <div className="medium-3 cell medium-offset-5">
                    <button className="button" onClick={this.handleStepSaveClick}>Save and Continue</button>
                  </div>
                  {/* NOTE: since this is the first screen, we can't go back further, no Previous button here. */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Step1;