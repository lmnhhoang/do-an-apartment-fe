import React , { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { useDeleteApartmentMutation, useGetApartmentByIdQuery, useUpdateApartmentMutation } from '../../app/services/apartment.service';
import { notification } from 'antd';
import { useGetNonActiveOrByApartmentIdPersonQuery } from '../../app/services/person.service';

function ApartmentDetail() {
    const { apartmentId } = useParams();
    const {data: apartment, isLoading} = useGetApartmentByIdQuery(apartmentId);
    const {data: person} = useGetNonActiveOrByApartmentIdPersonQuery(apartmentId);

    const [apartmentNumber, setApartmentNumber] = useState("");
    const [area, setArea] = useState("");
    const [numberOfRooms, setNumberOfRooms] = useState("");
    const [status, setStatus] = useState("");
    const [bills, setBills] = useState([]);
    const [persons, setPersons] = useState([]);

    const [updateApartment] = useUpdateApartmentMutation();
    const [deleteApartment] = useDeleteApartmentMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (!apartment) return;
        setApartmentNumber(apartment.apartmentNumber);
        setArea(apartment.area);
        setNumberOfRooms(apartment.numberOfRooms);
        setStatus(apartment.status);
        setBills(apartment.bills.map((b) => b.id));
        setPersons(apartment.persons.map((p) => p.id))
    }, [apartment]);

    const optionsPerson = person && person.map((p) => {
        return {
            value: p.id,
            label: p.name
        }
    })
    const optionSelectedPerson = optionsPerson && optionsPerson.filter((o) => persons.includes(o.value))

    const handleChangePerson = (data) => {
        const ids = data.map(e => e.value)
        setPersons(ids)
    }

    const handleUpdateApartment = () => {
        const updatedApartment = {id: apartmentId, status, personId: persons}
        updateApartment(updatedApartment)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Cập nhật căn hộ thành công",
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
                    description: "Cập nhật căn hộ thất bại, có lỗi xảy ra trong lúc cập nhật",
                    placement: "top",
                });
            })
    }

    const handleDeleteApartment = () => {
        deleteApartment(apartmentId)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Xóa căn hộ thành công",
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
                    description: "Xóa căn hộ thất bại, có lỗi xảy ra trong lúc xóa",
                    placement: "top",
                });
            })
    }

    if (isLoading) {
        return <h2>Loading....</h2>
    }
    return (
        <>
        {contextHolder}
        <div className="container-fluid">
            <div className="row py-2">
                <div className="col-6">
                    <button type="button" className="btn btn-info px-4" onClick={handleUpdateApartment}>
                        Lưu
                    </button>
                    <button type="button" className="btn btn-danger px-4" onClick={handleDeleteApartment}>
                        Xóa
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
                                        <input type="text" className="form-control" id="apartmentNumber" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} disabled/>
                                    </div>

                                    <div className="form-group">
                                        <label>Diện tích (m2)</label>
                                        <textarea id="numberOfRooms" className="form-control" rows="1" value={area} onChange={(e) => setArea(e.target.value)} disabled></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label>Số phòng</label>
                                        <textarea id="numberOfRooms" className="form-control" rows="1" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} disabled></textarea>
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
                                    <div className="form-group">
                                        <label>Danh sách người đang ở</label>
                                        <div className="select2-purple">
                                            <Select options={optionsPerson} isMulti onChange={handleChangePerson} value={optionSelectedPerson}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Danh sách hóa đơn</label>
                                        <div className="select2-purple">
                                            {bills.length > 0 ? (<Link to={`/bills/apartment/${apartmentId}`}>Nhấn để xem chi tiết</Link>) : "Chưa có hóa đơn nào"}
                                        </div>
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

export default ApartmentDetail