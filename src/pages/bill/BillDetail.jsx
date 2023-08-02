import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select';
import { useGetApartmentsQuery } from '../../app/services/apartment.service';
import { useGetFeesQuery } from '../../app/services/fee.service';
import { notification } from 'antd';
import { useDeleteBillMutation, useGetBillByIdQuery, useUpdateBillMutation } from '../../app/services/bill.service';
import { formatDate, formatMonth } from '../../utils/functionUtils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BillDetail() {
    const { billId } = useParams();
    const {data: apartments} = useGetApartmentsQuery();
    const {data: fees} = useGetFeesQuery();
    const {data: bill} = useGetBillByIdQuery(billId);

    const [electricityNumber, setElectricityNumber] = useState("");
    const [waterNumber, setWaterNumber] = useState("");
    const [apartmentId, setApartmentId] = useState("");
    const [billDate, setBillDate] = useState("");
    const [paidDate, setPaidDate] = useState("");
    const [status, setStatus] = useState("");
    const [feeTypeId, setFeeTypeId] = useState([]);

    const [updateBill] = useUpdateBillMutation();
    const [deleteBill] = useDeleteBillMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (!bill) return;
        setElectricityNumber(bill.electricityNumber);
        setWaterNumber(bill.waterNumber);
        setBillDate(formatMonth(bill.billDate));
        if (!bill.paidDate) {
            setPaidDate("");
        } else {
            setPaidDate(new Date(bill.paidDate));
        };
        setStatus(bill.status);
        setFeeTypeId(bill.feeTypeList.map((f) => f.id));
        setApartmentId(bill.apartmentId);
    }, [bill]);

    const options = fees && fees.map((f) => {
        return {
            value: f.id,
            label: f.name
        }
    })

    const optionSelected = options && options.filter((o) => feeTypeId.includes(o.value))

    const handleChangeFeeType = (data) => {
        const ids = data.map(e => e.value)
        setFeeTypeId(ids)
    }

    const handleDeleteBill = () => {
        deleteBill(billId)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Xóa hóa đơn thành công",
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
                    description: "Xóa hóa đơn thất bại, có lỗi xảy ra trong lúc xóa",
                    placement: "top",
                });
            })
    }

    const handleUpdateBill = () => {
        const updatedBill = {id: billId, paidDate: paidDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}).split('/').join('-'), feeTypeId}
        updateBill(updatedBill)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Cập nhật hóa đơn thành công",
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
                    description: "Cập nhật hóa đơn thất bại, có lỗi xảy ra trong lúc cập nhật",
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
                    <button type="button" className="btn btn-info px-4" onClick={handleUpdateBill}>
                        Lưu
                    </button>
                    <button type="button" className="btn btn-danger px-4" onClick={handleDeleteBill}>
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
                                        <label>Số điện (kWh)</label>
                                        <input type="text" className="form-control" id="electricityNumber" value={electricityNumber} onChange={(e) => setElectricityNumber(e.target.value)} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label>Số nước (m3)</label>
                                        <textarea id="apartmentId" className="form-control" rows="1" value={waterNumber} onChange={(e) => setWaterNumber(e.target.value)} disabled></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Thời gian</label>
                                        <textarea id="billDate" className="form-control" rows="1" value={billDate} onChange={(e) => setBillDate(e.target.value)} disabled></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày thanh toán</label>
                                        <DatePicker 
                                            selected={paidDate} 
                                            onChange={(date) => setPaidDate(date)} 
                                            dateFormat={"dd-MM-yyyy"}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <select id="status" className="form-control" value={status ? "1" : "0"} onChange={(e => setStatus(e.target.value === "0" ? false : true))} disabled>
                                            <option value="0">
                                                Chưa thanh toán
                                            </option>
                                            <option value="1">
                                                Đã thanh toán
                                            </option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Căn hộ</label>
                                        <select id="feeTypeId" className="form-control" value={apartmentId} onChange={(e) => setApartmentId(e.target.value)} disabled>
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
                                            <Select options={options} isMulti onChange={handleChangeFeeType} value={optionSelected}/>
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

export default BillDetail