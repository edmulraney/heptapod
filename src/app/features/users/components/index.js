import React from "react"
import {connect} from '../../../../h/h-react.js';
import MaxUsersReached from "./elements/max-users-reached"
import NoUsers from "./elements/no-users"
import Users from "./users"
import AddUserButton from "./elements/add-user-button"

const stateComponentMap = {
  MAXIMUM_USERS_REACHED: MaxUsersReached,
  NO_USERS: NoUsers,
  READY: Users,
  //invalid one shouldnt be here
  INVALID_STATE: () => <div>Invalid component state... oh no something went wrong</div>,
}

export default connect(stateComponentMap)(AddUserButton);
