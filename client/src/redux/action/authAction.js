// import { store } from "../store";

// export function setloginWithUsername(user) {
//   return store.dispatch({
//     type: "SET_ADMIN_LOGIN",
//     data: {
//       uid: user.data.uid,
//       photoURL: user.data.photoURL,
//       role: user.data.role,
//       username: user.data.username,
//       provider: "username",
//       status: true,
//       token: "",
//     },
//   });
// }

// export function setlogout() {
//   return store.dispatch({ type: "SET_LOGOUT" });
// }
import { store } from "../store";

export function setloginWithUsername(user) {
  return store.dispatch({
    type: "SET_ADMIN_LOGIN",
    data: {
      uid : user.data.uid,
      displayName: user.data.displayName,
      photoURL: user.data.photoURL,
      role: user.data.role,
      status: true,
      token: ""
      // photoURL: null,
      // role: null,
      // username: null,
      // status: false,
      // token: null,
    },
  });
}

export function setlogout() {
  return store.dispatch({ type: "SET_LOGOUT" });
}
