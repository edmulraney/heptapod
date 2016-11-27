import React from "react"

export default function AddUserButton(props) {
  return <input type="button" onClick={() => props.addUser("John")} disabled={!props.state.MAXIMUM_USERS_REACHED}/>
}
