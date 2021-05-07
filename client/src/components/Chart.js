import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getChart } from '../redux/action/chartAction';
import { getNgud } from '../redux/action/ngudAction';
import Moment from "react-moment";
import { } from 'react-bootstrap'
import "moment/locale/th";
import './chart.css';

const Chart = () => {

    const dispatch = useDispatch();
    const chart = useSelector(state => state.chart);
    const ngud = useSelector(state => state.ngud)

    useEffect(async () => {
        await dispatch(getNgud());
        // const n_ngud = ngud.data[0].ngud;
        await dispatch(getChart("ngud", "01"));

    }, [])

    const OnchangeChart = (number_ngud) => {
        dispatch(getChart("ngud", number_ngud));
    }

    const data = {
        labels: chart.labels,
        datasets: [{
            label: 'ยอดขายล็อตเตอรี่ (ใบ)',
            data: chart.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }],

    }

    return (
        <div className="card p-3">
            <div className="header-chart">
                <div>
                    <h3 className="card-title">ยอดขายล็อตเตอรี่รายวัน</h3>
                </div>
                <div>
                    งวดประจำวันที่&nbsp;&nbsp;
                    <select onChange={e => OnchangeChart(e.target.value)}>
                        {ngud.data.map((item) => {
                            return (
                                <option value={item.ngud}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <Line
                data={data}
                height={170}
            />
        </div>
    )
}

export default Chart
