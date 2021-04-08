import { store } from '../store';
import Axios from 'axios';
 
export function getChart(type,number) {
    //แสดง loading
    store.dispatch({type:"isFetching_chart"});
    //ดึงข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get("http://localhost:3002/chart?type="+type+"&number="+number)
            .then(chart => {
                dispatch({type:"Fetched_chart",data:chart.data})
            });
    }
}