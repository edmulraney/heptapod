const api = {
  fetch: () => new Promise((resolve, reject) => setTimeout(function() {
    resolve([{name: "Bob"}, {name: "Alice"}, {name: "Joe"}])
  }, 1000))
}

export default function effects(props) {
  if (props.state.SHOULD_FETCH_USERS) {
    return api.fetch()
      .then(users => ({type: "FETCH_USERS_SUCCESS", payload: users}))
      .catch(error => ({type: "FETCH_USERS_FAILED", payload: error}))
  }

}
