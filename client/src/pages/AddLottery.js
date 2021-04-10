import React, { useState } from "react";
import Axios from "axios";
import "../stylesheets/AddLottery.css";
import { storage, firestore } from '../firebase/firebase';


function AddLottery() {
  const [image, setimage] = useState([]);
  const [image_upload, setimage_upload] = useState([]);
  const [number, setnumber] = useState("");

  let image_boss = [];
  const handleImage = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setimage((prevImg) => prevImg.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      console.log(image);

      console.log(e.target.files);

      Array.from(e.target.files).map((file) =>
        setimage_upload(pre => [...pre, file])
      )
    }
  };

  const renderImage = () => {
    return image.map((photo, index) => {
      return (
        <div>
          <div className="img" key={photo}>
            <img
              style={{ width: "100%", height: "100%", padding: "10px" }}
              src={photo}
            />
            <button
              type="button"
              className="delbtn"
              onClick={(e) => delImg(index)}
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      );
    });
  };

  const delImg = (photo) => {
    const delImg = image.filter((img, index) => index !== photo);
    const image_n = image.filter((img, index) => index !== photo);
    setimage_upload(image_n)
    setimage(delImg);
  };

  const UploadLottery = async (e) => {
    e.preventDefault()

    const data = new FormData();
   

    // data.append("image", image_url);
    // data.append("number", number);

    const insert = () => {
      console.log(image_boss);
      Axios.post("http://localhost:3002/lottery", { number, image_boss }).then((res) => {
        console.log("upload success");
      });
    }

    // console.log(image);

    await image_upload.forEach(async (item) => {
      const imageName = "bosss"
      const uploadTask = storage.ref("lotterys/" + imageName).put(item);
      let buff = ""
      await uploadTask.on(
        "state_change",
        (snapshot) => { },
        (error) => {
          console.log(error);
        },
        async () => {
          console.log(imageName);
          await storage
            .ref("lotterys")
            .child(imageName)
            .getDownloadURL()
            .then(async (url) => {
              // buff = url;
              // console.log(buff)

              // const addImage = (buff) => {


              await image_boss.push(url);
              // }
              await insert();

              console.log("555")
            });
        }

      )

    })

    // console.log(image_boss);

    // data.append("image", image_url);
    // data.append("number", number);

    // const d = {
    //   image: image_url,
    //   number: number
    // }

    // console.log(image_boss[0]);

  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="col-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title pt-2">เพิ่มสลาก</h3>
            </div>

            <form>
              <div className="card-body">
                <div className="d-flex justify-content-center">
                  <div className="col-7">
                    <div className="form-group">
                      <label>เลขสลาก</label>
                      <input
                        type="text"
                        onChange={(e) => setnumber(e.target.value)}
                        className="form-control"
                        placeholder="เลข 6 หลัก"
                        required
                      />
                    </div>

                    <div className="addfile">
                      <div className="d-flex justify-content-center">
                        <button className="addbtn" type="button">
                          <label htmlFor="add">เพิ่มรูปภาพ</label>
                          <input
                            type="file"
                            multiple
                            className="custom-file-input"
                            onChange={(e) => handleImage(e)}
                            id="add"
                            required
                          />
                        </button>
                      </div>
                    </div>

                    <div className="text-center mt-2">ทั้งหมด {image.length} ใบ</div>

                    <div className="row">
                      <div className="preimg">{renderImage()}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => UploadLottery(e)}
                  >
                    อัพโหลดสลาก
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLottery;
