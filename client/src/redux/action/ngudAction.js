import { store } from '../store';
import Axios from 'axios';
import { api } from '../../environment'

export function getNgud() {

    store.dispatch({type:"FETCHING_NGUD"});

    return function (dispatch) {
        return Axios.get(api + "/ngud")
            .then(ngud => {
                dispatch(
                    {type:"FETCHED_NGUD",
                    data:ngud.data.all,
                    widget:ngud.data.current,
                    ready: ngud.data.ready
                })
            });
    }
}

export function addNgud(data) {

    return function (dispatch) {
        return Axios.post(api + "/ngud",data)
            .then(ngud => {
                dispatch(
                    {type:"FETCHED_NGUD",
                    data:ngud.data.all,
                    widget:ngud.data.current,
                    ready: ngud.data.ready
                })
            });
    }
}

export function updateNgud(data) {

    return function (dispatch) {
        return Axios.put(api + "/ngud",data)
            .then(ngud => {
                dispatch(
                    {type:"FETCHED_NGUD",
                    data:ngud.data.all,
                    widget:ngud.data.current,
                    ready: ngud.data.ready
                })
            });
    }
}


