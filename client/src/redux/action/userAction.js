import { store } from '../store';
import Axios from 'axios';
 
export function getAllUser() {

    //แสดง loading
    store.dispatch({type:"isFetching_user"});

    //ดึวข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get("http://localhost:3002/user")
            .then(user => {
                console.log(user.data);
                dispatch({type:"Fetched_user",data:user.data})
            });
    }
}
