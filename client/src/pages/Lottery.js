import React, { useState, useEffect } from 'react';
import { MDBDataTable, MDBCard, MDBBtn } from 'mdbreact';
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { getAllLottery } from '../redux/action/lotteryAction';
import { getNgud } from '../redux/action/ngudAction';
import { setHeader } from '../redux/action/headerAction';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/th';
const AllLottery = (props) => {

  const ngudid = props.match.params.ngud;

  const dispatch = useDispatch();
  const lottery = useSelector(state => state.lottery)
  const ngud = useSelector(state => state.ngud)
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
      // {
      //   label: 'งวดที่',
      //   field: 'nguad',
      //   sort: 'asc',
      //   width: 270
      // },
      // {
      //   label: 'ชุดที่',
      //   field: 'st',
      //   sort: 'asc',
      //   width: 270
      // },
    ],
    rows: lottery.data

  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(async () => {
    await dispatch(getAllLottery());
    await dispatch(getNgud())
    await dispatch(setHeader("Lottery"))
  }, [])

  return (
    <div>

      <div className="">
        {
          ngud.name ?
            <h3 className="mt-2 mb-4">งวดประจำวันที่
        <Moment format=" DD MMMM YYYY">
                {ngud.name}
              </Moment>
            </h3>
            :

            null
        }

        {/* <MDBCard className="p-4"> */}

        {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
           </Button> */}

        <Link to={"/lottery/"+ngudid+"/create"}>
          <button className="btn btn-primary">
            เพิ่มสลาก
          </button>
        </Link>

        <MDBDataTable
          striped
          bordered
          data={data}
          size="small"
          className="table-data-lottery p-2"
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

