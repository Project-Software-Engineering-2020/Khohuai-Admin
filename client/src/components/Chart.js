import { useEffect } from 'react';
import { Line,Bar } from 'react-chartjs-2';
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

    let ArrColor = [];
    const randomColor = (len) => {
        console.log(len)
        
        let color = ""
        let r, g, b;
        for (let i = 0; i < len; i++) {
            r = Math.floor(Math.random() * 200);
            g = Math.floor(Math.random() * 200);
            b = Math.floor(Math.random() * 200);
            color = 'rgba(' + r + ', ' + g + ', ' + b + ',1)'
            ArrColor.push(color)
        }
        return ArrColor;
    }


    const data = {
        labels: chart.labels,
        datasets: [{
            label: 'ยอดขายล็อตเตอรี่ (ใบ)',
            data: chart.data,
            fill: false,
            backgroundColor: randomColor(chart.data.length),
            borderColor: ArrColor,
            borderWidth: 3
        }],

    }

    return (
        <div>
            {/* {
                chart.isFetching ?
                    null
                    : */}
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
                            height={150}
                        />
                    </div>
            {/* } */}

        </div>

    )
}

export default Chart
