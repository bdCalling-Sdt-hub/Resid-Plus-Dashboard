import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: "0",
    Day: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "1",
    Day: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "2",
    Day: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "3",
    Day: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "4",
    Day: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "5",
    Day: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "6",
    Day: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "7",
    Day: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "8",
    Day: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "9",
    Day: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "10",
    Day: 3490,
    pv: 4300,
    amt: 2100
  },

];


export default function DailyRentChart() {



  return (
    <div style={{ width: '100%', border: "3px solid #000b90", borderRadius: "15px", padding: "20px", backgroundColor: "#fff" }}>
      <h1 style={{ marginTop: "10px", marginBottom: "10px", color: "#000b90" }}>Monthly Booking Ratio</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar dataKey="Day" fill="#000" />
        </BarChart>
      </ResponsiveContainer>






    </div>
  )

}