import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';
import { useGetApartmentsQuery } from '../../app/services/apartment.service';
import { useAddBillMutation } from '../../app/services/bill.service'
import { useGetFeesQuery } from '../../app/services/fee.service';
import { notification } from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BillCreate() {
    const {data: apartments} = useGetApartmentsQuery();
    const {data: fees} = useGetFeesQuery();

    const [electricityNumber, setElectricityNumber] = useState("");
    const [waterNumber, setWaterNumber] = useState("");
    const [apartmentId, setApartmentId] = useState("");
    const [feeTypeId, setFeeTypeId] = useState([]);
    const [billDate, setBillDate] = useState("");

    const[createBill] = useAddBillMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const options = fees && fees.map((f) => {
        return {
            value: f.id,
            label: f.name
        }
    })

    const handleChangeFeeType = (data) => {
        const ids = data.map(e => e.value)
        setFeeTypeId(ids)
    }

    const handleAddBill = () => {
        const newBill = {electricityNumber, waterNumber, billDate: billDate.toLocaleDateString('en-GB', {month: '2-digit', year: 'numeric'}).split('/').join('-'), apartmentId, feeTypeId}
        createBill(newBill)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Thêm hóa đơn thành công",
                    placement: "top",
                });
                setTimeout(() => {
                    navigate("/bills")
                    location.reload();
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                api.info({
                    message: "Thông báo",
                    description: "Thêm hóa đơn thất bại, có lỗi xảy ra trong lúc thêm",
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
                    <button type="button" className="btn btn-info px-4" onClick={handleAddBill}>
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
                                        <label>Số điện (kWh)</label>
                                        <input type="text" className="form-control" id="electricityNumber" value={electricityNumber} onChange={(e) => setElectricityNumber(e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Số nước (m3)</label>
                                        <textarea id="apartmentId" className="form-control" rows="1" value={waterNumber} onChange={(e) => setWaterNumber(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Thời gian</label>
                                        <DatePicker 
                                            selected={billDate} 
                                            onChange={(date) => setBillDate(date)} 
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            showFullMonthYearPicker
                                            />
                                    </div>
                                    <div className="form-group">
                                        <label>Căn hộ</label>
                                        <select id="feeTypeId" className="form-control" value={apartmentId} onChange={(e) => setApartmentId(e.target.value)}>
                                            {apartments && apartments.map((a, i) => (
                                                <option value={a.id} key={i}>
                                                    {a.apartmentNumber}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Danh sách các phí</label>
                                        <div className="select2-purple">
                                            <Select options={options} isMulti onChange={handleChangeFeeType}/>
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

export default BillCreate