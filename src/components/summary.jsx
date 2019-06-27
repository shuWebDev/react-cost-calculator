import React from 'react';

class Summary extends React.Component {
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
            <li>Age: </li>
            <li>Living Arrangement: </li>
            <li>State of residency: </li>
            <li>GPA: </li>
            <li>ERW SAT: </li>
            <li>Math SAT: </li>
            <li>ACT Score: </li>
            <li>Transfer Status: </li>
            <li>Martial Status: </li>
            <li>Children: </li>
            <li>Number in family: </li>
            <li>Number in college: </li>
            <li>Household income: </li>
          </ul>
        </div>
      </section>
    )
  }
}

export default Summary;