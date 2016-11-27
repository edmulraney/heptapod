import {path} from "ramda"

//generic - goes in packages/async/selectors?
function asyncSelector(feature) {
  return function(component) {
    return function(state) {
      return {
        isLoading: path([feature, component], "isLoading"),
        error: path([feature, component], "error"),
      }
    }
  }
}

function usersSelector(model) {
  const asyncState = asyncSelector("users")("list")(model)
  return {
    ...asyncState,
    list: path(["users", "list"], model),
  }
}

export {
  usersSelector,
}
