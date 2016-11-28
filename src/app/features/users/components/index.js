import React from "react"
import MaxUsersReached from "./elements/max-users-reached"
import NoUsers from "./elements/no-users"
import Users from "./users"
import AddUserButton from "./elements/add-user-button"

const stateComponentMap = {
  MAXIMUM_USERS_REACHED: MaxUsersReached,
  NO_USERS: NoUsers,
  READY: Users,
  //invalid one shouldnt be here
  INVALID_STATE: () => <div>Invalid component state... oh no something went wrong</div>,
}

const hasStates = states => state => all(s => has(s, state), states)

function statePredicateMap(state) {
  if (state.READY && state.MAXIMUM_USERS_REACHED) {
    return stateComponentMap.MAXIMUM_USERS_REACHED
  }

  if (state.READY && state.NO_USERS) {
    return stateComponentMap.NO_USERS
  }

  if (state.READY) {
    return stateComponentMap.READY
  }

  return stateComponentMap.INVALID_STATE
}


export default function Component(props) {
  let StateComponent = statePredicateMap(props.state)
  return (
    <div>
      <StateComponent {...props} />
      <AddUserButton {...props} />
    </div>
  )
}
