import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { getInvoiceOfUser } from '../redux/action/invoiceAction'
import Moment from 'react-moment';
import 'moment/locale/th';
const Userinvoice = (props) => {

  const user_id = props.match.params.id;
  const dispatch = useDispatch();
  const invoice = useSelector(state => state.invoice_user);

  useEffect(async () => {
    await dispatch(getInvoiceOfUser(user_id));
  }, [])

  const data = {

    columns: [

      {
        label: 'เลขที่ใบเสร็จ',
        field: 'num',
        sort: 'asc',
        width: 250
      },
      {
        label: 'วัน/เวลา',
        field: 'date',
        sort: 'asc',
        width: 270
      },
      {
        label: 'ชื่อผู้ซื้อ',
        field: 'user',
        sort: 'asc',
        width: 200
      },
      {
        label: 'จำนวน',
        field: 'quantity',
        sort: 'asc',
        width: 100
      },
      {
        label: 'ยอดเงิน',
        field: 'balance',
        sort: 'asc',
        width: 150
      },
      {
        label: 'สถานะรางวัล',
        field: 'status',
        sort: 'asc',
        width: 100
      },
      {
        label: 'รายละเอียด',
        field: 'description',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [

      {
        description: <MDBBtn color="blue" size="sm">ดูเพิ่มเติม</MDBBtn>
      }
    ]
  };

  return (
    // <div>

    //   <MDBDataTable
    //   striped
    //   bordered
    //   small
    //   data={data}
    // /> 
    // </div>
    <div className="card">
      <div className="card-header border-transparent ">
        <h2 className="card-title pt-2">คำสั่งซื้อทั้งหมด</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table m-0">
            <thead>
              <tr>
                <th>#</th>
                <th>เลขที่ใบเสร็จ</th>
                <th>วัน/เวลา</th>
                <th>ชื่อผู้ซื้อ</th>
                <th>จำนวน</th>
                <th>ยอดเงิน</th>
                <th>สถานะรางวัล</th>
                <th>รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {invoice.data.all_invoice ?

                invoice.data.all_invoice.length > 0 ?
                  invoice.data.all_invoice.map((item, index) => {

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><a href={"/invoice/" + item.invoiceid}>{item.invoiceid}</a></td>
                        <td><Moment format="DD-MM-YYYY HH:mm:ss">
                          {item.date}
                        </Moment></td>
                        <td>น้องบอสคนเก่ง</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalprice}</td>
                        <td>รอคนมารัก</td>
                        <td><a href={"/invoice/" + item.invoiceid} class="btn btn-sm btn-info float-left">ดูเพิ่มเติม</a></td>
                      </tr>
                    )


                  })

                  :

                  <tr>
                    <p>ไม่มีข้อมูลการซื้อ</p>
                  </tr>
                :
                <tr>กำลังโหลดข้อมูล</tr>
              }
            </tbody>
          </table>
        </div>
        {/* /.table-responsive */}
      </div>
    </div>
  );
}

export default Userinvoice;