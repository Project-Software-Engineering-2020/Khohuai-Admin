import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRewardOfUser } from '../redux/action/invoiceAction'
import Moment from 'react-moment';
import 'moment/locale/th';
import NumberFormat from 'react-number-format';

const UserReward = (props) => {

  const user_id = props.match.params.id;
  const dispatch = useDispatch();
  const invoice = useSelector(state => state.invoice_user);

  useEffect(async () => {
    await dispatch(getRewardOfUser(user_id));
  }, [])


  return (
    <div className="card">
      <div className="card-header border-transparent ">
        <h2 className="card-title pt-2">รายการรับรางวัลทั้งหมด</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table m-0">
            <thead>
              <tr>
                <th>#</th>
                <th>เลขที่ใบเสร็จ</th>
                <th>ชื่อผู้ซื้อ</th>
                <th>วัน/เวลา</th>
                <th>ยอดเงินรางวัล (บาท)</th>
                <th>สถานะรางวัล</th>
                <th>รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {invoice.data ?

                invoice.data.length > 0 ?
                  invoice.data.map((item, index) => {

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><a href={"/lottery/" + item.ngud + "/reward/" + item.id}>{item.id}</a></td>
                        <td>{item.firstname + "  " + item.lastname}</td>
                        <td><Moment format="DD-MM-YYYY HH:mm:ss">
                          {item.date}
                        </Moment></td>
                        <td>   <NumberFormat value={item.win_amount} displayType={'text'} thousandSeparator={true}>{item.win_amount}</NumberFormat></td>
                        <td>{item.success ?
                          <span className="badge badge-success">โอนเงินรางวัลแล้ว</span>
                          :
                          <span className="badge badge-warning">กำลังดำเนินการ</span>
                        }</td>
                        <td><a href={"/lottery/" + item.ngud + "/reward/" + item.id} class="btn btn-sm btn-info">ดูเพิ่มเติม</a></td>
                      </tr>
                    )


                  })

                  :
                  <div className="p-3 text-center w-100">
                    <p>ไม่มีข้อมูลการซื้อ</p>
                  </div>
                :
                <tr className="p-3 text-center w-100">กำลังโหลดข้อมูล</tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserReward
