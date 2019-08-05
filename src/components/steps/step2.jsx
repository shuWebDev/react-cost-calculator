import React from 'react';

class Step2 extends React.Component {
  submitStepHandler = (event) => {
    event.preventDefault();
    // NOTE: this will get the data off the form submitted
    const formData = new FormData(event.target);
    let stepData = {
      marital: formData.get("marital"),
      childSupport: formData.get("primaryChildSupport")
    };
    
    this.props.saveStepData(stepData);
  }

  render() {
    return( 
      <section>
        <div className="row">
          <div className="medium-12 columns">
            <h3>Step 2</h3>
            <p>Please provide the following information</p>
          </div>
          <hr />
          <form onSubmit={this.submitStepHandler}>
            <input type="hidden" id="stepNumber" name="stepNumber" value="2" />
            <div className="grid-container">
              <div className="grid-x grid-padding-x">
                <div className="medium-6 cell">
                  <label>
                    <strong>Marital Status</strong>
                    <p>
                      Are you (the student) married?<br />
                      (Answer "yes" if separated but not divorced.)
                    </p>
                    <fieldset>
                      <input type="radio" name="marital" value="no" id="maritalNo" ref={this.input} defaultChecked /><label htmlFor="maritalNo">No</label><br />
                      <input type="radio" name="marital" value="yes" id="maritalYes" ref={this.input}  /><label htmlFor="maritalYes">Yes</label>
                    </fieldset>
                  </label>
                </div>
                <div className="medium-6 cell">
                  <label>
                    <strong>Children</strong>
                    <p>Are you (the student) the primary source of financial support for any children?</p>
                    <fieldset>
                      <input type="radio" name="primaryChildSupport" value="no" id="primaryChildSupportNo" ref={this.input} defaultChecked /><label htmlFor="primaryChildSupportNo">No</label><br />
                      <input type="radio" name="primaryChildSupport" value="yes" id="primaryChildSupportYes" ref={this.input} /><label htmlFor="primaryChildSupportYes">Yes</label>
                    </fieldset>
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="grid-container">
              <div className="grid-x grid-padding-x">
              <div className="medium-3 cell medium-offset-1">
                <button className="button" onClick={this.props.returnToStart}>Start Over</button>
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

export default Step2;