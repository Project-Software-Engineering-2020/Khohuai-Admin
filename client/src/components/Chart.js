import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector,useDispatch } from 'react-redux';
import { getChart } from '../redux/action/chartAction';
import './chart.css';

const Chart = () => {

    const dispatch = useDispatch();
    const chart = useSelector(state => state.chart);

    useEffect(() => {
        dispatch(getChart("ngud",15));
    }, [])

    const OnchangeChart = (number_ngud) => {
        dispatch(getChart("ngud",number_ngud));
    }

    const data = {
        labels: chart.labels,
        datasets: [{
            label: 'ยอดขาย',
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
                    <h4>ยอดขายในแต่ละงวด</h4>
                </div>
                <div>
                    งวดประจำวันที่&nbsp;&nbsp;
                    <select onChange={e => OnchangeChart(e.target.value)}>
                        <option value={15} selected>
                              16 มีนาคม 2564
                        </option>
                    </select>
                </div>
            </div>
            <Line
                data={data}
                height={100}
            />
        </div>
    )
}

export default Chart
