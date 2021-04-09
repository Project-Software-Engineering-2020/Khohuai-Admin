import React, { useState } from "react";
import Axios from "axios";
import "../stylesheets/AddLottery.css";

function AddLottery() {
  const [image, setimage] = useState([]);
  const [number, setnumber] = useState("");
  const [ngud, setngud] = useState("");
  const [st, setst] = useState("");
  const [ref, setref] = useState("");

  const handleImage = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setimage((prevImg) => prevImg.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      console.log(image);
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
    setimage(delImg);
  };

  const UploadLottery = async () => {
    const data = new FormData();
    data.append("image", image);
    data.append("number", number);
    data.append("ngud", ngud);
    data.append("st", st);
    data.append("ref", ref);

    await Axios.post("http://localhost:3002/lottery", data).then((res) => {
      console.log("upload success");
    });
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
                    type="submit"
                    className="btn btn-primary"
                    onClick={UploadLottery}
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
