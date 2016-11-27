// list will be keyed object not array eventually
// const isEmpty = list => Object.keys(list).length === 0
//
export default function state(props) {
  console.log({props})
  const SHOULD_FETCH_USERS = props.usersRequested || props.list === null
  const READY = !SHOULD_FETCH_USERS
  const NO_USERS = props.list === null || props.list.length === 0
  const MAXIMUM_USERS_REACHED = props.list && props.list.length >= 5

  return {
    MAXIMUM_USERS_REACHED,
    NO_USERS,
    READY,
    SHOULD_FETCH_USERS,
  }
}
