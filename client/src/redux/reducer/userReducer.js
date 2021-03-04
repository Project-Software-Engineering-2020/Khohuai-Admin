const initialState = {
    isFetching: false,
    data: []
}

function user(state = initialState, action) {

    switch (action.type) {

        case 'isFetching_user':
            state = {
                ...state,
                isFetching: true,
                data: []
            }
            return state;

        case 'Fetched_user':
            state = {
                ...state,
                isFetching: false,
                data: action.data
            }
            return state;

        default:
            return state;

    }
}

export default user;