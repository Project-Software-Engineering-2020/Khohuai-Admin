import React, { useEffect } from "react";
import LastOders from "../components/LastOders";
import "./dashboard.css";
import { getAllInvoice } from "../redux/action/invoiceAction";
import { getAllUser } from "../redux/action/userAction"
import { setHeader } from "../redux/action/headerAction";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../components/Chart";

const Dashboard = () => {
  const dispatch = useDispatch();
  let invoice = useSelector((state) => state.invoice);
  let user = useSelector((state) => state.user);

  useEffect( async () => {
    const _header = "Dashboard";
    await dispatch(setHeader(_header));
    dispatch(getAllInvoice());
    dispatch(getAllUser());
  }, []);

  return (
    <div>
      {/* <h2>Dashboard</h2> */}
      <div>
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{invoice.data.length}</h3>
                <p>คำสั่งซื้อทั้งหมด</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
              <a href="/invoice" className="small-box-footer">
                ดูเพิ่มเติม <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="small-box bg-success">
              <div className="inner">
                <h3>45/100</h3>
                <p>สินค้าคงเหลือ</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">
                ดูเพิ่มเติม <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
  
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{user.data.length}</h3>
                  <p>สมาชิกในระบบ</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/User" className="small-box-footer">
                  ดูเพิ่มเติม <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
{/*     
                    <div className="col-lg-3 col-6">
                    
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>65</h3>
                                <p>Unique Visitors</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-pie-graph" />
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                        </div>
                    </div>  */}
       
        </div>
      </div>

      
      <Chart/>
      
      <LastOders data={invoice.data} />
    </div>
  );
};

export default Dashboard;
