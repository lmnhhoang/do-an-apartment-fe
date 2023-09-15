import { Link } from 'react-router-dom';
import { useGetNewsQuery } from '../../app/services/news.service';

function NewsList() {
  const { data: news, isLoading } = useGetNewsQuery();
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
                                    <th>Title</th>
                                    <th>Loại</th>
                                    <th>Nội dung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.length > 0 &&
                                    news.map((b) => (
                                        <tr key={b.id}>
                                            <td>
                                                <Link to={`/news/${b.id}`}>
                                                    {b.title}
                                                </Link>
                                            </td>
                                            <td>{b.type == 0 ? `Tin tức` : `Thông báo`}</td>
                                            <td>{b.message}</td>
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

export default NewsList