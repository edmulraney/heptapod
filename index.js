const model = {
  present: step,
  subscribers: [],
  actions: {},
  mutations: {
    message: (proposal, model) => model.data.message = proposal.payload,
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
  // model.render("hello")
  model.subscribers.forEach(subscriber => subscriber(model.data))
  nap(state(model))
}

// const api = {fetch: () => Promise.resolve(["Bob", "Alice", "Joe"])}
// const api = {fetch: () => Promise.reject("Not authenticated")}

function state(model) {
  return {
    shouldFetchUsers: model.data.usersRequested,
  }
}

function nap(state) {
  if (state.shouldFetchUsers) {
    return api.fetch()
      .then(users => app.present({type: "FETCH_USERS_SUCCESS", payload: users}))
      .catch(error => app.present({type: "FETCH_USERS_FAILED", payload: error}))
  }
}

// export function start(render) {
function start() {
  return {
    present: model.present,
    subscribe: model.subscribe,
    // render: model.render(renderer),
  }
}

// const log = model.subscribe(console.log)
// const render = model.subscribe(() => console.log("RENDERING..")) ??
// const syncSendMsgAction = msg => model.present({type: "message", payload: msg})

////////////////////
const renderer = console.log

const app = start(renderer)
app.subscribe(renderer)
app.present({type: "message", payload: "yo"})
app.present({type: "FETCH_USERS"})
