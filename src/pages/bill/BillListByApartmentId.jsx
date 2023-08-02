import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetBillsByApartmentIdQuery } from '../../app/services/bill.service';
import { formatDate, formatMonth } from '../../utils/functionUtils';

function BillListByApartmentId() {
    const { apartmentId } = useParams();
    const { data: bills, isLoading } = useGetBillsByApartmentIdQuery(apartmentId);

    if (isLoading) {
      return <h2>Loading ...</h2>;
    }
  
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                          <table className="table table-bordered table-hover">
                              <thead>
                                  <tr>
                                      <th>Số điện (kWh)</th>
                                      <th>Số nước (m3)</th>
                                      <th>Thời gian của hóa đơn</th>
                                      <th>Thời gian thanh toán</th>
                                      <th>Trạng thái</th>
                                      <th>Căn hộ</th>
                                      <th>Danh sách các phí</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {bills.length > 0 &&
                                      bills.map((b) => (
                                          <tr key={b.id}>
                                              <td>
                                                <Link to={`/bills/${b.id}`}>
                                                    {b.electricityNumber}
                                                </Link>
                                              </td>
                                              <td>{b.waterNumber}</td>
                                              <td>{formatMonth(b.billDate)}</td>
                                              <td>{b.paidDate ? formatDate(b.paidDate) : "N/A"}</td>
                                              <td>{b.status ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                              <td>
                                                <Link to={`/apartments/${b.apartment.id}`}>
                                                    {b.apartment.apartmentNumber}
                                                </Link>
                                              </td>
                                              <td>{b.feeTypeList.map((f) => f.name).join(", ")}</td>
                                          </tr>
                                      ))}
                              </tbody>
                          </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillListByApartmentId