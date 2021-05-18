const initialState = {
    data: [],
    widget: [],
    ready: false,
    isFetching: false,
    open: false,
    name: null
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
          widget: action.widget,
          isFetching: false,
          open: action.data[0].open,
          name: action.widget.name,
          ready: action.ready
        };
  
      default:
        return state;
    }
  }
  export default ngud;
  