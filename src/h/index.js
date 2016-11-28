import React from "react"
import {filter, keys} from "ramda"

const model = {
  present: cycle,
  subscribers: [],
  actions: {},
  features: {},
  currentFeature: null, // will be handled by a Router eventually
  data: {},
  mutations: { // may need to be array not obj (multi handlers one type)
    FETCH_USERS: (proposal, model) => {
      model.data.users.hasRequested = true
      model.data.users.isLoading = true
      console.log("FETCH_USERS", proposal, model)
    },
    FETCH_USERS_SUCCESS: (proposal, model) => {
      model.data.users.list = proposal.payload
      model.data.users.hasRequested = false
      model.data.users.isLoading = false
      console.log("FETCH_USERS_SUCCESS", proposal, model)
    },
    FETCH_USERS_FAILED: (proposal, model) => {
      model.data.error = proposal.payload
      model.data.users.hasRequested = false
      model.data.users.isLoading = false
      console.log("FETCH_USERS_FAILED", proposal, model)
    },
  },
  subscribe: subscriber => {
    model.subscribers.push(subscriber)
    return function unsubscribe() {
      model.subscribers = model.subscribers.filter(l => l !== subscriber)
    }
  },
}

function cycle(proposal) {
  // if (!proposal) return
  console.log({proposal, model})
  const mutator = model.mutations[proposal.type] && model.mutations[proposal.type]
  mutator(proposal, model)
  // must be calculated after mutating
  const props = model.data[model.currentFeature.name]
  const state = model.currentFeature.state(props)
  const propsWithState = {...props, state}
  const Component = model.currentFeature.component
  model.render(Component(propsWithState))
  model.subscribers.forEach(subscriber => subscriber(model.data))
  const effect = model.currentFeature.effects(propsWithState)
  if (effect) {
    return effect.then(proposal => {
      return cycle(proposal)
    })
  }
}

export function start(renderer, manifest) {
  model.render = renderer
  model.features = manifest.features
  model.currentFeature = manifest.defaultFeature
  keys(manifest.features).forEach(featureKey =>
    model.data[manifest.features[featureKey].name] = manifest.features[featureKey].initialState)
  return {
    present: model.present,
    subscribe: model.subscribe,
  }
}
