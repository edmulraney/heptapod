import React from "react"
import {filter, keys} from "ramda"

//make bind passable? e.g. start(binder, manifest)?
function bind(subscriber, presenter, mutator, model, errorHandler) {
  // return {
  //   present: presenter,
  //   subcribe: subcriber,
  // }
}

//build like enhancers, for future proofing. may want to pass funcs/config/data etc.
function presenter() {
  function present(proposal, model) {
    return cycle(proposal, model)
  }
}

function subscriber() {
  return function subscribe(subscriber, model) {
    return {
      model.subscribers.push(subscriber)
      return function unsubscribe() {
        model.subscribers = model.subscribers.filter(l => l !== subscriber)
      }
    }
  }
}

// example SAM mutator, could be redux mutator instead... proposal=action, model=prevState
function mutator() {
  return function(proposal, model) {
    const mutation = model.mutations[proposal.type] && model.mutations[proposal.type]
    mutation(proposal, model)
  }
}

const model = {
  //manifest?,or bound events/effects etc?
  subscribers: [],
  selectedFeature: null, // will be handled by a Router eventually
  data: {},
}

function cycle(proposal, model) {
  console.log({proposal, model})
  mutator(proposal, model)

  const props = model.data[model.selectedFeature.name]
  const state = model.selectedFeature.state(props)
  const propsWithState = {...props, state}
  const Component = model.selectedFeature.component
  model.render(Component(propsWithState))
  model.subscribers.forEach(subscriber => subscriber(model.data))
  const effect = model.selectedFeature.effects(propsWithState)
  if (effect) {
    return effect.then(cycle)
  }
}

//make bind passable? e.g. start(binder, manifest)?
export function start(renderer, manifest) {
  model.render = renderer
  model.features = manifest.features
  model.selectedFeature = manifest.defaultFeature
  keys(manifest.features).forEach(featureKey =>
    model.data[manifest.features[featureKey].name] = manifest.features[featureKey].initialState)
  return {
    present: present,
    subscribe: subscribe,
  }
}
