import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../../app/services/user.service';

function UsersList() {
  const { data: users, isLoading } = useGetUsersQuery();
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
                                    <th>No</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 &&
                                    users.map((b) => (
                                        <tr key={b.id}>
                                            <td>
                                                {/* <Link to={`/apartments/${b.id}`}> */}
                                                    {b.id}
                                                {/* </Link> */}
                                            </td>
                                            <td>{b.username}</td>
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

export default UsersList