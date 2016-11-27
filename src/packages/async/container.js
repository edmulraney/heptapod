import React from "react"

export default function asyncContainer(component) {
  return function(props) {
    console.log({props}, props.isLoading)
    if (props.isLoading) {
      return "Loading..."
    }

    if (props.error) {
      return `Oops something went wrong! ${props.error}`
    }

    return component
  }
}
