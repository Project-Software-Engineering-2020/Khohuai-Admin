const initialState = {
    isFetching: false,
    data: [],
    stock: 0
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

            let count = 0;
            let data = action.data;

            state = {
                ...state,
                isFetching: false,
                data: action.data,
                stock: action.count
            }
            return state;

        default:
            return state;

    }
}

export default lottery;