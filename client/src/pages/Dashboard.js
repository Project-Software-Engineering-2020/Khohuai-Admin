import React, { useEffect } from "react";
import LastOders from "../components/LastOders";
import "./dashboard.css";
import { getAllInvoice } from "../redux/action/invoiceAction";
import { getAllUser } from "../redux/action/userAction"
import { setHeader } from "../redux/action/headerAction";
import { getNgud } from "../redux/action/ngudAction";
import { getAllLottery } from '../redux/action/lotteryAction'
import { useDispatch, useSelector } from "react-redux";
import Chart from "../components/Chart";

const Dashboard = () => {
  const dispatch = useDispatch();
  let invoice = useSelector((state) => state.invoice);
  let user = useSelector((state) => state.user);
  const lottery = useSelector(state => state.lottery)

  useEffect(async () => {
    const _header = "Dashboard";
    await dispatch(setHeader(_header));
    dispatch(getAllInvoice());
    dispatch(getAllUser());
    dispatch(getNgud());
    dispatch(getAllLottery())
  }, []);

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-lg-4 col-6">
            <div className="small-box bg-info card">
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

          <div className="col-lg-4 col-6">
            <div className="small-box bg-success card">
              <div className="inner">
                <h3>{lottery.stock}</h3>
                <p>สลากในระบบ</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="/lottery" className="small-box-footer">
                ดูเพิ่มเติม <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-6">
            <div className="small-box bg-warning card">
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
        </div>
      </div>

      <div class="row">
        <div className="col-lg-7 col-12">
          <Chart />
        </div>
        <div className="col-lg-5 col-12">
          <Chart />
        </div>
      </div>
      <div className="mt-2">
        <LastOders data={invoice.data} />
      </div>
      
    </div>
  );
};

export default Dashboard;
