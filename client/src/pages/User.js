
import React, { useEffect } from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from '../redux/action/userAction'


const User = () => {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.user)


  const data = {

    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 50
      },

      {
        label: 'ชื่อผู้ใช้',
        field: 'displayName',
        sort: 'asc',
        width: 50
      },
      {
        label: 'อีเมล',
        field: 'email',
        sort: 'asc',
        width: 50
      },
      {
        label: 'ชื่อจริง',
        field: 'firstname',
        sort: 'asc',
        width: 50
      },
      {
        label: 'นามสกุล',
        field: 'lastname',
        sort: 'asc',
        width: 30
      },
      {
        label: 'ประวัติการซื้อล่าสุด',
        field: 'history',
        sort: 'asc',
        width: 30
      }
    ],
    rows: userData.data
  };

  useEffect(async () => {
    await dispatch(getAllUser());
  }, [])

  return (
    <div>
      <h3>สมาชิกทั้งหมด</h3>
      <MDBDataTable
        striped
        bordered
        medium
        data={data}
      />
    </div>

  );
}

export default User;
