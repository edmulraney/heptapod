import React from "react"
import User from "./elements/user"

export default function Users(props) {
  return props.list.map(user => <User {...user} />)
}
