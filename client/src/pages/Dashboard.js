import React, { useEffect } from "react";
import LastOders from "../components/LastOders";
import "./dashboard.css";
import { getAllInvoice } from "../redux/action/invoiceAction";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  let invoice = useSelector((state) => state.invoice);

  useEffect(() => {
    dispatch(getAllInvoice());
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
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
          {
            <div className="col-lg-3 col-6">
              <div className="small-box bg-pink">
                <div className="inner">
                  <h3>44</h3>
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
            /* 
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
                    </div> */
          }
        </div>
      </div>

      
      
      
      <LastOders data={invoice.data} />
    </div>
  );
};

export default Dashboard;
