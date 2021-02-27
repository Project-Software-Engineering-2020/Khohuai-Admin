import React from 'react';
import { MDBDataTable,MDBBtn } from 'mdbreact';


const DatatablePage = () => {
  
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
        description : <MDBBtn color="blue" size="sm">ดูเพิ่มเติม</MDBBtn>
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