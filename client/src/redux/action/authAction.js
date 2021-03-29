import { store } from "../store";

export function setloginWithUsername(user) {
  return store.dispatch({
    type: "SET_ADMIN_LOGIN",
    data: {
      uid: user.data.uid,
      photoURL: user.data.photoURL,
      role: user.data.role,
      username: user.data.username,
      provider: "username",
      status: true,
      token: "",
    },
  });
}

export function setlogout() {
  return store.dispatch({ type: "SET_LOGOUT" });
}
