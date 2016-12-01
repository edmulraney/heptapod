import React from "react"
// Assumption made on an interface, if so consider constants.
const defaultStates = ['READY', 'INVALID_STATE']

const readyAndSatisfiedPredicate = (ready, predicate) => ready && predicate ? predicate : false 

function readyAndAvailable(ready, stateComponentMap) {
  return Object.keys(stateComponentMap).reduce((a, c) => {
    if (defaultStates.indexOf[c] !== -1) {
      return a
    }

    return !a ? readyAndSatisfiedPredicate(state.READY, stateComponentMap[c]) : a
  }, false)
}

// It looks like you're planning to make this a library function.
function statePredicateMap(stateComponentMap, state) { 
  // Could check keys here for defaultStates in stateComponentMap, if none then throw a helpful message.
  const availableComponent = readyAndAvailable(state.READY, stateComponentMap)

  if (availableComponent) {
    return availableComponent
  }

  // Could also abstract this part to perform a reduction over defaultStates in the same manner.
  if (state.READY) { 
    return stateComponentMap.READY
  }

  return stateComponentMap.INVALID_STATE
}

// Ramda style curry could be preferable to manual curry.
export const connect = stateComponentMap => Component => props => {
  let StateComponent = statePredicateMap(stateComponentMap, props.state)
  return (
    <div>
      <StateComponent {...props} />
      <Component {...props} />
    </div>
  )
}
