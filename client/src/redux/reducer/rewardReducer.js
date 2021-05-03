const initialState = {
    data: [],
    isFetching: false,
  };
  
  function reward(state = initialState, action) {
    switch (action.type) {
      case "FETCHING_REWARD":
        return {
          ...state,
          data: [],
          isFetching: true,
        };
  
      case "FETCHED_REWARD":
        return {
          ...state,
          data: action.data,
          isFetching: false,
        };
  
      default:
        return state;
    }
  }
  export default reward;