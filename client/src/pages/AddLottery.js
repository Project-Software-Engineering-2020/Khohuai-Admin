import React, { useState } from "react";
import Axios from "axios";

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
    }
  };

  const renderImage = () => {
    return image.map((photo) => {
      return (
        <div className="preimg">
          <img style={{width:"100%", height:"50%"}} src={photo} key={photo} />
        </div>
      );
    });
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
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">รูปสลาก</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            multiple
                            className="custom-file-input"
                            onChange={(e) => handleImage(e)}
                            required
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            เลือกไฟล์์
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <h3 className="text-center">รูปตัวอย่าง</h3>
                      {renderImage()}
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
