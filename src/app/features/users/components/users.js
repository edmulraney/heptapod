import React from "react"
import User from "./elements/user"

export default function Users(props) {
  return <div>{props.list.map(user => <User key={user.name} {...user} />)}</div>
}
