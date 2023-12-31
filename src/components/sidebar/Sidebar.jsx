import React from 'react'
import { Link } from 'react-router-dom'

function sidebar() {
  return (
    <div className="sidebar">
            <div className="logo d-flex justify-content-center align-items-center">
                <h3 className="fs-4 text-white">ADMIN</h3>
            </div>
            <div className="menu">
                <div className="menu-item">
                    <h5>
                        <span className="d-inline-block me-1"><i className="fa-solid fa-chess"></i></span>
                        Quản lý căn hộ
                    </h5>
                    <ul className="m-0 p-0">
                        <li>
                            <Link to={"/apartments"}>Danh sách căn hộ</Link>
                        </li>
                        <li>
                            <Link to ={"/apartments/create"}>Thêm căn hộ</Link>
                        </li>
                        <li>
                            <Link to ={"/apartments/search"}>Tìm căn hộ theo số nhà</Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-item">
                    <h5>
                        <span className="d-inline-block me-1"><i className="fa-solid fa-explosion"></i></span>
                        Quản lý người dân
                    </h5>
                    <ul className="m-0 p-0">
                        <li>
                            <Link to={"/person"}>Danh sách người dân</Link>
                        </li>
                        <li>
                            <Link to={"/person/create"}>Thêm người dân</Link>
                        </li>
                        <li>
                            <Link to={"/person/search"}>Tìm kiếm người dân</Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-item">
                    <h5>
                        <span className="d-inline-block me-1"><i className="fa-solid fa-cookie-bite"></i></span>
                        Quản lý hóa đơn
                    </h5>
                    <ul className="m-0 p-0">
                        <li>
                            <Link to={"/bills"}>Danh sách hóa đơn</Link>
                        </li>
                        <li>
                            <Link to={"/bills/create"}>Tạo hóa đơn</Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-item">
                    <h5>
                        <span className="d-inline-block me-1"><i className="fa-solid fa-lock"></i></span>
                        Quản lý phí
                    </h5>
                    <ul className="m-0 p-0">
                        <li>
                            <Link to={"/fees"}>Danh sách phí</Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-item">
                    <h5>
                        <span className="d-inline-block me-1"><i className="fa-solid fa-newspaper-o"></i></span>
                        Quản lý tin tức
                    </h5>
                    <ul className="m-0 p-0">
                        <li>
                            <Link to={"/news"}>Danh sách tin tức</Link>
                        </li>
                        <li>
                            <Link to={"/news/create"}>Tạo tin tức</Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-item">
                    <h5>
                        <span className="d-inline-block me-1"><i className="fa-solid fa-server"></i></span>
                        Quản lý dịch vụ
                    </h5>
                    <ul className="m-0 p-0">
                        <li>
                            <Link to={"/services"}>Danh sách dịch vụ</Link>
                        </li>
                        {/* <li>
                            <Link to={"/fees"}>Tạo dịch vụ</Link>
                        </li> */}
                    </ul>
                </div>
                <div className="menu-item">
                    <h5>
                        <span className="d-inline-block me-1"><i className="fa-solid fa-tablet"></i></span>
                        Quản lý thiết bị
                    </h5>
                    <ul className="m-0 p-0">
                        <li>
                            <Link to={"/devices"}>Danh sách thiết bị</Link>
                        </li>
                        <li>
                            <Link to={"/devices/create"}>Thêm thiết bị</Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-item">
                    <h5>
                        <span className="d-inline-block me-1"><i className="fa-solid fa-tablet"></i></span>
                        Quản lý tài khoản
                    </h5>
                    <ul className="m-0 p-0">
                        <li>
                            <Link to={"/users"}>Danh sách tài khoản</Link>
                        </li>
                        <li>
                            <Link to={"/users/create"}>Thêm tài khoản</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
  )
}

export default sidebar