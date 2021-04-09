const initialState = {
    isFetching: false,
    labels: [],
    data: []
}

function chart(state = initialState, action) {

    switch (action.type) {

        case 'isFetching_chart':
            state = {
                ...state,
                isFetching: true,
                labels: [],
                data: []
            }
            return state;

        case 'Fetched_chart':
            const _data = action.data;
            let arr_labels = [];
            let arr_data = []

            _data.map((item) => {
                arr_labels.push(item.day);
                arr_data.push(item.qty);
            })
            state = {
                ...state,
                isFetching: false,
                labels: arr_labels,
                data: arr_data
            }

            return state;

        default:
            return state;

    }
}

export default chart;