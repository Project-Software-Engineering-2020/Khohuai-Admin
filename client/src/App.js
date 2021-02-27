import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import LotteryReports from "./pages/LotteryReports";
import Invoice from "./pages/Invoice";
import AdUser from "./pages/AdUser";
import Header from "./components/Header";
import Menu from "./components/Menu";


export default function App() {
  return (
    <div >
      <Router>
        <Header />
        <Menu />
        <Switch >
          <Route  path="/lottery" exact component={LotteryReports} />
          <Route path="/invoice" exact component={Invoice} />
          <Route path="/user" exact component={AdUser} />
        </Switch>
      </Router>
    </div>
  );
}
