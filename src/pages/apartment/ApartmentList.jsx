import { Link } from 'react-router-dom';
import { useGetApartmentsQuery } from '../../app/services/apartment.service';

function ApartmentList() {
  const { data: apartments, isLoading } = useGetApartmentsQuery();

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
                                            <td>{b.bills.length > 0 ? (<Link to={`/bills/apartment/${b.id}`}>Nhấn để xem chi tiết</Link>) : "Chưa có hóa đơn nào"}</td>
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

export default ApartmentList