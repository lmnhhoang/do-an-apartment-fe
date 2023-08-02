import React from 'react'
import { Link } from 'react-router-dom';
import { useGetFeesQuery } from '../../app/services/fee.service';

function FeeList() {
    const { data: fees, isLoading } = useGetFeesQuery();
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
                                      <th>Loại</th>
                                      <th>Giá tiền (VNĐ)</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {fees.length > 0 &&
                                      fees.map((f, i) => (
                                          <tr key={i}>
                                              <td>
                                                <Link to={`/fees/${f.id}`}>
                                                    {f.name}
                                                </Link>
                                              </td>
                                              <td>{f.price}</td>
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

export default FeeList