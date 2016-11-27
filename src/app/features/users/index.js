import asyncContainer from "../../../packages/async/container"
import component from "./components"
import {usersSelector as selector} from "./module/selectors"
import {events} from "./module/events"
import effects from "./module/effects"
import {mutations} from "./module/mutations"
import state from "./module/state"

const initialState = {
  state: null, // INIT, READY, ERROR, MAXIMUM_USERS_REACHED,
  list: null,
}

export default {
  name: "users", // do we need this? (for mounting feature data in model.data)
  initialState,
  selector,
  component: asyncContainer(component),
  events,
  effects,
  mutations,
  state, // component can expose its control state to other components
}
