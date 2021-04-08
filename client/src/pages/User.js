import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { getAllUser } from "../redux/action/userAction";
import Moment from "react-moment";
import "moment/locale/th";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(async () => {
    await dispatch(getAllUser());

  }, []);

  // const data = {
  //   columns: [
  //     {
  //       label: "ID",
  //       field: "id",
  //       sort: "asc",
  //       width: 50,
  //     },

  //     {
  //       label: "ชื่อผู้ใช้",
  //       field: "displayName",
  //       sort: "asc",
  //       width: 50,
  //     },
  //     {
  //       label: "อีเมล",
  //       field: "email",
  //       sort: "asc",
  //       width: 50,
  //     },
  //     {
  //       label: "ชื่อจริง",
  //       field: "firstname",
  //       sort: "asc",
  //       width: 50,
  //     },
  //     {
  //       label: "นามสกุล",
  //       field: "lastname",
  //       sort: "asc",
  //       width: 30,
  //     },
  //     {
  //       label: "ประวัติการซื้อล่าสุด",
  //       field: "history",
  //       sort: "asc",
  //       width: 30,
  //     },
  //   ],
  //   rows: userData.data,
  // };

  return (
    // <div>

    //   <MDBDataTable
    //   striped
    //   bordered
    //   small
    //   data={data}
    // />
    // </div>
    <div>
      {user.isFetching ? (
        <div></div>
      ) : (
        <div className="card">
          {console.log(user)}
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
                          {/* <td>
                            <a href={"/invoice/" + item.invoiceid}>
                              {item.invoiceid}
                            </a>
                          </td> */}
                          {/* <td>
                            <Moment format="DD MMMM YYYY HH:mm:ss">
                              {item.date}
                            </Moment>
                          </td> */}
                       
                          <td>
                            <a href={"/user/" + item.id}>ดูเพิ่มเติม</a>
                          </td>
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
