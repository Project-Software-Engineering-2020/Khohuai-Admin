import React, { useState, useEffect } from "react";
import { storage } from '../firebase/firebase'
import { Button, Modal } from "react-bootstrap";
import { getDetailUserReward } from "../redux/action/rewardAction";
import { useDispatch, useSelector } from "react-redux"
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import 'moment/locale/th';
import "./Reward.css";
import Axios from 'axios'
import { api } from '../environment'
const RewardDetail = (props) => {

  const id = props.match.params.rewardid
  const ngid = props.match.params.ngud;
  const dispatch = useDispatch();
  const reward = useSelector(state => state.reward)
  const ngud = useSelector((state) => state.ngud);

  const [image, setimage] = useState();
  const [imagePreview, setImagePreview] = useState()

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setimage();
    setImagePreview();
  };
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

  const handleChangeImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setimage(file);
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
  };

  const upload = async () => {


    let image_complete = []

    const imageName = image.name

    const uploadTask = storage.ref("slip/" + imageName).put(image);

    const updateToServer = async () => {

      const im = image_complete[0];

      await Axios.put(api + "/reward/uploadslip", { id, im }).then((res) => {
        if (res.data === "success") {
          dispatch(getDetailUserReward(id));
          handleClose();
        }
       
      });
    }

    await uploadTask.on(
      "state_change",
      (snapshot) => { },
      (error) => {
        console.log(error);
      },
      async () => {
        
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
    <div className="container mt-3 p-4 bg-white">
      <div className="history-user-buy">
        <div className="card">

          {/* /.card-header */}
          <div className="card-body">
            <div className="tab-content p-0 table-responsive">
              <div className="row mb-3 ml-0">
                <a href={"/lottery/"+ngid+"/reward"} class="backBtn"><i class="fa fa-chevron-left" aria-hidden="true"></i>  ย้อนกลับ</a>
              </div>
              {/* Morris chart - Sales */}
              <h5> หมายเลขรับรางวัล : {id} </h5>
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
                    <a type="button" onClick={handleShow}>&nbsp;&nbsp; อัพโหลด  </a>
                  </p>

              }

              <table className="table m-0 ">
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
                          <td><NumberFormat value={item.qty * item.reward} displayType={'text'} thousandSeparator={true}>{item.qty * item.reward}</NumberFormat></td>
                        </tr>
                      );
                    })
                    : null}
                </tbody>
              </table>
              <div className="section-summary-invoice mr-5">
                <div>**เลือกที่เลขสลากเพื่อดูสลากใบจริง**</div>
                <div>
                  <div className="summary-invoice ">
                    <div className="info-summary">
                      <div>เงินรางวัลรวม</div>
                      <NumberFormat value={reward.data.win_total} displayType={'text'} thousandSeparator={true} className="winNumber"><div>{reward.data.win_total}</div></NumberFormat>
                      <div className="baht">บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>หักค่าบริการ 1.5%</div>
                      <NumberFormat value={reward.data.win_chart} displayType={'text'} thousandSeparator={true} className="winNumber"><div>{reward.data.win_chart}</div></NumberFormat>
                      <div className="baht">บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>เงินรางวัลที่ได้รับทั้งสิ้น</div>
                      <NumberFormat value={reward.data.win_amount} displayType={'text'} thousandSeparator={true} className="winNumber"><div>{reward.data.win_amount}</div></NumberFormat>
                      <div className="baht">บาท</div>
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
                  className="full"
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
          <div>
             <input type="file" onChange={e => handleChangeImage(e)}></input>
          </div>
          <div>
                <img src={imagePreview} className="full" alt="preview-slip"></img>
          </div>
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
            <img src={reward.data.slip} className="full" alt="สลิปโอนเงิน" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RewardDetail;
