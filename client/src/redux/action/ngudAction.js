import { store } from '../store';
import Axios from 'axios';
import { api } from '../../environment'

export function getNgud() {

    store.dispatch({type:"FETCHING_NGUD"});

    return function (dispatch) {
        return Axios.get(api + "/ngud")
            .then(ngud => {
                console.log(ngud.data);
                dispatch({type:"FETCHED_NGUD",data:ngud.data,widget:ngud.data[0]})
            });
    }
}

export function addNgud(data) {

    return function (dispatch) {
        return Axios.post(api + "/ngud",data)
            .then(ngud => {
                console.log(ngud.data);
                dispatch({type:"FETCHED_NGUD",data:ngud.data})
            });
    }
}


