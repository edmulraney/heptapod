import React from "react"
import ReactDOM from "react-dom"
import {start} from "./h/index"
import manifest from "./app/manifest"

console.log({manifest})

const renderer = view => ReactDOM.render(view, document.getElementById("app"))

var app = start(renderer)
app.subscribe(console.log)
app.present({type: "SET_MESSAGE", payload: "yo"})
app.present({type: "FETCH_USERS"})
