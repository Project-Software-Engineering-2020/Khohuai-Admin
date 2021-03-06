import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserReward } from '../redux/action/rewardAction'
import Moment from 'react-moment';
import 'moment/locale/th'
import NumberFormat from 'react-number-format';

const Reward = (props) => {

    const reward = useSelector(state => state.reward);
    const dispatch = useDispatch();

    const ngudid = props.match.params.ngud;

    useEffect(async () => {
   
        await dispatch(getAllUserReward(ngudid));
    }, [])

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title pt-2">ผู้ถูกรางวัล </h2>
            </div>
            <div className="card-body p-0 table-responsive">
                <table className="table m-0 table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>หมายเลขรับรางวัล</th>
                            <th>ชื่อ นามสกุล</th>
                            <th>อัพเดตเมื่อ</th>
                            <th className="text-right">เงินรางวัล (บาท)</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reward.data.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td style={{ textDecoration: 'underline' }}>
                                        <a href={"reward/" + item.id}>{item.id}</a>
                                    </td>
                                    <td>{item.firstname + "  " + item.lastname}</td>
                                    <td><Moment format="DD MMMM YYYY" locale="th">
                                        {item.update_date}
                                    </Moment>
                                    </td>
                                    <td className="text-right"><NumberFormat value={item.win_amount} displayType={'text'} thousandSeparator={true}>{item.win_amount}</NumberFormat></td>
                                    <td>{item.success ?
                                        <span className="badge badge-success">โอนเงินรางวัลแล้ว</span>
                                        :
                                        <span className="badge badge-warning">ยังไม่โอนเงินรางวัล</span>
                                    }</td>
                                </tr>
                            )

                        })}


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Reward;
