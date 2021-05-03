import React, { useState, useEffect } from "react";
import { storage } from '../firebase/firebase'
import { Button, Modal } from "react-bootstrap";
import { getDetailUserReward } from "../redux/action/rewardAction";
import { useDispatch, useSelector } from "react-redux"
import Moment from 'react-moment';
import 'moment/locale/th';
import "./Reward.css";
import Axios from 'axios'
const RewardDetail = (props) => {

  const id = props.match.params.rewardid
  const dispatch = useDispatch();
  const reward = useSelector(state => state.reward)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [slip, setSlip] = useState(false);
  const handleCloseSlip = () => setSlip(false);
  const handleShowSlip = () => setSlip(true);

  const [showLottery, setshowLottery] = useState(false);
  const [lotterydate, setlotterydate] = useState([])
  const handleLotteryClose = () => setshowLottery(false);
  
  const handleShowLottery = (item) => {
    setshowLottery(true);
    setlotterydate(item)
  }

  const [image, setimage] = useState();



  const upload = async () => {


    let image_complete = []

    const imageName = image.name

    const uploadTask = storage.ref("slip/" + imageName).put(image);

    const updateToServer = async () => {

      console.log("send to server");

      const im = image_complete[0];

      await Axios.put("http://localhost:3002/reward/uploadslip", { id, im }).then((res) => {
        if (res.data === "success") {
          dispatch(getDetailUserReward(id));
          handleClose();
        }
        console.log("upload success");
      });
    }

    await uploadTask.on(
      "state_change",
      (snapshot) => { },
      (error) => {
        console.log(error);
      },
      async () => {
        console.log(imageName);
        await storage
          .ref("slip")
          .child(imageName)
          .getDownloadURL()
          .then(async (url) => {

            await image_complete.push(url);

            await updateToServer()

          });
      }

    )




  }

  useEffect(() => {
    dispatch(getDetailUserReward(id));
  }, [])

  return (
    <div className="container mt-3 p-3 bg-white">
      <div className="history-user-buy">
        <div className="card">

          {/* /.card-header */}
          <div className="card-body">
            <div className="tab-content p-0">
              <div className="row mb-3 ml-0">
                <a href={"/reward"} class="backBtn"><i class="fa fa-chevron-left" aria-hidden="true"></i>  ย้อนกลับ</a>
              </div>
              {/* Morris chart - Sales */}
              <h3> หมายเลขรับรางวัล : {id} </h3>
              <p>
                งวดประจำวันที่{" "}
                <Moment format="DD MMMM YYYY" locale="th">
                  {reward.data.ngud_date}
                </Moment>
              </p>
              <p>ชื่อบัญชี  : {reward.data.book_name}</p>
              <p>เลขที่บัญชี  : {reward.data.book_number} </p>
              <p>ธนาคาร  :  {reward.data.book_provider}</p>
              {
                reward.data.success ?
                  <p >
                    สถานะ : สำเร็จ <span className="linecolor" onClick={handleShowSlip}>ดูหลักฐานการโอนเงิน </span>
                  </p>
                  :

                  <p className="line"  >
                    สถานะ : รอการอัพโหลดหลักฐานการโอนเงินรางวัล
                    <button type="button" onClick={handleShow}>อัพโหลด</button>
                  </p>

              }

              <table className="table m-0">
                <thead>
                  <tr>
                    <th>เลขสลาก</th>
                    <th>รางวัลที่ถูก</th>
                    <th>จำนวน (ใบ)</th>
                    <th>เงินรางวัลรวม (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {reward.data.lottery
                    ? reward.data.lottery.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td onClick={e => handleShowLottery(item.lottery)} >{item.number}</td>
                          <td>
                            {item.prize.map((pz) => {
                              return <p>{pz}</p>
                            })}
                          </td>
                          <td>{item.qty}</td>
                          <td>{item.qty * item.reward}</td>
                        </tr>
                      );
                    })
                    : null}
                </tbody>
              </table>
              <div className="section-summary-invoice">
                <div>**เลือกที่เลขสลากเพื่อดูสลากใบจริง**</div>
                <div>
                  <div className="summary-invoice">
                    <div className="info-summary">
                      <div>เงินรางวัลรวม</div>
                      <div>{reward.data.win_total}</div>
                      <div>บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>หักค่าบริการ 1.5%</div>
                      <div>{reward.data.win_chart}</div>
                      <div>บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>เงินรางวัลที่ได้รับทั้งสิ้น</div>
                      <div>{reward.data.win_amount}</div>
                      <div>บาท</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-reward">
                <div className="txt">

                </div>
                {reward.data.success ? null :
                  <Button onClick={handleShow}>อัพโหลดสลิปโอนเงิน</Button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*    แสดงสลาก */}
      <Modal size="md" show={showLottery} onHide={handleLotteryClose}>
        <Modal.Header closeButton>
          <Modal.Title>รูปสลาก</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            lotterydate ?
              lotterydate.map((lottery) => {
                return <img
                  className="slip"
                  src={lottery}
                />
              })
              :
              null
          }
        </Modal.Body>

      </Modal>

      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>หลักฐานการโอนเงิน</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <input type="file" onChange={e => setimage(e.target.files[0])}></input>
          {/* previewimage */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={upload}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="md" show={slip} onHide={handleCloseSlip}>
        <Modal.Header closeButton>
          <Modal.Title>สลิปโอนเงิน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
              <img src={reward.data.slip} width={300} alt="สลิปโอนเงิน"/>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RewardDetail;
