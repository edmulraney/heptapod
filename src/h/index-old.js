import React from "react"
import {filter} from "ramda"

const model = {
  present: step,
  subscribers: [],
  actions: {},
  mutations: {
    SET_MESSAGE: (proposal, model) => model.data.message = proposal.payload,
    FETCH_USERS: (proposal, model) => model.data.usersRequested = true,
    FETCH_USERS_SUCCESS: (proposal, model) => {
      model.data.users = proposal.payload
      model.data.usersRequested = false
    },
    FETCH_USERS_FAILED: (proposal, model) => {
      model.data.error = proposal.payload
      model.data.usersRequested = false
    },
  },
  features: {},
  subscribe: subscriber => {
    model.subscribers.push(subscriber)
    return function unsubscribe() {
      model.subscribers = model.subscribers.filter(l => l !== subscriber)
    }
  },
  data: {},
  // render: renderer => state => renderer(state),
}

function step(proposal) {
  model.mutations[proposal.type] && model.mutations[proposal.type](proposal, model)
  model.render(UserView(state(model)))
  model.subscribers.forEach(subscriber => subscriber(model.data))
  nap(state(model))
}

const api = {fetch: () => Promise.resolve(["Bob", "Alice", "Joe"])}
// const api = {fetch: () => Promise.reject("Not authenticated")}

function state(model) {
  return {
    // from UserViewSelector
    shouldFetchUsers: model.data.usersRequested,
    users: model.data.users || ["loading"],
    message: model.data.message,
  }
}

function nap(state) {
  if (state.shouldFetchUsers) {
    return api.fetch()
      .then(users => setTimeout(function() {
        model.present({type: "FETCH_USERS_SUCCESS", payload: users})
      }, 1000))
      .catch(error => model.present({type: "FETCH_USERS_FAILED", payload: error}))
  }
}

// export function start(render) {
export function start(renderer) {
  model.render = renderer
  return {
    present: model.present,
    subscribe: model.subscribe,
    // render: model.render(renderer),
  }
}

function UserView(props) {
  return (
    <div>
      <div>Message: {props.message}</div>
      <div>{props.users[0]}</div>
    </div>
  )
}

// const log = model.subscribe(console.log)
// const render = model.subscribe(() => console.log("RENDERING..")) ??
// const syncSendMsgAction = msg => model.present({type: "message", payload: msg})

///////////////////
/*
const renderer = console.log

const app = start(renderer)
app.subscribe(renderer)
app.present({type: "message", payload: "yo"})
app.present({type: "FETCH_USERS"})
*/
