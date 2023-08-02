import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Navigation from '../navigation/Navigation'
import { Outlet } from 'react-router-dom' 

function Layout() {
  return (
    <>
        <Sidebar />
        <div className="wrapper-container">
            <Navigation />
            {/* <!-- Main content --> */}
            <section className="content">
                <Outlet />
            </section>
        </div>
    </>
  )
}

export default Layout