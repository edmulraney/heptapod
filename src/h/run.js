import {start, present, subscribe} from "./index"

// const render = component => document.getElementById("app").innerHTML = component
const render = console.log

const app = start(render)

present({type: "message", payload: "yo"})
