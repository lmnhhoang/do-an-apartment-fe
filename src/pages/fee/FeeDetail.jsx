import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetFeeByIdQuery, useUpdateFeeMutation } from '../../app/services/fee.service';
import { notification } from 'antd';

function FeeDetail() {
    const { feeId } = useParams();
    const {data: fee} = useGetFeeByIdQuery(feeId);

    const [name, setName] = useState("")
    const [price, setPrice] = useState("");

    const [updateFeePrice] = useUpdateFeeMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (!fee) return;
        setName(fee.name);
        setPrice(fee.price);
    }, [fee]);

    const handleUpdateFeePrice = () => {
        const updatedFee = {id: feeId, price}
        updateFeePrice(updatedFee)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Cập nhật giá tiền của phí thành công",
                    placement: "top",
                });
                setTimeout(() => {
                    navigate("/fees")
                    location.reload();
                }, 1000)
            })
            .catch((err) => {
                console.log(err)
                api.info({
                    message: "Thông báo",
                    description: "Cập nhật giá tiền của phí thất bại, có lỗi xảy ra trong quá trình cập nhật",
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
                <button type="button" className="btn btn-info px-4" onClick={handleUpdateFeePrice}>
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
                                    <label>Tên phí</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Giá tiền (VNĐ)</label>
                                    <textarea id="email" className="form-control" rows="1" value={price} onChange={(e) => setPrice(e.target.value)}></textarea>
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

export default FeeDetail