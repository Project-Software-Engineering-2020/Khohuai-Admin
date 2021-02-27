
import React from 'react';
import { MDBDataTable,MDBBtn } from 'mdbreact';



const DatatablePage = () => {
  
  const data = {
    
    columns: [
     
      {
        label: 'ชื่อผู้ใช้',
        field: 'name',
        sort: 'asc',
        width: 100
      },
      {
        label: 'อีเมลล์',
        field: 'email',
        sort: 'asc',
        width: 30
      },
      {
        label: 'ประวัติการซื้อ',
        field: 'history',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        name : "ssss",
        history:  <MDBBtn color="blue" size="sm">ดูเพิ่มเติม</MDBBtn>
      }
      
    ]
  };

  return (
    <div  className="content-wrapper" >

      <MDBDataTable
      striped
      bordered
      small
      data={data}
    /> 
    </div>
   
  );
}

export default DatatablePage;
