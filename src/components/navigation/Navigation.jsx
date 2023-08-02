import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import { logout } from '../../app/slices/auth.slice';

function navigation() {
    const { auth } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <nav className="d-flex justify-content-end align-items-center px-3">
            <div className="dropdown">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {auth.username}
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                        <button className="dropdown-item" href="#" onClick={handleLogout}>Đăng xuất</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default navigation