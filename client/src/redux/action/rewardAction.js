import { store } from '../store';
import Axios from 'axios';

export function getAllUserReward(ngudid) {

    store.dispatch({type: "FETCHING_REWARD"})

    return function (dispatch) {
        return Axios.get("http://localhost:3002/reward/" + ngudid)
            .then(doc => {
                console.log(doc.data);
                dispatch({type:"FETCHED_REWARD",data:doc.data})
            });
    }

}

export function getDetailUserReward(id) {

    store.dispatch({type: "FETCHING_REWARD"})

    return function (dispatch) {
        return Axios.get("http://localhost:3002/reward/detail/" + id)
            .then(doc => {
                console.log(doc.data);
                dispatch({type:"FETCHED_REWARD",data:doc.data})
            });
    }

}