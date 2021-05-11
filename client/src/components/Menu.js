import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import { setlogout } from "../redux/action/authAction";

export default function Menu() {
  const dispatch = useDispatch()
  const stetus = useSelector(state => state.auth)
  const redirect = stetus.status


  function onLogout() {
    dispatch(setlogout())
  }
  console.log("Rediract =========================================",stetus.status)

  // alert(redirect)

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="" className="brand-link">
          {/* <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          /> */}
          <span className="brand-text font-weight-light">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KHOHUAI ADMIN</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-9/77062_443307505736304_46602656_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=de6eea&_nc_eui2=AeGg724_D-utr1qeKu-0IoNUTsl-maYwWZ5OyX6ZpjBZnmtyisjPVg_qc5-1daSxngCV7IYJCiif7G1CpL_teFAi&_nc_ohc=-waAhoK3kxIAX8UCYEK&_nc_ht=scontent.fbkk5-1.fna&oh=9a0bdbd2696e2aa3cd25aaa1bde8a189&oe=6074044A"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info d-block text-white">
                บอส บอสซ่า
            </div>
          </div> */}
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to="/" className="nav-link p-3"  exact={true} activeClassName="active menu-open has-treeview">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                  &nbsp;
                    Dashboard
                    {/* <i className="right fas fa-angle-left" /> */}
                  </p>
                </NavLink>
                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./index.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v1</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index2.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v2</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index3.html" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v3</p>
                    </a>
                  </li>
                </ul> */}
              </li>
              <li className="nav-item">
                <NavLink to="/lottery" className="nav-link p-3" activeClassName="active menu-open has-treeview ">
                  <i className="nav-icon fas fa-ticket-alt" /> 
                  <p>
                  &nbsp; Lottery
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </NavLink>
              </li>
              <li className="nav-item has-treeview">
              <NavLink to="/invoice" className="nav-link p-3" activeClassName="active menu-open has-treeview ">
                <i className="nav-icon fas fa-file-invoice" />
                  <p>
                  &nbsp; Invoice
                    {/* <span className="badge badge-info right">6</span> */}
                  </p>
                </NavLink>
                
              </li>
              <li className="nav-item has-treeview">
              <NavLink to="/user" className="nav-link p-3" activeClassName="active menu-open has-treeview ">
                  <i className="nav-icon fas fa-user" /> 
                  <p>
                  &nbsp; User
                 
                  </p>
                </NavLink>
                
              </li>
              {redirect ? (
                <button
                  type="button"
                  className="btn-login"
                  onClick={onLogout}
                  >
                Logout
                </button>
              // <li className="nav-item has-treeview">
              // <NavLink onClick={onLogout} className="nav-link p-3" activeClassName="active menu-open has-treeview ">
              //     <i className="nav-icon fas fa-user" /> 
              //     <p>
              //     &nbsp; Logout
                 
              //     </p>
              //   </NavLink>
              // </li>
              ) : (
              <li className="nav-item has-treeview">
              <NavLink to="/adminLogin" className="nav-link p-3" activeClassName="active menu-open has-treeview ">
                  <i className="nav-icon fas fa-user" /> 
                  <p>
                  &nbsp; Login
                 
                  </p>
                </NavLink>
                
              </li>
              )}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
}