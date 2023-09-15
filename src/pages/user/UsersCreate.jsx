import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../../app/services/user.service';
import { notification } from 'antd';

function UsersCreate() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const[createUser] = useCreateUserMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const handleAddUser = () => {
        const newUser = {username, password}
        createUser(newUser)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Thêm user thành công",
                    placement: "top",
                });
                setTimeout(() => {
                    navigate("/users")
                    location.reload();
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                api.info({
                    message: "Thông báo",
                    description: "Thêm user thất bại, có lỗi xảy ra trong lúc thêm",
                    placement: "top",
                });
            })
    }
    return (
        <>
        {contextHolder}
        <div className="container-fluid">
            <div className="row py-2">
                <div className="col-6">
                    <button type="button" className="btn btn-info px-4" onClick={handleAddUser}>
                        Tạo
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" id="userName" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UsersCreate