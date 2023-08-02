import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetApartmentsQuery } from '../../app/services/apartment.service';
import { useAddPersonMutation } from '../../app/services/person.service';
import { notification } from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PersonCreate() {
    const {data: apartments} = useGetApartmentsQuery();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cardIdNumber, setCardIdNumber] = useState("");
    const [gender, setGender] = useState(true);
    const [representative, setRepresentative] = useState(false);
    const [apartmentId, setApartmentId] = useState("");
    const [startDate, setStartDate] = useState("");

    const[addPerson] = useAddPersonMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const handleAddPerson = () => {
        const newPerson = {name, email, phoneNumber, cardIdNumber, birthDate: startDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}).split('/').join('-'), gender, representative, apartmentId}
        addPerson(newPerson)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Thêm cư dân thành công",
                    placement: "top",
                });
                setTimeout(() => {
                    navigate("/person")
                    location.reload();
                }, 1000)
            })
            .catch((err) => {
                console.log(err)
                api.info({
                    message: "Thông báo",
                    description: "Thêm cư dân thất bại, có lỗi xảy ra trong quá trình thêm",
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
                    <button type="button" className="btn btn-info px-4" onClick={handleAddPerson}>
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
                                        <label>Họ và tên</label>
                                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <textarea id="email" className="form-control" rows="1" value={email} onChange={(e) => setEmail(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <textarea id="phoneNumber" className="form-control" rows="1" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Số chứng minh thư</label>
                                        <textarea id="cardIdNumber" className="form-control" rows="1" value={cardIdNumber} onChange={(e) => setCardIdNumber(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày sinh</label>
                                        <DatePicker 
                                            selected={startDate} 
                                            onChange={(date) => setStartDate(date)} 
                                            dateFormat={"dd-MM-yyyy"}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Giới tính</label>
                                        <select id="gender" className="form-control" value={gender ? "1" : "0"} onChange={(e => setGender(e.target.value === "0" ? false : true))}>
                                            <option value="0">
                                                Nữ
                                            </option>
                                            <option value="1">
                                                Nam
                                            </option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Đại diện căn hộ</label>
                                        <select id="representative" className="form-control" value={representative ? "1" : "0"} onChange={(e => setRepresentative(e.target.value === "0" ? false : true))}>
                                            <option value="0">
                                                Không
                                            </option>
                                            <option value="1">
                                                Có
                                            </option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Căn hộ</label>
                                        <select id="apartmentId" className="form-control" value={apartmentId} onChange={(e => setApartmentId(e.target.value))}>
                                            <option value="0">
                                                Không còn ở trong chung cư
                                            </option>
                                            {apartments && apartments.map((a, i) => (
                                                <option value={a.id} key={i}>
                                                    {a.apartmentNumber}
                                                </option>
                                            ))}
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

export default PersonCreate