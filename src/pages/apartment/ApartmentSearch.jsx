import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetApartmentByKeywordQuery } from '../../app/services/apartment.service';

function ApartmentSearch() {
    const [input, setInput] = useState("");
    const {data: apartments} = useGetApartmentByKeywordQuery(input);
    return (
        <div className="container-fluid">
            <div className="row py-2">
                <div className="wrap">
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="Bạn đang tìm căn hộ nào?" value={input} onChange={(e) => setInput(e.target.value)}/>
                        <button type="submit" className="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {apartments && apartments.length === 0 && input !== "" && (
                        <h3>Ko có kết quả phù hợp</h3>
                    )}
                    {apartments && apartments.length > 0 && input !== "" && (
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Số nhà</th>
                                            <th>Diện tích</th>
                                            <th>Số phòng</th>
                                            <th>Trạng thái</th>
                                            <th>Danh sách người</th>
                                            <th>Danh sách hóa đơn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {apartments.length > 0 &&
                                            apartments.map((b) => (
                                                <tr key={b.id}>
                                                    <td>
                                                        <Link to={`/apartments/${b.id}`}>
                                                            {b.apartmentNumber}
                                                        </Link>
                                                    </td>
                                                    <td>{b.area}m2</td>
                                                    <td>{b.numberOfRooms} phòng</td>
                                                    <td>{b.status ? "Đã bán" : "Đang bán"}</td>
                                                    <td>{b.persons.length > 0 ? b.persons.map((p, i) => (<Link to={`/person/${p.id}`} key={i}>{p.name}, </Link>)) : "Không có ai trong căn hộ này"}</td>
                                                    <td>{b.bills.length > 0 ? b.bills.map((b, i) => (<Link to={`/bills/${b.id}`} key={i}>{b.id}, </Link>)) : "Chưa có hóa đơn nào"}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ApartmentSearch