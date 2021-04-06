import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceDetail } from "../redux/action/invoiceAction";
import Moment from "react-moment";
import "moment/locale/th";

export default function Detail(props) {
  const invoice_id = props.match.params.id;
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice_detail);
  useEffect(() => {
    dispatch(getInvoiceDetail(invoice_id));
  }, []);

  return (
      <div>
        {invoice.isFetching ? 
            //loading
            <div></div>
        : 
        <div className="card">
        {console.log(invoice.data)}
        <div className="card-header">
          <h3 className="card-title">
            หมายเลขคำสั่งซื้อ : {invoice.data.invoiceid}
          </h3>
          <div className="card-tools">
            <ul className="nav nav-pills ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="#revenue-chart"
                  data-toggle="tab"
                >
                  รอการประการผล
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* /.card-header */}
        <div className="card-body">
          <div className="tab-content p-0">
            {/* Morris chart - Sales */}
            <p>
              สั่งซื้อวันที่{" "}
              <Moment format="DD-MM-YYYY" locale="th">
                {invoice.data.date}
              </Moment>
            </p>
            <p>
              งวดประจำวันที่{" "}
              <Moment format="DD-MM-YYYY" locale="th">
                {invoice.data.ngud_date}
              </Moment>
            </p>
  
            <table className="table m-0">
              <thead>
                <tr>
                  <th>เลขสลาก</th>
                  <th>จำนวนใบ (ใบ)</th>
                  <th>ราคารวม (บาท)</th>
                </tr>
              </thead>
              <tbody>
                  {console.log(invoice.data.lottery)}
                {/* {invoice.data.lottery.forEach((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.qty}</td>
                      <td></td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
          </div>
        </div>
        {/* /.card-body */}
      </div>
        }
          
      </div>
  );
}
