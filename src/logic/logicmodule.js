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
          if(data.efc.efcNotDependentButHasDependent[i][j].numberInCollege === data.numberInCollege) {
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
          if(data.efc.efcNotDependentAndNoDependent[i][j].numberInCollege === data.numberInCollege) {
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
export function determineTAG(efcValue) {
  let TAGResult = 0;
  return TAGResult;
}