import React from 'react';

class Final extends React.Component {
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

  
  render() {
    return (
      <section>
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
          <li>Books and Supplies: ${this.state.report.POA.booksSupplies.toFixed(2)}</li>
          <li>Other Expenses: ${this.state.report.POA.otherExpenses.toFixed(2)}</li>
          <li>Room and board (off-campus): $6000.00</li>
        </ul>
      </section>
    );
  }

}

export default Final;