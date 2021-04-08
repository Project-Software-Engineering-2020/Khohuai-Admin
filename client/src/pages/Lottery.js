import React, { useState, useEffect } from 'react';
import { MDBDataTable, MDBCard, MDBBtn } from 'mdbreact';
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { getAllLottery } from '../redux/action/lotteryAction'
import { Link } from 'react-router-dom';

const AllLottery = () => {

  const dispatch = useDispatch();
  const lottery = useSelector(state => state.lottery)

  const data = {

    columns: [

      {
        label: 'เลขสลาก',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'จำนวนคงเหลือ',
        field: 'stock',
        sort: 'asc',
        width: 270
      },
      {
        label: 'งวดที่',
        field: 'nguad',
        sort: 'asc',
        width: 270
      },
      {
        label: 'ชุดที่',
        field: 'st',
        sort: 'asc',
        width: 270
      },
    ],
    rows: lottery.data

  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(async () => {
    await dispatch(getAllLottery())
  }, [])

  return (
    <div>

      <div className="">
        <h3 className="mt-2 mb-4">สลากกินแบ่งรัฐบาล งวดประจำวันที่ 16 มีนาคม 2564</h3>
        {/* <MDBCard className="p-4"> */}

        {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
           </Button> */}
        <Link to="/lottery/create">
          <button className="btn btn-primary">
            เพิ่มสลาก
          </button>
        </Link>
        <Link to="/lottery/ngud">
          <button className="btn btn-primary">
            จัดการงวด
          </button>
        </Link>
        <MDBDataTable
          striped
          bordered
          data={data}
          className="table-data-lottery"
        />
        {/* </MDBCard> */}

      </div>

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

    </div >
  );
}

export default AllLottery;

