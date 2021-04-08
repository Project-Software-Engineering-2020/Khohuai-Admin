import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap-css-only/css/bootstrap.min.css";
import "../node_modules/mdbreact/dist/css/mdb.css";

//component
import Header from "./components/Header";
import Menu from "./components/Menu";
//page
import Dashboard from "./pages/Dashboard";
import Lottery from "./pages/Lottery";
import Invoice from "./pages/Invoice";
import User from "./pages/User";
import AddLottery from "./pages/AddLottery";
import Login from "./pages/Login";
import Userinvoice from "./pages/Userinvoice";
import Detail from "./pages/Detail";
import Users from "./pages/Users";
import Ngud from "./pages/Ngud";

export default function App() {
  const user = true;
  return (
    <div>
      <Router>
        <Header />
        <Menu />
        <div className="content-wrapper p-3 bg-white">
          <Switch>
            <Route path="/lottery/ngud" component={Ngud} />
            <Route path="/lottery/create" component={AddLottery} />
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/lottery" exact={true} component={Lottery} />
            <Route path="/invoice" exact={true} component={Invoice} />
            {/* <Route path="/user" exact={true} component={User} /> */}
            <Route path="/user" exact={true} component={Users} />
            <Route path="/adminLogin" component={Login} />
            <Route path="/user/:id" component={Userinvoice} />
            <Route path="/invoice/:id" component={Detail} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
