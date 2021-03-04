import React,{ useState } from 'react';
import Axios from 'axios';

function AddLottery() {

    const [image, setimage] = useState();
    const [number, setnumber] = useState("");
    const [ngud, setngud] = useState("");
    const [st, setst] = useState("");
    const [ref, setref] = useState("")

    const handleImage = (event) => {
        setimage(event.target.files[0])     
    }

    const UploadLottery = async () => {

        const data = new FormData() 
        data.append('image', image);
        data.append('number', number);
        data.append('ngud', ngud);
        data.append('st', st);
        data.append('ref', ref);
        
        await Axios.post("http://localhost:3002/lottery", data).then((res) => { console.log("upload success") })
    }

    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title pt-2">เพิ่มสลาก</h3>
                        </div>
                        <form>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>เลขสลาก</label>
                                    <input type="text" onChange={e => setnumber(e.target.value)} className="form-control" placeholder="เลข 6 หลัก" required/>
                                </div>
                                <div className="form-group">
                                    <label>งวดที่</label>
                                    <input type="text" onChange={e => setngud(e.target.value)} className="form-control" placeholder="เลข 2 หลัก" required/>
                                </div>
                                <div className="form-group">
                                    <label>ชุดที่</label>
                                    <input type="text" onChange={e => setst(e.target.value)} className="form-control" placeholder="เลข 2 หลัก" required/>
                                </div>
                                <div className="form-group">
                                    <label>ref no.</label>
                                    <input type="text" onChange={e => setref(e.target.value)} className="form-control" placeholder="เลข 7 หลัก" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">รูปสลาก</label>
                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={(e) => handleImage(e)} required/>
                                            <label className="custom-file-label" htmlFor="exampleInputFile">เลือกไฟล์์</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary" onClick={UploadLottery}>อัพโหลดสลาก</button>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="col-6">
                    <h3 className="text-center">รูปตัวอย่าง</h3>
                </div>
            </div>

        </div>
    )
}

export default AddLottery
