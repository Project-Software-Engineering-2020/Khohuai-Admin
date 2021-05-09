import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNgud, addNgud } from "../redux/action/ngudAction";
import { Modal, Button, Form } from "react-bootstrap";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import Moment from "react-moment";
import "moment/locale/th";
import Axios from "axios"
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import { setHeader } from '../redux/action/headerAction'
import { api } from '../environment'

function Ngud(props) {

  const ngudid = props.match.params.ngud;

  const dispatch = useDispatch();
  const ngud = useSelector((state) => state.ngud);

  const [ModaladdNgud, setModalAddNgud] = useState(false);

  const openModel = () => {
    setModalAddNgud(true)
  }

  const [startsell, setstartsell] = useState();
  const [endsell, setendsell] = useState();
  const [ngudtext, setngud] = useState()

  const dateValue = Date.now()
  const minDate = new Date("04/30/2021 00:00 AM");
  const maxDate = new Date("05/16/2021 12:00 AM");

  const chechLottery = async () => {
    await Axios.get(api + "/ngud/check_prize").then((res) => {
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

  return (
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
                  <th>วัน/เวลา เริ่มจำหน่าย</th>
                  <th>วัน/เวลา สิ้นสุดการจำหน่าย</th>
                  <th>สถานะ</th>
                  <th className="text-center">สลากในระบบ (ใบ)</th>
                  <th>ตรวจผลรางวัล</th>
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
                        <Moment format="DD MM YYYY HH:mm">
                          {item.start}
                        </Moment>
                      </td>
                      <td>
                        <Moment format="DD MM YYYY HH:mm">
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
                        <div><a className="btn btn-sm" href={"lottery/" + item.ngud}>จัดการสลาก</a></div>
                      </td>
                      <td>
                        {item.check_prize ?
                          <span><a href={"lottery/" + item.ngud + "/reward"}>ผู้ถูกรางวัล</a></span>
                          :
                          <span className="btn btn-sm btn-info" onClick={e => chechLottery()}>ตรวจรางวัล</span>
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

              <DateTimePickerComponent
                placeholder="วัน/เวลา เริ่มต้นการจำหน่าย"
                format="dd MM yyyy HH:mm"
                min={minDate}
                max={maxDate}
                minDays={10}
                onChange={e => setstartsell(e.target.value)}
              />
            </Form.Group>
            <Form.Group >
              <DateTimePickerComponent
                placeholder="วัน/เวลา สิ้นสุดการจำหน่าย"
                format="dd MM yyyy HH:mm"
                min={minDate}
                max={maxDate}
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
    </div>
  );
}

export default Ngud;
