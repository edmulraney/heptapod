import {path} from "ramda"

//generic - goes in packages/async/selectors?
function asyncSelector(state) {
  return function(feature) {
    return function(component) {
      return {
        isLoading: path([feature, component], "isLoading"),
        error: path([feature, component], "error"),
      }
    }
  }
}

function usersSelector(state) {
  return {
    ...asyncSelector("users")("list"),
    list: path(["users", "list"], state),
  }    
}

export {
  usersSelector,
}
