import { store } from '../store';
import Axios from 'axios';
import { api } from '../../environment'
 
export function getChart(type,number) {
    //แสดง loading
    store.dispatch({type:"isFetching_chart"});
    //ดึงข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get(api + "/chart?type="+type+"&number="+number)
            .then(chart => {
                dispatch({type:"Fetched_chart",data:chart.data})
            });
    }
}