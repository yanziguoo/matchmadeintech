import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function PieBreakdown(props) {
  const [pieData, setPieData] = useState([]);
  const list = props.list;
  
  const sampleData = Object.entries(list).map(([label, quantity]) => ({
    label,
    quantity
  }));

  const colors = ['#E38627', '#C13C37', '#6A2135', '#339A65', '#A63EA9'];
  
  useEffect(() => {
    const data = [];
    for (const [index, item] of sampleData.entries()) {
      console.log(index, item)
      // const percentage = (item.quantity / total);
      data.push({ title: item.label, value: item.quantity * 100, color: colors[index] });
    }
    setPieData(data);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PieChart
        data={pieData}
        style={{ height: '150px', width: '150px' }}
      />
      <div style={{ marginTop: '10px' }}>
        {pieData.map((dataEntry, index) => (
          <div key={index} style={{ color: dataEntry.color, marginBottom: '5px' }}>
            {`${dataEntry.title}: ${Math.round(dataEntry.value)}%`}
          </div>
        ))}
      </div>
    </div>
  );
}