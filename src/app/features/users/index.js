import asyncContainer from "../../../packages/async/container"
import component from "./components/users-react"
import {usersSelector as selector} from "./module/selectors"
import {events} from "./module/events"
import {effects} from "./module/effects"
import {mutations} from "./module/mutations"

const initialStatus = {
  state: null, // INIT, READY, ERROR, MAXIMUM_USERS_REACHED,
  // currentState?
  list: null,
}

export default {
  selector,
  component: asyncContainer(component),
  events,
  effects,
  mutations,
}
