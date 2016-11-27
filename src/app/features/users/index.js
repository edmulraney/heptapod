import asyncContainer from "../../../packages/async/container"
import component from "./components"
import {usersSelector as selector} from "./module/selectors"
import {events} from "./module/events"
import effects from "./module/effects"
import {mutations} from "./module/mutations"
import state from "./module/state"

const initialStatus = {
  state: null, // INIT, READY, ERROR, MAXIMUM_USERS_REACHED,
  list: null,
}

export default {
  selector,
  component: asyncContainer(component),
  events,
  effects,
  mutations,
  state, // component can expose its control state to other components
}
