// NOTE: function determineDependency
//
// accepts: an object containing values including 
//          - user's age
//          - user's marital status ("yes/no")
//          - whether user is responsible for child support ("yes/no")
//
// returns: boolean, true = user is determined to be a dependent

export function determineDependency(data) {
  // NOTE: initialize our return value
  let dependent = false;

  if(data.age < 24) {
    dependent = true;
  } 

  if(data.marital === "yes") {
    dependent = false;
  }

  if(data.childSupport === "yes") {
    dependent = false;
  }

  return dependent;
} // NOTE: end function


// NOTE: function determineEFC
//
// accepts: an object containing all the values needed
// to determine the Expected Family Contribution value
// 
// returns: the EFC value from lookup based on calculations

export function determineEFC(data) {
  // NOTE: initialize our return variable
  let efcResult = 0;

  // NOTE: get the dependency status of the user
  if(data.dependent) {
    // NOTE: user is a dependent
    for(let i=0; i<data.efc.efcDependent.length; i++) {
      for(let j=0; j<data.efc.efcDependent[i].length; j++) {
        if(data.efc.efcDependent[i][j].numberInCollege === data.familyInCollege) {
          if(data.efc.efcDependent[i][j].numberInFamily === data.familyMembers) {
            // NOTE: we found the value we need, break out of the loop and return
            efcResult = data.efc.efcDependent[i][j].incomeRanges[data.householdIncome];
            break;
          }
        }
      }
    }
  } else {
    // NOTE: user is NOT a dependent themselves, but they have dependent(s)
    if(data.childSupport === "yes") {
      // NOTE: user has dependent children
      for(let i=0; i<data.efc.efcNotDependentButHasDependent.length; i++) {
        for(let j=0; j<data.efc.efcNotDependentButHasDependent[i].length; j++) {
          if(data.efc.efcNotDependentButHasDependent[i][j].numberInCollege === data.familyInCollege) {
            if(data.efc.efcNotDependentButHasDependent[i][j].numberInFamily === data.familyMembers) {
              // NOTE: we found the value we need, break out of the loop and return
              efcResult = data.efc.efcNotDependentButHasDependent[i][j].incomeRanges[data.householdIncome];
              break;
            }
          }
        }
      }
    } else {
      // NOTE: user is NOT a dependent, and HAS NO dependents
      for(let i=0; i<data.efc.efcNotDependentAndNoDependent.length; i++) {
        for(let j=0; j<data.efc.efcNotDependentAndNoDependent[i].length; j++) {
          if(data.efc.efcNotDependentAndNoDependent[i][j].numberInCollege === data.familyInCollege) {
            if (data.efc.efcNotDependentAndNoDependent[i][j].numberInFamily === data.familyMembers) {
              // NOTE: we found the value we need, break out of the loop and return
              efcResult = data.efc.efcNotDependentAndNoDependent[i][j].incomeRanges[data.householdIncome];
              break;
            }
          }
        }
      }
    }
  }
  // NOTE: resurn the result for EFC calculation
  console.log(efcResult);
  return efcResult;
} // NOTE: End function

// NOTE: function determineTAG
//
// accepts: the value of the user's Expected Family Contribution
// 
// returns: the TAG value from lookup based on calculations
export function determineTAG(efcValue, TAGData) {
  // NOTE: Initialize our return variable
  let TAGResult = 0;

  for(let i=0; i<TAGData.length; i++) {
    if((efcValue >= TAGData[i][0]) && (efcValue <= TAGData[i][1])) {
      // NOTE: we found the row and our TAG value, break out and return
      TAGResult = TAGData[i][2];
      break;
    }
  }
  console.log(`TAG: ${TAGResult}`);
  return TAGResult;
}

// NOTE: function determinePOA
//
// accepts: object containing 
//          -- the POA data from state
//          -- user's living status (0, 1, 2)
//          -- residency (0 for New Jersey, 1 for other)
// 
// returns: Price of Admission value

export function determinePOA(data) {
  // NOTE: initialize return variable
  let POAResult = {
    totalCost: 0,
    tuitionAndFees: 0,
    booksSupplies: 0,
    roomAndBoard: 0,
    otherExpenses: 0,
    total: 0
  };

  let poaTotal = 0;

  // NOTE: Is user NJ resident or out of state?
  let rs = (data.residencyState === "New Jersey")? 0 : 1; 

  // NOTE: will user be living on campus (regardless of current residency), off campus (current NJ resident) or off campus (not-current-NJ resident)
  let poaIndexNumber;
  if(data.livingStatus === 0) {
    poaIndexNumber = 0; // NOTE: first element in POA array
  } else {
    poaIndexNumber = (rs === 0)? 1 : 2;
  }

  // NOTE: pull out the POA values we need to show
  POAResult = {
    totalCost: data.poa.poatotaladmissioncost[poaIndexNumber],
    tuitionAndFees: data.poa.poatuitionfees[poaIndexNumber],
    booksSupplies: data.poa.poabookssupplies[poaIndexNumber],
    roomAndBoard: data.poa.poaroomboard[poaIndexNumber],
    otherExpenses: data.poa.poaotherexpenses[poaIndexNumber]
  };
  console.log(POAResult);

  return POAResult;
}

// NOTE: function determinePell
//
// accepts: object containing 
//          - a copy of the Pell data in app state
//          - the calculated EFC value for the user 
// 
// returns: the Pell Grant amount according to data

export function determinePell(data) {
  let pellResult;

  for(let i=0; i<data.pell.length; i++) {
    pellResult = ((data.efc >= data.pell[i][0]) && (data.efc <= data.pell[i][1]))? data.pell[i][2] : 0;
  }

  return pellResult;
}