function invoice(state = "", action) {

    switch (action.type) {
        case 'set_header':
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default invoice;