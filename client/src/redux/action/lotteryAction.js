import { store } from '../store';
import Axios from 'axios';
import { api } from '../../environment'

export function getAllLottery() {

    //แสดง loading
    store.dispatch({type:"isFetching_lottery"});

    //ดึวข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get(api + "/lottery")
            .then(lo => {
                console.log(lo.data);
                let data = lo.data;
                let count = 0;

                data.map((item) => {
                    count += item.photoURL.length
                })
                // data.map((item) => {
                //     count += item.photoURL.length 
                // })

                dispatch({type:"Fetched_lottery",data:data, count:count})
            });
    }
}