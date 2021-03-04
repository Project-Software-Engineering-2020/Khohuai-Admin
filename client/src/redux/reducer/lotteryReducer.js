const initialState = {
    isFetching: false,
    data: []
}

function lottery(state = initialState, action) {

    switch (action.type) {

        case 'isFetching_lottery':
            state = {
                ...state,
                isFetching: true,
                data: []
            }
            return state;

        case 'Fetched_lottery':
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

export default lottery;