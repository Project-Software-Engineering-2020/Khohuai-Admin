import React from 'react'

export default function detail() {
    return (
            
<div className="card">
  <div className="card-header">
    <h3 className="card-title">
        หมายเลขคำสั่งซื้อ :
    </h3>
    <div className="card-tools">
      <ul className="nav nav-pills ml-auto">
        <li className="nav-item">
          <a className="nav-link active"  href="#revenue-chart" data-toggle="tab">รอการประการผล</a>
        </li>
      </ul>
      
    </div>
  </div>{/* /.card-header */}
  <div className="card-body">
    <div className="tab-content p-0">
      {/* Morris chart - Sales */}
      <p>สั่งซื้อวันที่ 12 ธ.ค. 2020  20:26:08</p>
      <p>งวดประจำวันที่ 30 มีนาคม 2564</p>

      <table className="table m-0">
            <thead >
              <tr>
                
                <th>เลขสลาก</th>
                <th>จำนวนใบ (ใบ)</th>
                <th>ราคารวม (บาท)</th>
                
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
      
    </div>
  </div>{/* /.card-body */}
</div>

    )
}
