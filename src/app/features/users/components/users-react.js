import React from "react"

function User(props) {
  return <div>{props.name}</div>
}

function AddUserButton(props) {
  return <input type="button" onClick={() => props.addUser("John")} disabled={!props.state.MAXIMUM_USERS_REACHED}/>
}

const stateComponentMap = {
  MAXIMUM_USERS_REACHED: () => <div>Maximum users reached</div>,
  NO_USERS: () => <div>No users</div>,
  READY: props => props.list.map(user => <User {...user} />),
  //ERROR: props... already handled by async container?

  // below could be handled higher up? same for all components?
  INVALID_STATE: () => <div>Invalid component state... oh no something went wrong</div>,
}

export default function Users(props) {
  const Component = stateComponentMap[props.currentStatus] || stateComponentMap.INVALID_STATE
  return (
    <div>
      <Component {...props} />
      <AddUserButton {...props} />
    </div>
  )
}
