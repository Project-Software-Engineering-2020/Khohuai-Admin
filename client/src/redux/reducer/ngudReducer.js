const initialState = {
    data: [],
    isFetching: false,
  };
  
  function ngud(state = initialState, action) {
    switch (action.type) {
      case "FETCHING_NGUD":
        return {
          ...state,
          data: [],
          isFetching: true,
        };
  
      case "FETCHED_NGUD":
        return {
          ...state,
          data: action.data,
          isFetching: false,
        };
  
      default:
        return state;
    }
  }
  export default ngud;
  