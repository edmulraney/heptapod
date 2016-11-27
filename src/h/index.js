import React from "react"
import {filter, keys} from "ramda"

const model = {
  present: step,
  subscribers: [],
  actions: {},
  features: {},
  currentFeature: null, // will be handled by a Router eventually
  data: {},
  mutations: { // may need to be array not obj
    FETCH_USERS: (proposal, model) => model.data.users.usersRequested = true,
    FETCH_USERS_SUCCESS: (proposal, model) => {
      model.data.users.list = proposal.payload
      model.data.users.usersRequested = false
    },
    FETCH_USERS_FAILED: (proposal, model) => {
      model.data.error = proposal.payload
      model.data.users.usersRequested = false
    },
  },
  subscribe: subscriber => {
    model.subscribers.push(subscriber)
    return function unsubscribe() {
      model.subscribers = model.subscribers.filter(l => l !== subscriber)
    }
  },
}

function step(proposal) {
  const props = {...model.currentFeature.initialState, ...model.data}
  const state = model.currentFeature.state(props)
  const propsWithState  = {...props, state}
  const Component = model.currentFeature.component
  model.mutations[proposal.type] && model.mutations[proposal.type](proposal, model)
  // model.render(Component(propsWithState))
  model.subscribers.forEach(subscriber => subscriber(model.data))
  model.currentFeature.effects(propsWithState)
}

export function start(renderer, manifest) {
  model.render = renderer
  model.features = manifest.features
  model.currentFeature = manifest.defaultFeature
  keys(manifest.features).forEach(featureKey =>
    model.data[manifest.features[featureKey].name] = manifest.features[featureKey].initialState)
  console.log(model.data)
  return {
    present: model.present,
    subscribe: model.subscribe,
  }
}
