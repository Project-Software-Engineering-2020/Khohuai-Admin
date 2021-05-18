import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import Axios from 'axios'
import { api } from '../environment';
const Income = () => {

    const [data, setdata] = useState();

    useEffect(async () => {
        const getData = async () => {
            await Axios.get(api + "/chart/income").then(res => {
           
                setdata(res.data);
            })
        }
        await getData();

    }, [])

    return (
        <div>
            {
                data ? <div className="card">
                    <div className="card-header border-transparent">
                        <h3 className="card-title">สรุปผลการรับรางวัล</h3>
                    </div>

                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table m-0 table-hover">
                                <thead>
                                    <tr>
                                        <th>งวดประจำวันที่</th>
                                        <th>สลากที่ขายได้</th>
                                        <th>เงินรางวัลที่ต้องจ่าย</th>
                                        {/* <th>กำไรสุทธิ</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => {
                                        if (index < 3) {
                                            return (
                                                <tr key={index}>
                                                    <td><a href={"lottery/" + item.ngud + "/reward"}>{item.name}</a></td>
                                                    <td>{item.total_lottery - item.total_onhand } ใบ </td>
                                                    <td><NumberFormat value={item.spend_reward} displayType={'text'} thousandSeparator={true}>{item.spend_reward} </NumberFormat> บาท</td>
                                                    {/* <td><NumberFormat value={item.income} displayType={'text'} thousandSeparator={true}>{item.income} </NumberFormat> บาท</td> */}
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
                    <div className="card-footer">
                   
                        <a href="/lottery" className="float-right">ดูทั้งหมด</a>
                    </div>

                </div>
: null
            }
       
        </div>
    )
}

export default Income
