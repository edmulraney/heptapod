// how to make this work with redux immutable?:
//  mutator(selector("users", "isLoading"))
//  mutator auto wrapped in wiring, so:
//  return [{
//    selector: selector("users", "isLoading"),
//    value: true,
//  }, {
//    selector: selector("users", "somethingElse"),
//    value: {a:1, b:2},
//  }]
//  mutator takes selecor and newValue:
//  ...from somewhere: state/model,
//  function reduxMutator(selector, value) {
//    return {...state, [selector(state)]: value}
//  }
//  function samMutator(selector, value) {
//    selector(model) = value // double check ramda path doesn't return new object?
//  }
function fetchUsers(proposal, model) {
  model.data.users.isLoading = true
  console.log("FETCH_USERS mutated:", proposal, model)
  // will be:
  // return [{selector, value}] // see above
}

export default {
  FETCH_USERS: fetchUsers,
}

//   {
//     FETCH_USERS_SUCCESS: (proposal, model) => {
//       model.data.users.list = proposal.payload
//       model.data.users.isLoading = false
//       console.log("FETCH_USERS_SUCCESS mutated:", proposal, model)
//     },
//     FETCH_USERS_FAILED: (proposal, model) => {
//       model.data.error = proposal.payload
//       model.data.users.isLoading = false
//       console.log("FETCH_USERS_FAILED mutated:", proposal, model)
//     },
//   }
// }
