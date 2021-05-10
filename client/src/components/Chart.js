import { useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getChart } from '../redux/action/chartAction';
import { getNgud } from '../redux/action/ngudAction';
import "moment/locale/th";
import './chart.css';

const Chart = () => {

    const dispatch = useDispatch();
    const chart = useSelector(state => state.chart);
    const ngud = useSelector(state => state.ngud)

    useEffect(async () => {
        await dispatch(getNgud());
        const n_ngud = ngud.widget.ngud;
        await dispatch(getChart("ngud", "02"));

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
            // backgroundColor: randomColor(chart.data.length),
            // borderColor: ArrColor,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderWidth: 3
        }],

    }

    const options = {

        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 20
                    }
                }
            ]
        }
    };

    const legend = {
        display: true,
        position: "bottom",
        labels: {
            fontColor: "#323130",
            fontSize: 14
        }
    };

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
                    options={options}
                    data={data}
                    height={150}
                    legend={legend}
                />
            </div>
            {/* } */}

        </div>

    )
}

export default Chart
