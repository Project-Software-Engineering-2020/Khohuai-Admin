import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap-css-only/css/bootstrap.min.css";
import "../node_modules/mdbreact/dist/css/mdb.css";
import { useSelector } from "react-redux"


//component
import Header from "./components/Header";
import Menu from "./components/Menu";
import PrivateRoute from "./util/ProtectedRoute";

//page
import Dashboard from "./pages/Dashboard";
import Lottery from "./pages/Lottery";
import Invoice from "./pages/Invoice";
// import User from "./pages/User";
import AddLottery from "./pages/AddLottery";
import Login from "./pages/Login";
import Userinvoice from "./pages/Userinvoice";
import Detail from "./pages/Detail";
import Users from "./pages/Users";
import Ngud from "./pages/Ngud";
import Reward from "./pages/Reward";
import RewardDetail from "./pages/RewardDetail";
import UserReward from "./pages/UserReward";

export default function App() {

  const auth = useSelector(state => state.auth)
  return (
    <div className="wrapper">
      <Router>
        {auth.status === false ?
          null
          :
          <div>
        <Header />
        <Menu />
        </div>
        }

        <div className="content-wrapper p-3 bg-white">
          <Switch>
            <Route path="/adminLogin" component={Login} />
            <PrivateRoute path="/" exact={true} component={Dashboard} />
            <PrivateRoute path="/invoice" exact={true} component={Invoice} />
            <PrivateRoute path="/user" exact={true} component={Users} />
            <PrivateRoute path="/user/:id" component={Userinvoice} />
            <PrivateRoute path="/user/reward/:id" component={UserReward} />
            <PrivateRoute path="/invoice/:id" component={Detail} />
            <PrivateRoute path="/lottery" exact={true} component={Ngud} />
            <PrivateRoute path="/lottery/:ngud" exact={true} component={Lottery} />
            <PrivateRoute path="/lottery/:ngud/create" component={AddLottery} />
            <PrivateRoute path="/lottery/:ngud/reward" exact={true} component={Reward} />
            <PrivateRoute path="/lottery/:ngud/reward/:rewardid" component={RewardDetail} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
