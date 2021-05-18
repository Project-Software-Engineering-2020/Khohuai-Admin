import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { getAllUser } from "../redux/action/userAction";
import { setHeader } from "../redux/action/headerAction"
import Moment from "react-moment";
import "moment/locale/th";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(async () => {
    await dispatch(getAllUser());
    await dispatch(setHeader("ผู้ใช้งาน"))
  }, []);

  return (

    <div>
      {user.isFetching ? (
        <div></div>
      ) : (
        <div className="card">
      
          <div className="card-header border-transparent ">
            <h2 className="card-title pt-2">ผู้ใช้งานทั้งหมด</h2>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table m-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ชื่อจริง</th>
                    <th>นามสกุล</th>
                    <th>อีเมล</th>
                    <th>เบอร์โทรศัพท์</th>
                    <th>ประวัติการซื้อ</th>
                    <th>ประวัติการถูกรางวัล</th>
                  </tr>
                </thead>
                <tbody>
                  {user.data
                  ? user.data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.firstname}</td>
                          <td>{item.lastname}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
         
                          <td>
                            <a href={"/user/" + item.id}>ดูเพิ่มเติม</a>
                          </td>
                          <td></td>
                        </tr>
                      );
                    })
                  : null}
                </tbody>
              </table>
            </div>
            {/* /.table-responsive */}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
