import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function PieBreakdown(props) {
  const sampleData = Object.entries(props.list).map(([label, quantity]) => ({
    label,
    quantity
  }));

  const colors = {
    "JavaScript": "#E38627",
    "Python": "#C13C37",
    "Java": "#6A2135",
    "C#": "#339A65",
    "PHP": "#A63EA9",
    "TypeScript": "#32a852",
    "Ruby": "#3238a8",
    "C++": "#a88132",
    "C": "#a83232",
    "Swift": "#a832a6",
    "Go": "#32a8a0",
    "Shell": "#114f2f",
    "Kotlin": "#3b0d2f",
    "Rust": "#313b0d",
    "PowerShell": "#52370e",
    "Objective-C": "#ebbe7a",
    "R": "#83eb7a",
    "MATLAB": "#7abfeb",
    "Dart": "#7a8deb",
    "Vue": "#d47aeb",
    "Assembly": "#eb7a8e",
    "Sass": "#ebcf7a",
    "CSS": "#f07aeb",
    "HTML": "#7aebc4",
    "Pascal": "#eb7aa3",
    "Racket": "#eb7a7a",
    "Zig": "#7a9feb",
    "Other": "#7aeb9f"
  };
  
  
  const serialize = (obj) => {
    const data = []
    for (const [index, item] of obj.entries()) {
      console.log(index, item)
      data.push({ title: `${item.label} - ${(item.quantity * 100).toFixed(1)}%` , value: item.quantity * 100, color: colors[item.label] });
    }
    return data;
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PieChart
        data={serialize(sampleData)}
        style={{ height: '150px', width: '150px' }}
      />
      <div style={{ marginTop: '10px' }}>
        {serialize(sampleData).map((dataEntry, index) => (
          <div key={index} style={{ color: dataEntry.color, marginBottom: '5px' }}>
            {`${dataEntry.title}: ${Math.round(dataEntry.value)}%`}
          </div>
        ))}
      </div>
    </div>
  );
}
