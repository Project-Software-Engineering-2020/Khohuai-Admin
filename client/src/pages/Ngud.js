import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNgud, addNgud,updateNgud } from "../redux/action/ngudAction";
import { Modal, Button, Form } from "react-bootstrap";
import {  DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import Moment from "react-moment";
import "moment/locale/th";
import Axios from "axios"
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import { setHeader } from '../redux/action/headerAction';
import { api } from '../environment'

function Ngud(props) {


  const dispatch = useDispatch();
  const ngud = useSelector((state) => state.ngud);

  const [ModaladdNgud, setModalAddNgud] = useState(false);
  const [ModaleditNgud, setModalEditNgud] = useState(false);

  const [warning, setwarning] = useState(false);

  const openModel = () => {
    if (ngud.ready === true) {
      setModalAddNgud(true)
    }
    else {
      setwarning(true)
    }
  }

  const [startsell, setstartsell] = useState();
  const [endsell, setendsell] = useState();
  const [ngudtext, setngud] = useState();

  const [edit_start, set_edit_start] = useState();
  const [edit_end, set_edit_end] = useState();
  const [edit_ngud, set_edit_ngud] = useState();

  const dateValue = Date.now()
  const minDate = new Date;
  const maxDate = new Date("05/16/2021 12:00 AM");

  const chechLottery = async (ngud_) => {
    await Axios.get(api + "/ngud/check_prize/" + ngud_).then((res) => {
      if (res.data === "success") {
        dispatch(getNgud());
      }
    })
  }


  useEffect(() => {
    dispatch(getNgud());
    dispatch(setHeader("จัดการงวดออกสลาก"));
  }, []);


  const onsubmit = () => {
    setModalAddNgud(false);

    const data = {
      start: startsell,
      end: endsell,
      ngud_id: ngudtext,
      check_prize: false,
      total_lottery: 0,
      total_onhand: 0,
      open: true
    }

    dispatch(addNgud(data));

  }

  const edit = (_ngud,start,end) => {

    set_edit_start(start);
    set_edit_end(end);
    set_edit_ngud(_ngud);
  
    setModalEditNgud(true);
  }

  const onupdate = () => {

    const data = {
      start: edit_start,
      end: edit_end,
      ngud_id: edit_ngud
    }
    setModalEditNgud(false);
    dispatch(updateNgud(data))
  }

  return (
    <div>
      {
        ngud.loading ?
          null
          :

          <div>
            <div>
              <button className="btn btn-info" type="button" onClick={openModel}>เพิ่มงวดสลาก</button>
            </div>
            <div className="card">
              <div className="card-header border-transparent ">
                <h2 className="card-title pt-2">งวดออกสลากทั้งหมด</h2>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table m-0 table-hover">
                    <thead>
                      <tr>
                        <th>งวดที่</th>
                        <th>งวดสลากประจำวันที่</th>
                        <th>วันเริ่มจำหน่าย</th>
                        <th>วันสิ้นสุดการจำหน่าย</th>
                        <th>สถานะ</th>
                        <th className="text-center">สลากคงเหลือ (ใบ)</th>
                        <th>ตรวจผลรางวัล</th>
                        <th>แก้ไข</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ngud.data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.ngud}</td>
                            <td> <Moment format="DD MMMM YYYY">
                              {item.end}
                            </Moment></td>
                            <td>
                              <Moment format="DD / MM / YYYY ">
                                {item.start}
                              </Moment>
                            </td>
                            <td>
                              <Moment format="DD / MM / YYYY ">
                                {item.end}
                              </Moment>
                            </td>
                            <td>
                              {
                                item.open ?
                                  <span className="badge badge-warning">เปิดการขาย</span>
                                  :
                                  <span className="badge badge-success">ปิดการขายแล้ว</span>
                              }
                            </td>
                            <td className="text-center">
                              <div>{item.total_onhand + " / " + item.total_lottery}</div>
                              {
                                item.open ?
                                  <div><a className="btn btn-sm" href={"lottery/" + item.ngud}>จัดการสลาก</a></div>
                                  :
                                  null
                              }
                            </td>
                            <td>
                              {item.check_prize ?
                                <span><a href={"lottery/" + item.ngud + "/reward"}>ผู้ถูกรางวัล</a></span>
                                :
                                <span className="btn btn-sm btn-info" onClick={e => chechLottery(item.ngud)}>ตรวจรางวัล</span>
                              }
                            </td>
                            <td>
                              {
                                item.open ?
                                  <span onClick={e => edit(item.ngud,item.start,item.end)}><i class="fas fa-pencil-alt"></i></span>
                                  :
                                    null
                              }
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Modal show={warning} onHide={e => setwarning(false)}>
              <Modal.Header closeButton>
                <Modal.Title>คำเตือน</Modal.Title>
              </Modal.Header>
              <Modal.Body>คุณไม่สามารถเพิ่มงวดได้ ตรวจรางวัลงวดล่าสุดก่อน</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={e => setwarning(false)}>
                  ปิด
          </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={ModaladdNgud}
              onHide={(e) => setModalAddNgud(false)}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton>
                <Modal.Title>งวดสลาก</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form >

                  <Form.Group >

                    <input className="e-input" type="text" placeholder="งวดที่" onChange={e => setngud(e.target.value)} />

                  </Form.Group >

                  <Form.Group >

                    <DatePickerComponent
                      placeholder="วัน เริ่มต้นการจำหน่าย"
                      format="dd MM yyyy"
                      // min={minDate}
                      // max={maxDate}
                      // minDays={10}
                      onChange={e => setstartsell(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group >
                    <DatePickerComponent
                      placeholder="วัน สิ้นสุดการจำหน่าย"
                      format="dd MM yyyy"
                      // min={minDate}
                      // max={maxDate}
                      onChange={e => setendsell(e.target.value)}
                    />
                  </Form.Group>

                  {/* <Button variant="primary" type="button" onClick={onsubmit}>
              Submit
            </Button > */}
                </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={(e) => setModalAddNgud(false)}>
                  Close
          </Button>
                <Button variant="primary" onClick={onsubmit}>
                  Save Changes
          </Button>
              </Modal.Footer>
            </Modal>


            <Modal
              show={ModaleditNgud}
              onHide={(e) => setModalEditNgud(false)}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton>
                <Modal.Title>งวดสลาก</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form >

                  <Form.Group >

                    <input className="e-input" type="text" value={edit_ngud} placeholder="งวดที่" onChange={e => set_edit_ngud(e.target.value)} />

                  </Form.Group >

                  <Form.Group >

                    <DatePickerComponent
                      placeholder="วัน/เวลา เริ่มต้นการจำหน่าย"
                      format="dd MM yyyy"
                      value={edit_start}
                      minDays={10}
                      onChange={e =>  set_edit_start(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group >
                    <DatePickerComponent
                      placeholder="วัน/เวลา สิ้นสุดการจำหน่าย"
                      format="dd MM yyyy"
                      value={edit_end}
                      onChange={e => set_edit_end(e.target.value)}
                    />
                  </Form.Group>

                  {/* <Button variant="primary" type="button" onClick={onsubmit}>
              Submit
            </Button > */}
                </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={(e) => setModalEditNgud(false)}>
                  Close
          </Button>
                <Button variant="primary" onClick={onupdate}>
                  Update
          </Button>
              </Modal.Footer>
            </Modal>

          </div>

      }

    </div>
  );
}

export default Ngud;
