import React from 'react';

class Step2 extends React.Component {
  
  render() {
    return( 
      <section>
        <div className="row">
          <div className="medium-12 columns">
            <h3>Step 2</h3>
            <p>Please provide the following information</p>
          </div>
          <hr />
          <form>
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
                      <input type="radio" name="marital" value="yes" id="maritalYes"/><label htmlFor="maritalYes">Yes</label><br />
                      <input type="radio" name="marital" value="no" id="maritalNo"/><label htmlFor="maritalNo">No</label>
                    </fieldset>
                  </label>
                </div>
                <div className="medium-6 cell">
                  <label>
                    <strong>Children</strong>
                    <p>Are you (the student) the primary source of financial support for any children?</p>
                    <fieldset>
                      <input type="radio" name="primaryChildSupport" value="yes" id="primaryChildSupportYes"/><label htmlFor="primaryChildSupportYes">Yes</label><br />
                      <input type="radio" name="primaryChildSupport" value="no" id="primaryChildSupportNo"/><label htmlFor="primaryChildSupportNo">No</label>
                    </fieldset>
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="grid-container">
              <div className="grid-x grid-padding-x">
              <div className="medium-3 cell medium-offset-1">
                <button className="button" onClick={() => {this.props.handlePreviousButtonClick(2)}}>Previous Screen</button>
                </div>
                <div className="medium-3 cell medium-offset-3">
                  <button className="button" onClick={() => { this.props.submitStepDataUpdate(2, {stepData: "my data here."})}}>Save and Continue</button>
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