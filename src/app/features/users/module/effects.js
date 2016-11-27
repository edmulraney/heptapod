const api = {fetch: () => Promise.resolve(["Bob", "Alice", "Joe"])}

export default function effects(props) {
  if (props.state.SHOULD_FETCH_USERS) {
    return api.fetch()
      .then(users => setTimeout(function() {
        model.present({type: "FETCH_USERS_SUCCESS", payload: users})
      }, 1000))
      .catch(error => model.present({type: "FETCH_USERS_FAILED", payload: error}))
  }
}
