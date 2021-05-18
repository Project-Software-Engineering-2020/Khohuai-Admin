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
import Income from '../components/income';

const Dashboard = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice);
  const user = useSelector((state) => state.user);
  const lottery = useSelector(state => state.lottery);
  const ngud = useSelector(state => state.ngud)

  useEffect(async () => {
    const _header = "แดชบอร์ด";
    await dispatch(setHeader(_header));
     await dispatch(getNgud());
    await dispatch(getAllUser());
    await dispatch(getAllLottery())
 
    await dispatch(getAllInvoice("lastest"));
  
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
              <a href={"/lottery/" + ngud.widget.ngud }className="small-box-footer">
                ดูเพิ่มเติม <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="small-box bg-warning card text-white">
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
        <div className="col-lg-5 col-12 mt-2">
          <Income/>
        </div>
        <div className="col-12">
           <LastOders data={invoice.data} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
