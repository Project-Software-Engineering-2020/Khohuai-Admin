import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceDetail } from "../redux/action/invoiceAction";
import Moment from "react-moment";
import NumberFormat from 'react-number-format';
import "moment/locale/th";
import "./detail.css";

export default function Detail(props) {
  const invoice_id = props.match.params.id;
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice_detail);
  const [detail, setdetail] = useState([]);
  useEffect(async () => {
    await dispatch(getInvoiceDetail(invoice_id));
    // await setdetail(invoice.data);
  }, []);

  return (
    <div>
      {invoice.isFetching ? (
        //loading
        <div>loading...</div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              หมายเลขคำสั่งซื้อ : {invoice.data.invoiceid}
            </h3>
            <div className="card-tools">
              <ul className="nav nav-pills ml-auto">
                <li className="nav-item">
                 
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
                <Moment format="DD MMMM YYYY" locale="th">
                  {invoice.data.date}
                </Moment>
              </p>
              <p>
                งวดประจำวันที่{" "}
                <Moment format="DD MMMM YYYY" locale="th">
                  {invoice.data.ngud_date}
                </Moment>
              </p>
              <p>
                ชื่อ นามสกุล : {invoice.data.firstname  + "   " + invoice.data.lastname}
              </p>

              <table className="table m-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>เลขสลาก</th>
                    <th>จำนวนใบ (ใบ)</th>
                    <th>ราคารวม (บาท)</th>
                    <th>สถานะ</th>
                    <th>ผลการออกสลาก</th>
                  </tr>
                </thead>
                <tbody>
               
                  {invoice.data.lottery
                    ? invoice.data.lottery.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{item.number}</td>
                          <td>{item.qty}</td>
                          <td><NumberFormat value={item.qty * 80} displayType={'text'} thousandSeparator={true}>{item.qty * 80}</NumberFormat></td>
                          <td>
                            {item.status ?
                              <span className="badge badge-success">ตรวจรางวัลแล้ว</span>
                              :
                              <span className="badge badge-warning">รอการประการผล</span>
                            }
                          </td>

                          <td>{item.prize.map((p) => {
                            return (
                              <p>{p}</p>
                            )
                          })}
                          </td>
                        </tr>
                      );
                    })
                    : null}
                </tbody>
              </table>
              <div className="section-summary-invoice">
                {/* <div>**เลือกที่เลขสลากเพื่อดูสลากใบจริง**</div> */}
                <div></div>
                <div>
                  <div className="summary-invoice">
                    <div className="info-summary">
                      <div>จำนวนทั้งหมด</div>
                      <div>{invoice.data.quantity}</div>
                      <div>ใบ</div>
                    </div>
{/* 
                    <div className="info-summary">
                      <div>ยอดรวม</div>
                      <div>{invoice.data.totalprice}<NumberFormat value={invoice.data.totalprice} displayType={'text'} thousandSeparator={true}>{invoice.data.totalprice}</NumberFormat>{invoice.data.totalprice}</div>
                      <div>บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>ส่วนลด</div>
                      <div>0</div>
                      <div>บาท</div>
                    </div> */}

                    <div className="info-summary total">
                      <div>ยอดรวมทั้งสิ้น</div>
                      <h4 className="total2"><NumberFormat value={invoice.data.totalprice} displayType={'text'} thousandSeparator={true}>{invoice.data.totalprice}</NumberFormat></h4>
                      <div>บาทถ้วน</div>
                    </div>

                    {/* <div className="info-summary">
                      <div>ชำระเงินโดยผ่าน </div>
                      <span><img src="../dist/img/mastercard.png" /></span>

                    </div> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.card-body */}
        </div>
      )}
    </div>
  );
}
