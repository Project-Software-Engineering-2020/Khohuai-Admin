function tokenAuth(state = null , action) {

    switch (action.type) {

        case 'SET_TOKEN':
            state = action.data
            return state;
        case 'SET_DELETETOKEN':
            return state = null
        default:
            return state;

    }
}

export default tokenAuth;