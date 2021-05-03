import { store } from '../store';
import Axios from 'axios';
 
export function getNgud() {

    store.dispatch({type:"FETCHING_NGUD"});

    return function (dispatch) {
        return Axios.get("http://localhost:3002/ngud")
            .then(ngud => {
                console.log(ngud.data);
                dispatch({type:"FETCHED_NGUD",data:ngud.data})
            });
    }
}

export function addNgud(data) {

    return function (dispatch) {
        return Axios.post("http://localhost:3002/ngud",data)
            .then(ngud => {
                console.log(ngud.data);
                dispatch({type:"FETCHED_NGUD",data:ngud.data})
            });
    }
}


