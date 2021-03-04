import Moment from 'react-moment';
import 'moment/locale/th';

const LastOders = ({ data }) => {
    return (
        <div>
            <div className="card">
                <div className="card-header border-transparent">
                    <h3 className="card-title">คำสั่งซื้อล่าสุด</h3>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table m-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    if (index < 5) {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td><a href="">{item.invoiceid}</a></td>
                                                <td><Moment format="DD-MM-YYYY HH:mm:ss">
                                                    {item.date}
                                                </Moment></td>
                                                {/* <td><span className="badge badge-success">success</span></td> */}
                                                <td>{item.quantity}</td>
                                                <td>{item.totalprice}</td>
                                                {/* <td>
                                                <div className="sparkbar" data-color="#00a65a" data-height={20}>90,80,90,-70,61,-83,63</div>
                                            </td> */}
                                            </tr>
                                        )
                                    }

                                })}

                            </tbody>
                        </table>
                    </div>
                    {/* /.table-responsive */}
                </div>
                {/* /.card-body */}
                <div className="card-footer clearfix">
                    {/* <a href="javascript:void(0)" className="btn btn-sm btn-info float-left">Place New Order</a> */}
                    <a href="/invoice" className="btn btn-secondary float-right">ดูคำสั่งซื้อทั้งหมด</a>
                </div>
                {/* /.card-footer */}
            </div>

        </div>
    )
}

export default LastOders
