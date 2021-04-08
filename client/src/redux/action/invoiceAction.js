import { store } from '../store';
import Axios from 'axios';
 
export function getAllInvoice() {
    //แสดง loading
    store.dispatch({type:"isFetching_invoice"});
    //ดึงข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get("http://localhost:3002/invoice")
            .then(invoice => {
                console.log(invoice.data);
                dispatch({type:"Fetched_invoice",data:invoice.data})
            });
    }
}
export function getInvoiceDetail(invoice_id) {
    //แสดง loading
    store.dispatch({type:"isFetching_invoice_of_user"});
    //ดึงข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get("http://localhost:3002/invoice/"+invoice_id)
            .then(invoice => {
                console.log(invoice.data);
                dispatch({type:"Fetched_invoice_detail",data:invoice.data[0]})
            });
    }
}
export function getInvoiceOfUser(user_id) {
    //แสดง loading
    store.dispatch({type:"isFetching_invoice_detail"});
    //ดึงข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get("http://localhost:3002/invoice/user/"+user_id)
            .then(invoice => {
                console.log(invoice.data);
                dispatch({type:"Fetched_invoice_of_user",data:invoice.data[0]})
            });
    }
}