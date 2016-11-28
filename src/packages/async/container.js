import React from "react"

export default function asyncContainer(Component) {
  return function(props) {
    if (props.isLoading) {
      return <div>Loading...</div>
    }

    if (props.error) {
      return <div>Oops something went wrong! {props.error}</div>
    }

    return <Component {...props} />
  }
}
