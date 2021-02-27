import React from "react";

export default function Menu() {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          {/* <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          /> */}
          <span className="brand-text font-weight-light">KHOHUAI ADMIN</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/useradmin.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                บอส บอสซ่า
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item has-treeview menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    {/* <i className="right fas fa-angle-left" /> */}
                  </p>
                </a>
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
                <a href="/lottery" className="nav-link">
                  <i className="nav-icon fas fa-ticket-alt" /> 
                  <p>
                    Lottery
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="/invoice" className="nav-link">
                <i className="nav-icon fas fa-file-invoice" />
                  <p>
                   Invoice
                    {/* <span className="badge badge-info right">6</span> */}
                  </p>
                </a>
                
              </li>
              <li className="nav-item has-treeview">
                <a href="/user" className="nav-link">
                  <i className="nav-icon fas fa-user" /> 
                  <p>
                    User
                 
                  </p>
                </a>
                
              </li>
             
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
}
