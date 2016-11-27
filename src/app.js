import React from "react"
import ReactDOM from "react-dom"
import {start} from "./h/index"


const renderer = view => ReactDOM.render(view, document.getElementById("app"))
function UserView(props) {
  return (
    <div>
      <div>Message: {props.message}</div>
      <div>{props.users[0]}</div>
    </div>
  )
}
var app = start(renderer)
app.subscribe(console.log)
app.present({type: "SET_MESSAGE", payload: "yo"})
app.present({type: "FETCH_USERS"})
