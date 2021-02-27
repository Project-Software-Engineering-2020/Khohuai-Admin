import React,{useState} from 'react';
import { MDBDataTable,MDBBtn } from 'mdbreact';
import { Modal,Button} from 'react-bootstrap'


const DatatablePage = () => {
  
  const data = {
    
    columns: [
     
      {
        label: 'ID.Lottery',
        field: 'lotid',
        sort: 'asc',
        width: 150
      },
      {
        label: 'เลขที่สลาก',
        field: 'lotnum',
        sort: 'asc',
        width: 270
      },
      {
        label: 'งวดสลาก',
        field: 'period',
        sort: 'asc',
        width: 200
      },
      {
        label: 'ชื่อผู้ซื้อ',
        field: 'user',
        sort: 'asc',
        width: 100
      },
      {
        label: 'ชุดที่',
        field: 'count',
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
        lotid : "sssssssssssssssssssssssssssssssssssssssssssss",
        description:  <MDBBtn color="blue" size="sm">ดูเพิ่มเติม</MDBBtn>
      }
      
    ]
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div  className="content-wrapper" >
       <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>



       
      <MDBDataTable
      striped
      bordered
      small
      data={data}
    /> 



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
   


  );
}

export default DatatablePage;

