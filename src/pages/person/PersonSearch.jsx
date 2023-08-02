import React, { useRef, useState } from 'react'
import { useGetPersonByKeywordQuery } from '../../app/services/person.service';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functionUtils';
import { useGetApartmentsQuery } from '../../app/services/apartment.service';

function PersonSearch() {
    const [keyword, setKeyword] = useState("");
    const [apartment, setApartment] = useState("");
    const keys = useRef();
    const apart = useRef();

    const {data: persons} = useGetPersonByKeywordQuery({keyword, apartment});
    const {data: apartments} = useGetApartmentsQuery();

    const searchPeople = () => {
        setKeyword(keys.current.value);
        setApartment(apart.current.value);
    }

  return (
    <div className="container-fluid">
        <div className="row py-2">
            <div className="wrap">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Bạn đang tìm ai?" ref={keys}/>
                    <select ref={apart}>
                        <option value="">Tất cả</option>
                        {apartments && apartments.map((a, i) => (
                            <option value={a.apartmentNumber} key={i}>{a.apartmentNumber}</option>
                        ))}
                    </select>
                    <button type="submit" className="searchButton" onClick={searchPeople}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                {persons && persons.length === 0 && (
                    <h3>Ko có kết quả phù hợp</h3>
                )}
                {persons && persons.length > 0 && (
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Họ và tên</th>
                                        <th>Email</th>
                                        <th>Số điện thoại</th>
                                        <th>Số chứng minh thư</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Đại diện căn hộ</th>
                                        <th>Căn hộ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {persons.map((p) => (
                                        <tr key={p.id}>
                                            <td>
                                                <Link to={`/person/${p.id}`}>
                                                    {p.name}
                                                </Link>
                                            </td>
                                            <td>{p.email}</td>
                                            <td>{p.phoneNumber}</td>
                                            <td>{p.cardIdNumber}</td>
                                            <td>{formatDate(p.birthDate)}</td>
                                            <td>{p.gender ? "Nam" : "Nữ"}</td>
                                            <td>{p.representative ? "Có" : "Không"}</td>
                                            <td>
                                                {!p.apartment && (
                                                    <p>Ko có căn hộ</p>
                                                )}
                                                {p.apartment && (
                                                    <Link to={`/apartments/${p.apartment.id}`}>
                                                        {p.apartment.apartmentNumber}
                                                    </Link>
                                                )}
                                            </td>
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
  )
}

export default PersonSearch