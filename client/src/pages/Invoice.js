import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllInvoice } from '../redux/action/invoiceAction';
import { setHeader } from "../redux/action/headerAction";
import { getNgud } from '../redux/action/ngudAction';
import Moment from 'react-moment';
import 'moment/locale/th';
const DatatablePage = () => {

  const dispatch = useDispatch();
  const invoice = useSelector(state => state.invoice);
  const ngud = useSelector(state => state.ngud)

  useEffect(async () => {
    await dispatch(getNgud());
    await dispatch(getAllInvoice());
    await dispatch(setHeader("คำสั่งซื้อทั้งหมด"));
  }, [])

  return (

    <div className="card">
      <div className="h-invoice">
        <div>
          <h2 className="card-title pt-2">  คำสั่งซื้อ  </h2>
        </div>

      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table m-0 table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>หมายเลขคำสั่งซื้อ</th>
                <th>ชื่อ นามสกุล </th>
                <th>วัน/เวลา</th>
                <th>จำนวน</th>
                <th>ยอดเงิน</th>
                <th>สถานะ</th>
                <th>รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {invoice.data.map((item, index) => {

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td><a href={"/invoice/" + item.invoiceid}>{item.invoiceid}</a></td>
                    <td>{item.firstname + "   " + item.lastname}</td>
                    <td><Moment format="DD-MM-YYYY HH:mm:ss">
                      {item.date}
                    </Moment></td>
                    <td>{item.quantity}</td>
                    <td>{item.totalprice}</td>
                    <td>
                      {item.result ?
                        <span className="badge badge-success">ตรวจรางวัลแล้ว</span>
                        :
                        <span className="badge badge-warning">รอการประการผล</span>
                      }
                    </td>

                    <td><a href={"/invoice/" + item.invoiceid} class="btn btn-sm btn-info">ดูเพิ่มเติม</a></td>
                  </tr>
                )


              })}

            </tbody>
          </table>
        </div>
        {/* /.table-responsive */}
      </div>
    </div>
  );
}

export default DatatablePage;