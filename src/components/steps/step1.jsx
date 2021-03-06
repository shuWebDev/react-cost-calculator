import React from 'react';

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      testingChecked: true
    };
  }

  handleTestScoreInputChange = (event) => {
    // NOTE: if the user is inputting an ACT score, disable the SAT boxes, we only need one or the other not both.
    if(event.target.name === "actcomposite") {
      if(document.getElementsByName("actcomposite")[0].value.length) {
        document.getElementsByName("erwsat")[0].disabled = true;
        document.getElementsByName("mathsat")[0].disabled = true;
      } else {
        document.getElementsByName("erwsat")[0].disabled = false;
        document.getElementsByName("mathsat")[0].disabled = false;
      }
    } else {
      // NOTE: user is inputting either an SAT written or math score, disable the ACT box instead.
      if((document.getElementsByName("erwsat")[0].value.length) || (document.getElementsByName("mathsat")[0].value.length)) {
        document.getElementsByName("actcomposite")[0].disabled = true;
      } else {
        document.getElementsByName("actcomposite")[0].disabled = false;
      }
    }
  }

  submitStepHandler = (event) => {
    //console.log("submitStepHandler");
    event.preventDefault();
    // NOTE: this will get the data off the form submitted
    const formData = new FormData(event.target);
    //console.log(formData.get("actcomposite"));
    let scores;
    //let stepNumber = formData.get("stepNumber");

    // NOTE: Test scores are optional now, check to see if we are using them. If not, bypass this validity check
    if(this.state.testingChecked) {
      // NOTE: validate the Test Scores section
      // BOTH SAT scores OR the ACT Composite score
      if(!formData.get("actcomposite")) {
        if(formData.get("erwsat") && formData.get("mathsat")) {
          scores = {
           erwsat: Number(formData.get("erwsat")),
           mathsat: Number(formData.get("mathsat"))
          };
         document.querySelector(".form-validation-message").innerHTML = "";
       } else {
         document.querySelector(".form-validation-message").innerHTML = `<div class="callout alert"><p>Please enter a value for either ERW SAT AND Math SAT (both scores if SAT) OR Your Composite ACT score, whichever applies to you.</p></div>`;
          return; // exit the function, we can't save the data without a completed field
        } 
      } else {
        scores = {
         act: Number(formData.get("actcomposite"))
        };
        document.querySelector(".form-validation-message").innerHTML = "";
      }
    } else {
      // NOTE: we are NOT using testing to calculate, move along
      scores = {};
    }
    
    let stepData = {
      age: Number(formData.get("age")),
      living: Number(formData.get("living")),
      state: formData.get("state"),
      studentStatus: formData.get("hsOrTransfer"),
      currentGPA: Number(formData.get("currentGPA")),
      scores: scores
    };
    this.props.saveStepData(stepData);
  }

  toggleTestScoreEnabled(enabled) {
    if(enabled) {
      document.getElementsByName("actcomposite")[0].disabled = false;
      document.getElementsByName("mathsat")[0].disabled = false;
      document.getElementsByName("erwsat")[0].disabled = false;
    } else {
      document.getElementsByName("actcomposite")[0].disabled = true;
      document.getElementsByName("mathsat")[0].disabled = true;
      document.getElementsByName("erwsat")[0].disabled = true;
    }
  }

  testScoreCheckboxHandler = (event) => {
    this.setState({
      testingChecked: !this.state.testingChecked
    });
    //console.log(event.target.checked);
    this.toggleTestScoreEnabled(event.target.checked? true : false);
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
                        <label htmlFor="onCampus"><input type="radio" name="living" value="0" id="onCampus" ref={this.input} defaultChecked />On-campus (in a residence hall, dormitory, or on-campus apartment)</label><br />
                        <label htmlFor="parentsOrFamily"><input type="radio" name="living" value="2" id="parentsOrFamily" ref={this.input} />Living with my parents or other family members</label><br />
                        <label htmlFor="aloneOrRoommate"><input type="radio" name="living" value="1" id="aloneOrRoommate" ref={this.input} />Living on my own or with a roommate</label>
                      </fieldset>
                    </label>
                  </div>
                  <div className="medium-3 cell">
                    <label>
                      <strong>Are you a resident of New Jersey (where Seton Hall is located) or another US state or territory?</strong><br />
                      <select name="state">
                        <option value="New Jersey">New Jersey</option>
                        <option value="other">Other State/Territory</option>
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
                      <input name="currentGPA" type="number" step="0.001" min="0.000" max="4.000" defaultValue="0.000" onChange={() => {this.value = parseFloat(this.value).toFixed(3)}} />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="grid-container">
                  <h3>Test Scores</h3><small>(if applicable)</small>
                  <p>This cost calculator requires the SAT score based on the New version of the SAT. If your scores are from a test date that is earlier than March 2016, you will need to convert your scores before entering them in this calculator. To do so please go to the <a target="_blank" rel="noopener noreferrer" href="https://collegereadiness.collegeboard.org/sat/scores/understanding-scores/sat-score-converter">college board score converter</a> and use the Old to New Conversion tool.<br />
                  <strong>NOTE: This question is optional. </strong>
                  </p>
                  <div className="grid-x grid-padding-x">
                    <div className="medium-6 cell">
                      <label><strong>Use test scores?</strong> <input type="checkbox" checked={this.state.testingChecked} id="usetestscores" name="usetestscores" value="false" onChange={(e) => {this.testScoreCheckboxHandler(e)}} /></label>
                    </div>
                  </div>
                  <div className="grid-x grid-padding-x">
                    <div className="medium-6 cell">
                      <label>
                        <strong>What is your ERW SAT score?</strong>
                        <input onChange={this.handleTestScoreInputChange} type="text" name="erwsat" />
                      </label>
                    </div>
                    <div className="medium-6 cell">
                      <label>
                        <strong>What is your Math SAT score?</strong>
                        <input onChange={this.handleTestScoreInputChange} type="text" name="mathsat" />
                      </label>
                      <p>OR</p>
                      <label>
                        <strong>What is your ACT composite score?</strong>
                        <input onChange={this.handleTestScoreInputChange} type="text" name="actcomposite" />
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
                  {/* NOTE: since this is the first screen, we don't need to start over. */}
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