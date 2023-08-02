import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetApartmentsQuery } from '../../app/services/apartment.service';
import { useGetPersonByIdQuery, useUpdatePersonMutation } from '../../app/services/person.service';
import { formatDate } from '../../utils/functionUtils';
import { notification } from 'antd';

function PersonDetail() {
    const { personId } = useParams();
    const {data: apartments} = useGetApartmentsQuery();
    const {data: person} = useGetPersonByIdQuery(personId);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cardIdNumber, setCardIdNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [representative, setRepresentative] = useState("");
    const [apartmentId, setApartmentId] = useState("");

    const [updatePerson] = useUpdatePersonMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (!person) return;
        setName(person.name);
        setEmail(person.email);
        setPhoneNumber(person.phoneNumber);
        setCardIdNumber(person.cardIdNumber);
        setBirthDate(formatDate(person.birthDate));
        setGender(person.gender);
        setRepresentative(person.representative);
        if (!person.apartment) {
            setApartmentId(0)
        } else {
            setApartmentId(person.apartment.id);
        }
    }, [person]);

    const handleUpdatePerson = () => {
        const updatedPerson = {id: personId, representative, apartmentId}
        updatePerson(updatedPerson)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Cập nhật thông tin cư dân thành công",
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
                    description: "Cập nhật thông tin cư dân thất bại, có lỗi xảy ra trong quá trình cập nhật",
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
                    <button type="button" className="btn btn-info px-4" onClick={handleUpdatePerson}>
                        Lưu
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
                                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <textarea id="email" className="form-control" rows="1" value={email} onChange={(e) => setEmail(e.target.value)} disabled></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <textarea id="phoneNumber" className="form-control" rows="1" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Số chứng minh thư</label>
                                        <textarea id="cardIdNumber" className="form-control" rows="1" value={cardIdNumber} onChange={(e) => setCardIdNumber(e.target.value)} disabled></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày sinh</label>
                                        <textarea id="birthDate" className="form-control" rows="1" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} disabled></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Giới tính</label>
                                        <select id="gender" className="form-control" value={gender ? "1" : "0"} onChange={(e => setGender(e.target.value === "0" ? false : true))} disabled>
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

export default PersonDetail