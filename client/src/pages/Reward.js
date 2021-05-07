import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserReward } from '../redux/action/rewardAction'
import Moment from 'react-moment';
import 'moment/locale/th'

const Reward = (props) => {

    const reward = useSelector(state => state.reward);
    const dispatch = useDispatch();

    const ngudid = props.match.params.id;

    useEffect(() => {
        dispatch(getAllUserReward(ngudid));
    }, [])

    return (
        <div>
            <table className="table m-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>หมายเลขรับรางวัล</th>
                        <th>อัพเดตเมื่อ</th>
                        <th>เงินรางวัล</th>
                        <th>สถานะ</th>
                    </tr>
                </thead>
                <tbody>
                    {reward.data.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <a href={"reward/" + item.id}>{item.id}</a>
                                </td>
                                <td><Moment format="DD MMMM YYYY" locale="th">
                                    {item.update_date}
                                </Moment>
                                </td>
                                <td>{item.win_amount}</td>
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
    )
}

export default Reward;
