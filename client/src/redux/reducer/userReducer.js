const initialState = {
    isFetching: false,
    data: []
}

function user(state = initialState, action) {

    switch (action.type) {

        case 'isFetching_users':
            state = {
                ...state,
                isFetching: true,
                data: []
            }
            return state;

        case 'Fetched_users':
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