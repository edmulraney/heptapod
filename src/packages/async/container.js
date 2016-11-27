export default function asyncContainer(props) {
  if (props.isLoading) {
    return "Loading..."
  }

  if (props.error) {
    return `Oops something went wrong! ${props.error}`
  }

  return props.children
}
