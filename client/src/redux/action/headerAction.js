import { store } from '../store';
export function setHeader(header) {

    return store.dispatch({type:"set_header",data:header});
}