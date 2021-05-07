const initialState = {
  uid: null,
  displayName: null,
  photoURL: null,
  role: null,
  status: false,
  token: null,
};
// const initialState = {
//   uid: null,
//   photoURL: null,
//   role: null,
//   username: null,
//   provider: null,
//   status: false,
//   token: null,
// };
function userAuth(state = initialState , action) {

  switch (action.type) {

      case 'SET_ADMIN_LOGIN':
          state = {
              ...state,
              uid : action.data.uid,
              displayName: action.data.displayName,
              photoURL: action.data.photoURL,
              role: action.data.role,
              status: true,
          };
          console.log(action.data)
          return state;

      case 'SET_LOGOUT':
        state = initialState;
        return state;
        
      default:
          return state;

  }
}

export default userAuth;