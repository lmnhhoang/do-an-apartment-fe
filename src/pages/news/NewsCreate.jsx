import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateNewMutation } from '../../app/services/news.service';
import { notification } from 'antd';

function NewsCreate() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [message, setmessage] = useState("");

    const[createNews] = useCreateNewMutation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const handleAddNews = () => {
        const newApartment = {title, type, message}
        createNews(newApartment)
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Thêm tin tức thành công",
                    placement: "top",
                });
                setTimeout(() => {
                    navigate("/news")
                    location.reload();
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                api.info({
                    message: "Thông báo",
                    description: "Thêm tin tức thất bại, có lỗi xảy ra trong lúc thêm",
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
                    <button type="button" className="btn btn-info px-4" onClick={handleAddNews}>
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
                                        <label>Title</label>
                                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                    </div>
                    
                                    <div className="form-group">
                                        <label>Loại</label>
                                        <select id="status" className="form-control" value={type} onChange={(e => setType(e.target.value))}>
                                            <option value="0">
                                                Tin tức
                                            </option>
                                            <option value="1" disabled>
                                                Thông báo
                                            </option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Nội dung</label>
                                        <textarea id="message" className="form-control" rows="1" value={message} onChange={(e) => setmessage(e.target.value)}></textarea>
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

export default NewsCreate