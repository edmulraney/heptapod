function Message(props) {
  return `<div>${props.message}</div>`
}

function selector(state) {
  return {
    message: state.message,
    misc: "test",
  }
}

export default {
  component: Message,
  selector,
}
