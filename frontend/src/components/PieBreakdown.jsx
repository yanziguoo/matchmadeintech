import React, { useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart';

export default function PieBreakdown() {
    const [pieData, setPieData] = useState([]); // [ { title: 'One', value: 10, color: '#E38627' }, ...
    // const langs = props.langs;
    
    // for username, row in picked.iterrows():
    //     curr = {}
    //     curr['username'] = username
    //     curr['id'] = row['Id']
    //     curr['contributions'] = row['Contributions']
    //     curr['languages'] = {}
    //     for lang in col[2:]:
    //         if row[lang] > 0:
    //             curr['languages'][lang] = row[lang]
    //     ret.append(curr)

    const languages = {
        python: 0.50,
        javascript: 0.50,
    }

    useEffect(() => {
        const data = [];
        for (const lang in languages) {
            data.push({ title: lang, value: languages[lang], color: '#E38627' });
        }
        setPieData(data);
    }, []);

    return (
        <PieChart
            data={pieData}
        />
    )
}
