import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateApartmentMutation } from '../../app/services/apartment.service';
import { notification } from 'antd';

function ApartmentCreate() {
    const [apartmentNumber, setApartmentNumber] = useState("");
    const [area, setArea] = useState("");
    const [numberOfRooms, setNumberOfRooms] = useState("");
    const [status, setStatus] = useState(false);

    const[createApartment] = useCreateApartmentMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const handleAddApartment = () => {
        const newApartment = {apartmentNumber, area, numberOfRooms, status}
        createApartment(newApartment)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Thêm căn hộ thành công",
                    placement: "top",
                });
                setTimeout(() => {
                    navigate("/apartments")
                    location.reload();
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                api.info({
                    message: "Thông báo",
                    description: "Thêm căn hộ thất bại, có lỗi xảy ra trong lúc thêm",
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
                    <button type="button" className="btn btn-info px-4" onClick={handleAddApartment}>
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
                                        <label>Số nhà</label>
                                        <input type="text" className="form-control" id="apartmentNumber" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Diện tích (m2)</label>
                                        <textarea id="numberOfRooms" className="form-control" rows="1" value={area} onChange={(e) => setArea(e.target.value)}></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label>Số phòng</label>
                                        <textarea id="numberOfRooms" className="form-control" rows="1" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <select id="status" className="form-control" value={status ? "1" : "0"} onChange={(e => setStatus(e.target.value === "0" ? false : true))}>
                                            <option value="0">
                                                Đang bán
                                            </option>
                                            <option value="1">
                                                Đã bán
                                            </option>
                                        </select>
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

export default ApartmentCreate