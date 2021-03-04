import { store } from '../store';
import Axios from 'axios';
 
export function getAllLottery() {

    //แสดง loading
    store.dispatch({type:"isFetching_lottery"});

    //ดึวข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get("http://localhost:3002/lottery")
            .then(user => {
                console.log(user.data);
                dispatch({type:"Fetched_lottery",data:user.data})
            });
    }
}