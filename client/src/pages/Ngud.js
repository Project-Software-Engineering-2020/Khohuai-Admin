import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNgud } from "../redux/action/ngudAction";
import Moment from "react-moment";
import "moment/locale/th";

function Ngud() {
  const dispatch = useDispatch();
  const ngud = useSelector((state) => state.ngud);

  useEffect(() => {
    dispatch(getNgud());
  }, []);

  return (
    <div>
      hi ngud
      <div className="card">
        <div className="card-header border-transparent ">
          <h2 className="card-title pt-2">งวดทั้งหมด</h2>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table m-0">
              <thead>
                <tr>
                  <th>งวดที่</th>
                  <th>วันที่เริ่มจำหน่าย</th>
                  <th>วันที่สิ้นสุดการจำหน่าย</th>
                </tr>
              </thead>
              <tbody>
                {ngud.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.ngud}</td>
                      <td>
                        <Moment format="DD MMMM YYYY">
                          {item.start}
                        </Moment>
                      </td>
                      <td>
                        <Moment format="DD MMMM YYYY">
                          {item.end}
                        </Moment>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ngud;
