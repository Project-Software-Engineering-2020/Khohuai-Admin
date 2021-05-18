function tokenAuth(state = "" , action) {

    switch (action.type) {

        case 'SET_TOKEN':
            state = action.data
            return state;
        case 'SET_DELETETOKEN':
            return state = ""
        default:
            return state;

    }
}

export default tokenAuth;