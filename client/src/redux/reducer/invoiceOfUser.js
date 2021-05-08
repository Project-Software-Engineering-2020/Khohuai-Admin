const initialState = {
    isFetching: false,
    data: []
}

function invoice(state = initialState, action) {

    switch (action.type) {

        case 'isFetching_invoice_detail':
            state = {
                ...state,
                isFetching: true,
                data: []
            }
            return state;

        case 'Fetched_invoice_of_user':
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

export default invoice;