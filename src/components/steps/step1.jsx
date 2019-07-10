import React from 'react';

class Step1 extends React.Component {
  
  submitStepHandler = (event) => {
    //console.log("submitStepHandler");
    event.preventDefault();
    // NOTE: this will get the data off the form submitted
    const formData = new FormData(event.target);
    let scores, stepNumber = formData.get("stepNumber");

    // NOTE: validate the Test Scores section
    // BOTH SAT scores OR the ACT Composite score
    if(!formData.get("actcomposite")) {
      if(formData.get("erwsat") && formData.get("mathsat")) {
        scores = {
          erwsat: parseInt(formData.get("erwsat")),
          mathsat: parseInt(formData.get("mathsat"))
        };
        document.querySelector(".form-validation-message").innerHTML = "";
      } else {
        document.querySelector(".form-validation-message").innerHTML = `<div class="callout alert"><p>Please enter a value for either ERW SAT AND Math SAT (both scores if SAT) OR Your Composite ACT score, whichever applies to you.</p></div>`;
        return; // exit the function, we can't save the data without a completed field
      } 
    } else {
      scores = {
        act: parseInt(formData.get("actcomposite"))
      };
      document.querySelector(".form-validation-message").innerHTML = "";
    }
    
    let stepData = {
      age: Number(formData.get("age")),
      living: formData.get("living"),
      state: formData.get("state"),
      studentStatus: formData.get("hsOrTransfer"),
      currentGPA: Number(parseFloat(formData.get("currentGPA")).toFixed(2)),
      scores: scores
    };
    //console.log(`${stepNumber}`);
    //console.log(stepData);
    this.props.saveStepData(stepData);
  }

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
            <form onSubmit={this.submitStepHandler}>
              <input type="hidden" id="stepNumber" name="stepNumber" value="1" />
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <div className="medium-2 cell">
                    <label><strong>How old are you?</strong>
                      <input id="studentAge" name="age" type="number" min="15" step="1" defaultValue="17" ref={this.input} />
                    </label>
                  </div>
                  <div className="medium-6 cell medium-offset-1">
                    <label>
                      <strong>Living Arrangement</strong><br />
                      <p>Where do you plan to live while attending this institution?</p>
                      <fieldset>
                        <input type="radio" name="living" value="onCampus" id="onCampus" ref={this.input} defaultChecked /><label htmlFor="onCampus">On-campus (in a residence hall, dormitory, or on-campus apartment)</label><br />
                        <input type="radio" name="living" value="parentsOrFamily" id="parentsOrFamily" ref={this.input} /><label htmlFor="parentsOrFamily">Living with my parents or other family members</label><br />
                        <input type="radio" name="living" value="aloneOrRoommate" id="aloneOrRoommate" ref={this.input} /><label htmlFor="aloneOrRoommate">Living on my own or with a roommate</label>
                      </fieldset>
                    </label>
                  </div>
                  <div className="medium-3 cell">
                    <label>
                      <strong>What is your state of residency?</strong><br />
                      <select name="state">
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
                      <label htmlFor="highschool"><input type="radio" name="hsOrTransfer" value="highschool" id="highschool" ref={this.input} defaultChecked/>Current High School Student</label>
                      <br />
                      <label htmlFor="transfer"><input type="radio" name="hsOrTransfer" value="transfer" id="transfer" ref={this.input} />Transfer Student</label>
                      </fieldset>
                    </label>
                  </div>
                  <div className="medium-2 cell medium-offset-3">
                    <label>
                      <strong>Current GPA</strong>
                      <p>What is your current GPA?<br />(unweighted, on a 4.0 scale)</p>
                      <input name="currentGPA" type="number" step="0.01" min="0.00" max="4.00" defaultValue="0.00" onChange={() => {this.value = parseFloat(this.value).toFixed(2)}} />
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
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <div className="medium-12 cell form-validation-message">
                    {/* Any form validation messages will output here */}
                  </div>
                </div>
              </div>
              <hr />
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <div className="medium-3 cell medium-offset-5">
                    <input type="submit" className="button" value="Submit and Continue" />
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