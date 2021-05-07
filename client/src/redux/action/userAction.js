import { store } from '../store';
import Axios from 'axios';
import { api } from '../../environment'
export function getAllUser() {

    //แสดง loading
    store.dispatch({type:"isFetching_users"});

    //ดึวข้อมูล และส่งข้มูลไปแสดงผล
    let data_user;
    return function (dispatch) {
        return Axios.get(api + "/user")
            .then(user => {
                console.log(user.data);
                data_user = user.data;
                dispatch({type:"Fetched_users",data:data_user});
            });
    }
}
